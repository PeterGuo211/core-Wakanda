package org.wakanda.qa.test.http;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.charset.CharsetEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.SortedMap;
import java.util.SortedSet;
import java.util.StringTokenizer;
import java.util.TreeMap;
import java.util.TreeSet;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.wakanda.qa.test.http.settings.Settings;

/**
 * @author Ouissam
 * 
 */
public class CharSetUtil {
	
	private static Logger logger = Logger.getLogger(CharSetUtil.class);

	public static final int byteArrayToInt(byte[] b) {
		return ((b[3] & 0xFF) << 24) + ((b[2] & 0xFF) << 16)
				+ ((b[1] & 0xFF) << 8) + (b[0]);
	}

	public static char[] getSupportedCharacters(String charsetName,
			boolean nonASCII) {
		SortedSet<Integer> codePoints = getSupportedCodePoints(charsetName);
		List<Character> charsList = new ArrayList<Character>();
		for (int codePoint : codePoints) {
			if (!Character.isSupplementaryCodePoint(codePoint)) {
				if (nonASCII) {
					if (codePoint > 127) {
						charsList.add(Character.toChars(codePoint)[0]);
					}
				} else {
					charsList.add(Character.toChars(codePoint)[0]);
				}
			}
		}
		// Character[] charsArray = (Character[]) charsList
		// .toArray(new Character[charsList.size()]);
		char[] charArray = new char[charsList.size()];
		int i = 0;
		for (Character character : charsList) {
			charArray[i] = character.charValue();
			i++;
		}
		return charArray;
	}

	public static char[] getNonASCIISupportedCharacrters(String charsetName) {
		return getSupportedCharacters(charsetName, true);
	}

	public static String getSupportedCharacrtersAsString(String charsetName,
			boolean nonASCII) {
		SortedSet<Integer> codePoints = getSupportedCodePoints(charsetName);
		String result = "";
		for (int codePoint : codePoints) {
			if (!Character.isSupplementaryCodePoint(codePoint)) {
				if (nonASCII) {
					if (codePoint > 127)
						result = result + Character.toChars(codePoint)[0];
				} else {
					result = result + Character.toChars(codePoint)[0];
				}
			}
		}
		return result;
	}

	public static String getNonASCIISupportedCharactersAsString(
			String charsetName) {
		return getSupportedCharacrtersAsString(charsetName, true);
	}

	public static SortedSet<Integer> getSupportedCodePoints(String charsetName) {
		try {
			CharsetEncoder e = Charset.forName(charsetName).newEncoder();
			// FileWriter log = new FileWriter(charsetName + ".txt");
			SortedSet<Integer> codePointSet = new TreeSet<Integer>();
			//int count = 0;
			for (int i = Character.MIN_CODE_POINT; i <= Character.MAX_CODE_POINT; i++) {
				// Character character = Character.toChars(i)[0];
				String s = new String(Character.toChars(i));
				if (e.canEncode(s)) {
					codePointSet.add(i);
					/*
					 * ByteBuffer bb = e.encode(CharBuffer.wrap(s)); byte[]
					 * bytes = new byte[4]; bb.get(bytes, 0, bb.limit()); int
					 * targetCode = byteArrayToInt(bytes); String out =
					 * "Unicode: " + i + "\t Hex: " + Integer.toHexString(i) +
					 * "\t Char: " + s + "\t Target code: " + targetCode +
					 * "\t Hex: " + Integer.toHexString(targetCode) + "\n";
					 * log.write(out);
					 */
					//count++;
				} else {
					// log.write("Undefined\n");
				}
			}
			// log.flush();
			return codePointSet;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static void checkCharSetAvailability(String name) {
		if (Charset.isSupported(name)) {
			System.out.print("[JVM] Supported: " + name);
			Charset charSet = Charset.forName(name);
			logger.debug(" / Name: " + charSet.name());
			if (charSet.isRegistered()) {
				System.out.print("[JVM] Registred: " + charSet.name()
						+ " / Alias : ");
				for (String alias : charSet.aliases()) {
					System.out.print(alias + ",");
				}
				logger.debug("\n");
			} else {
				logger.debug("[JVM] Non registred: "
						+ charSet.displayName());
			}
		} else {
			logger.debug("[JVM] Non supported: " + name);
		}
	}

	public static void displayJVMSupportedChatSets() {
		SortedMap<String, Charset> charsets = Charset.availableCharsets();
		int size = charsets.size();
		int registred = 0;
		for (Entry<String, Charset> entry : charsets.entrySet()) {
			String name = entry.getKey();
			Charset charset = entry.getValue();
			if (charset.isRegistered()) {
				registred++;
				logger.debug("Registred charsets: ");
				System.out.print("Name : " + name + " / Alias : ");
				for (String alias : charset.aliases()) {
					System.out.print(alias + ",");
				}
				logger.debug("\n");
			}

		}
		logger.debug("JVM : " + registred + " registred / " + size
				+ " supported");
	}

	public static void displayIANACharSetsAlias() {
		Map<String, Integer> allToolBoxAlias = getAllIANACharSetsAlias();
		for (Entry<String, Integer> aliasEntry : allToolBoxAlias.entrySet()) {
			String alias = aliasEntry.getKey();
			int mIBenum = aliasEntry.getValue();
			logger.debug("Alias : " + alias + "\t" + mIBenum);
		}
		logger.debug("IANA Charsets alias count: "
				+ allToolBoxAlias.size());

	}

	public static void displayIANACharSets() {
		Map<Integer, CharSetInfo> iANACharSetsMap = getIANACharSets();
		for (Entry<Integer, CharSetInfo> entry : iANACharSetsMap.entrySet()) {
			Integer mIBenum = entry.getKey();
			CharSetInfo charset = entry.getValue();
			logger.debug("ID: " + mIBenum + " | Name : "
					+ charset.getName());
		}
		logger.debug("IANA Charsets count: " + iANACharSetsMap.size());

	}

	public static void displayToolBoxCharSetsAliasVSJVM(boolean onlyForWeb) {
		int totalSupported = 0;
		int totalRegistred = 0;

		Map<String, Integer> allToolBoxAlias = onlyForWeb ? getToolBoxWebCharSetsAlias()
				: getToolBoxCharSetsAlias();

		for (Entry<String, Integer> aliasEntry : allToolBoxAlias.entrySet()) {
			String alias = aliasEntry.getKey();
			int mIBenum = aliasEntry.getValue();
			if (Charset.isSupported(alias)) {
				totalSupported++;
				Charset charSet = Charset.forName(alias);
				if (charSet.isRegistered()) {
					totalRegistred++;
				} else {
					logger.debug("[ToolBox vs JVM] Non registred: "
							+ mIBenum + " " + alias);
				}
			} else {
				logger.debug("[ToolBox vs JVM] Non supported: " + mIBenum
						+ " " + alias);
			}

		}

		logger.debug("[ToolBox vs JVM]: " + totalRegistred
				+ " registred in IANA / " + totalSupported
				+ " supported by JVM / " + allToolBoxAlias.size() + " ToolBox "
				+ (onlyForWeb ? "Web" : "") + " charsets alias");

	}

	public static void displayToolBoxCharSetsAliasVSIANA(boolean onlyForWeb) {
		int totalRegistred = 0;
		Map<String, Integer> allToolBoxAlias = onlyForWeb ? getToolBoxWebCharSetsAlias()
				: getToolBoxCharSetsAlias();
		Map<String, Integer> allIANAAlias = getAllIANACharSetsAlias();
		for (Entry<String, Integer> aliasEntry : allToolBoxAlias.entrySet()) {
			String alias = aliasEntry.getKey();
			int mIBenum = aliasEntry.getValue();
			if (allIANAAlias.containsKey(alias)) {
				totalRegistred++;
			} else {
				CharSetInfo suggessedCharSet = getIANACharSets().get(mIBenum);
				String suggesstion = suggessedCharSet != null ? suggessedCharSet
						.getName() : "None";
				logger.debug("[ToolBox vs IANA] Missing charset: "
						+ alias + " " + mIBenum + " | Suggestion: "
						+ suggesstion);

			}
		}
		logger.debug("[ToolBox vs IANA] " + totalRegistred
				+ " presents in IANA / " + allToolBoxAlias.size() + " ToolBox "
				+ (onlyForWeb ? "Web" : "") + " charsets alias / "
				+ allIANAAlias.size() + " IANA charsets alias");
	}

	public static void displayToolBoxCharSetsVsJVM(boolean onlyForWeb) {
		Map<Integer, CharSetInfo> toolBoxCharSetsMap = onlyForWeb ? getToolBoxWebCharSets()
				: getToolBoxCharSets();
		int totalSupported = 0;
		int totalRegistred = 0;
		for (Entry<Integer, CharSetInfo> entry : toolBoxCharSetsMap.entrySet()) {
			Integer mIBenum = entry.getKey();
			CharSetInfo charSetInfo = entry.getValue();

			if (Charset.isSupported(charSetInfo.getName())) {
				totalSupported++;
				Charset charSet = Charset.forName(charSetInfo.getName());
				if (charSet.isRegistered()) {
					totalRegistred++;
				} else {
					System.out.print("Non registred : " + mIBenum
							+ " | Name : " + charSet.name() + " | Alias: ");
					for (String alias : charSet.aliases()) {
						System.out.print(alias + ",");
					}
					logger.debug("\n");
				}
			} else {
				System.out.print("Non supported : " + mIBenum + " | Name : "
						+ charSetInfo.getName() + " | Alias: ");
				for (String alias : charSetInfo.getAlias()) {
					System.out.print(alias + ",");
				}
				logger.debug("\n");
			}

		}

		logger.debug("[ToolBox Vs JVM]: " + totalRegistred
				+ " registred in IANA / " + totalSupported
				+ " supported by JVM / " + toolBoxCharSetsMap.size()
				+ " ToolBox " + (onlyForWeb ? "Web" : "") + " charsets");
	}

	public static void displayToolBoxCharSetsVsIANA(boolean onlyForWeb) {
		Map<Integer, CharSetInfo> toolBoxCharSetsMap = onlyForWeb ? getToolBoxWebCharSets()
				: getToolBoxCharSets();
		Map<Integer, CharSetInfo> iANACharSetsMap = getIANACharSets();
		int totalRegistred = 0;
		for (Entry<Integer, CharSetInfo> entry : toolBoxCharSetsMap.entrySet()) {
			Integer mIBenum = entry.getKey();
			CharSetInfo charSetInfo = entry.getValue();
			if (iANACharSetsMap.containsKey(charSetInfo.getmIBenum())) {
				totalRegistred++;
			} else {
				System.out.print("Non registred in IANA : " + mIBenum
						+ " | Name : " + charSetInfo.getName() + " | Alias: ");
				for (String alias : charSetInfo.getAlias()) {
					System.out.print(alias + ",");
				}
				logger.debug("\n");
			}

		}

		logger.debug("[ToolBox Vs IANA]: " + totalRegistred
				+ " presents in IANA / " + toolBoxCharSetsMap.size()
				+ " ToolBox " + (onlyForWeb ? "Web" : "") + " charsets / "
				+ iANACharSetsMap.size() + " IANA Charsets");

	}

	public static Map<String, Integer> getAllIANACharSetsAlias() {
		Map<String, Integer> aliasMap = new TreeMap<String, Integer>();
		Map<Integer, CharSetInfo> iANACharSetsMap = getIANACharSets();
		for (Entry<Integer, CharSetInfo> entry : iANACharSetsMap.entrySet()) {
			CharSetInfo charset = entry.getValue();
			SortedSet<String> aliasList = charset.getAlias();
			aliasMap.put(charset.getName(), charset.getmIBenum());
			for (String alias : aliasList) {
				aliasMap.put(alias, charset.getmIBenum());
			}
		}
		return aliasMap;
	}

	public static List<Charset> getToolBoxWebCharSetAliasSupportedByJVM() {
		List<Charset> supported = new ArrayList<Charset>();
		Map<String, Integer> allToolBoxAlias = getToolBoxWebCharSetsAlias();
		for (Entry<String, Integer> aliasEntry : allToolBoxAlias.entrySet()) {
			String alias = aliasEntry.getKey();
			// int mIBenum = aliasEntry.getValue();
			if (Charset.isSupported(alias)) {
				Charset charSet = Charset.forName(alias);
				supported.add(charSet);
			} else {

			}
		}
		return supported;

	}

	private static List<Charset> webSupported = null;
	public static List<Charset> getToolBoxWebCharSetSupportedByJVM() {
		if (webSupported == null) {
			webSupported = new ArrayList<Charset>();
			Map<Integer, CharSetInfo> toolBoxWebCharsets = getToolBoxWebCharSets();
			for (Entry<Integer, CharSetInfo> charsetEntry : toolBoxWebCharsets
					.entrySet()) {
				// int mIBenum = charsetEntry.getKey();
				CharSetInfo charSetInfo = charsetEntry.getValue();
				String name = charSetInfo.getName();
				if (Charset.isSupported(name)) {
					Charset charSet = Charset.forName(name);
					webSupported.add(charSet);
				} else {
					// logger.debug("Unsupported by JVM : " + name);
				}
			}
		}
		return webSupported;

	}

	public static Map<String, Integer> getToolBoxCharSetsAlias() {
		Map<String, Integer> aliasMap = new TreeMap<String, Integer>();
		Map<Integer, CharSetInfo> toolBoxCharSetsMap = getToolBoxCharSets();
		for (Entry<Integer, CharSetInfo> entry : toolBoxCharSetsMap.entrySet()) {
			CharSetInfo charset = entry.getValue();
			SortedSet<String> aliasList = charset.getAlias();
			aliasMap.put(charset.getName(), charset.getmIBenum());
			for (String alias : aliasList) {
				aliasMap.put(alias, charset.getmIBenum());
			}
		}
		return aliasMap;
	}

	public static Map<String, Integer> getToolBoxWebCharSetsAlias() {
		Map<String, Integer> aliasMap = new TreeMap<String, Integer>();
		Map<Integer, CharSetInfo> toolBoxCharSetsMap = getToolBoxCharSets();
		for (Entry<Integer, CharSetInfo> entry : toolBoxCharSetsMap.entrySet()) {
			CharSetInfo charset = entry.getValue();
			if (charset.isForWeb()) {
				SortedSet<String> aliasList = charset.getAlias();
				aliasMap.put(charset.getName(), charset.getmIBenum());
				for (String alias : aliasList) {
					aliasMap.put(alias, charset.getmIBenum());
				}
			}
		}
		return aliasMap;
	}

	public static Map<Integer, CharSetInfo> getIANACharSets() {
		Map<Integer, CharSetInfo> iANACharSetsMap = new TreeMap<Integer, CharSetInfo>();
		String content;
		try {
			URL url = Settings.class.getResource("entities/iana_charsets");
			File file = new File(url.toURI());
			content = FileUtils.readFileToString(file);

			String[] charsetsContent = content.trim().split("Name:\\s*");
			//int count = 0;
			for (int i = 1; i < charsetsContent.length; i++) {
				//count++;
				String charsetContent = charsetsContent[i].trim();
				// logger.debug(charsetContent);
				String[] charsetLines = charsetContent.split("\n");
				String charsetName = charsetLines[0].trim().split("\\s+")[0];
				// logger.debug(charsetName);
				String[] mIBenumTokens = charsetLines[1].trim().split(
						"MIBenum:\\s*");
				// System.out.print("length : " + mIBenumTokens.length);
				String sMIBenum = (mIBenumTokens.length > 1 ? mIBenumTokens[1]
						: "0");
				Integer mIBenum = Integer.parseInt(sMIBenum);

				// logger.debug(" | [" + mIBenum + "]");
				SortedSet<String> aliasSet = new TreeSet<String>();
				for (int j = 2; j < charsetLines.length; j++) {
					String[] aliasTokens = charsetLines[j].trim().split(
							"Alias:\\s*");
					if (aliasTokens.length > 1) {
						String alias = aliasTokens[1].split("\\s+")[0];
						// logger.debug("[" + alias + "]");
						if (!alias.equals("None"))
							aliasSet.add(alias);

					}
				}
				// logger.debug("----------------");
				iANACharSetsMap.put(mIBenum, new CharSetInfo(mIBenum,
						charsetName, aliasSet));
			}
			// logger.debug("Count: " + count);
			return iANACharSetsMap;
		} catch (IOException e) {
			e.printStackTrace();
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static Map<Integer, CharSetInfo> getToolBoxWebCharSets() {
		Map<Integer, CharSetInfo> toolBoxCharSetsMap = getToolBoxCharSets();
		Map<Integer, CharSetInfo> toolBoxEbCharSetsMap = new TreeMap<Integer, CharSetUtil.CharSetInfo>();
		for (Entry<Integer, CharSetInfo> entry : toolBoxCharSetsMap.entrySet()) {
			Integer mIBenum = entry.getKey();
			CharSetInfo charset = entry.getValue();
			if (charset.isForWeb())
				toolBoxEbCharSetsMap.put(mIBenum, charset);
		}
		return toolBoxEbCharSetsMap;

	}

	private static Map<Integer, CharSetInfo> toolBoxCharsetsMap = null;

	public static Map<Integer, CharSetInfo> getToolBoxCharSets() {
		if (toolBoxCharsetsMap == null) {
			Map<Integer, CharSetInfo> charSetMap = new TreeMap<Integer, CharSetUtil.CharSetInfo>();
			String content;
			try {
				URL url = Settings.class.getResource("entities/toolbox_charsets");
				File file = new File(url.toURI());
				content = FileUtils.readFileToString(file);

				String charsets_content = content
						.split("static VCSNameMap sCharSetNameMap\\[\\] =(\r)?\n\\{")[1]
						.split("\\};")[0];

				StringTokenizer splitter = new StringTokenizer(
						charsets_content, ",");
				int tokensCount = 0;
				//int charSetCount = 0;

				while (splitter.hasMoreTokens()) {
					if (tokensCount % 5 == 0) {
						// gather all pertinent attributes

						// Skip the C++ static variable name
						splitter.nextToken();
						// MIBenum
						Integer mIBenum = Integer.parseInt(splitter.nextToken()
								.trim());
						// CharSet Name
						String charSetName = splitter.nextToken().trim();
						charSetName = charSetName.substring(2,
								charSetName.length() - 1);
						// Skip the ICU Converter API needs ANSI
						splitter.nextToken();
						// For web ?
						boolean forWeb = Boolean.parseBoolean(splitter
								.nextToken().trim());

						// logger.debug("MIBenum: " + mIBenum +
						// " | Name: "
						// + charSetName + " | ForWeb?: " + forWeb);

						// build the charSets list
						if (!charSetMap.containsKey(mIBenum)) {
							CharSetInfo charset = new CharSetInfo(mIBenum,
									charSetName);
							charset.setForWeb(forWeb);
							charSetMap.put(mIBenum, charset);
						} else {
							CharSetInfo charset = charSetMap.get(mIBenum);
							charset.getAlias().add(charSetName);
						}

						// flags
						tokensCount = tokensCount + 5;
						//charSetCount++;

					}
				}
				// logger.debug("CharSets count : " + charSetCount);
				// remove the unknown charset
				charSetMap.remove(0);
				return charSetMap;

			} catch (IOException e) {
				e.printStackTrace();
			} catch (URISyntaxException e) {
				e.printStackTrace();
			}
		}
		return toolBoxCharsetsMap;
	}

	public static class CharSetInfo {

		private int mIBenum;
		private String name;
		private SortedSet<String> alias;
		private boolean forWeb;

		public CharSetInfo(int mIBenum, String name, SortedSet<String> alias) {
			super();
			this.mIBenum = mIBenum;
			this.name = name;
			this.alias = alias;
		}

		public CharSetInfo(int mIBenum, String name) {
			super();
			this.mIBenum = mIBenum;
			this.name = name;
			this.alias = new TreeSet<String>();
		}

		public void setmIBenum(int mIBenum) {
			this.mIBenum = mIBenum;
		}

		public int getmIBenum() {
			return mIBenum;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getName() {
			return name;
		}

		public void setAlias(SortedSet<String> alias) {
			this.alias = alias;
		}

		public SortedSet<String> getAlias() {
			return alias;
		}

		public void setForWeb(boolean forWeb) {
			this.forWeb = forWeb;
		}

		public boolean isForWeb() {
			return forWeb;
		}

	}

	public static boolean encodeUnicodeContentToFile(String content,
			String charset, String path) {
		try {
			FileUtils.writeStringToFile(new File(path), content, charset);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			
		}
		return false;
	}

	public static class UnicodeFormatter {

		static public String byteToHex(byte b) {
			// Returns hex String representation of byte b
			char hexDigit[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8',
					'9', 'a', 'b', 'c', 'd', 'e', 'f' };
			char[] array = { hexDigit[(b >> 4) & 0x0f], hexDigit[b & 0x0f] };
			return new String(array);
		}

		static public String charToHex(char c) {
			// Returns hex String representation of char c
			byte hi = (byte) (c >>> 8);
			byte lo = (byte) (c & 0xff);
			return byteToHex(hi) + byteToHex(lo);
		}

	}

}
