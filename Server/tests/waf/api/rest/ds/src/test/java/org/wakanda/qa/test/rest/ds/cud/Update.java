/**
 * 
 */
package org.wakanda.qa.test.rest.ds.cud;

import static junitparams.JUnitParamsRunner.$;
import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import junitparams.JUnitParamsRunner;
import junitparams.Parameters;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.wakanda.qa.commons.server.rest.DataClass;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.rest.domain.BasicEntity;
import org.wakanda.qa.test.rest.ds.domain.Master1;
import org.wakanda.qa.test.rest.ds.domain.UpdateComplex;
import org.wakanda.qa.test.rest.ds.domain.UpdateSimple;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;

/**
 * @author soufiane.tigrioui@4d.com
 * 
 */
@RunWith(JUnitParamsRunner.class)
public class Update extends AbstractTestCase {

	private final DataClass<UpdateSimple> dcus = getDSClient().getDataClass(
			UpdateSimple.class);
	private final DataClass<UpdateComplex> dcuc = getDSClient().getDataClass(
			UpdateComplex.class);

	private abstract class ProcessUpdate<T extends BasicEntity> {

		private final T eOrigin;

		public ProcessUpdate(final T eOrigin) {
			this.eOrigin = eOrigin;
		}

		private T prepareForUpdate() throws Throwable {
			@SuppressWarnings("unchecked")
			T eToSend = (T) eOrigin.getClass().getConstructor(String.class)
					.newInstance(eOrigin.getKey());
			eToSend.setStamp(eOrigin.getStamp());
			return eToSend;
		}

		@SuppressWarnings("unchecked")
		private T prepareForAssert() {
			T eExpected = null;
			eExpected = (T) eOrigin.copy();
			eExpected.setUri(new RESTRequestBuilder(eOrigin.getClass()
					.getSimpleName()).addKey(eExpected.getKey()).toString());
			eExpected.setStamp(eOrigin.getStamp() + 1);
			eExpected.setEntityModel(null);
			return eExpected;
		}

		public abstract void processPayload(T eToSend);

		public abstract void processExpected(T eExpected);

		public T getPayload() throws Throwable {
			T eToSend = prepareForUpdate();
			processPayload(eToSend);
			return eToSend;
		}

		public T getExpected() {
			T eExpected = prepareForAssert();
			processExpected(eExpected);
			return eExpected;
		}

		public void check() throws Throwable {
			// Update the entity
			@SuppressWarnings("unchecked")
			DataClass<T> dcu = (DataClass<T>) getDSClient().getDataClass(
					eOrigin.getClass());
			logger.debug("Origin: " + eOrigin);
			logger.debug("Sent: " + getPayload());
			T eReceived = dcu.update(getPayload());

			logger.debug("Received: " + eReceived);
			logger.debug("Expected: " + getExpected());
			// Assert
			assertEquals(getExpected(), eReceived);
		}
	}

	@Test
	@Parameters
	public void testUpdateMultipleFieldsOfOneSimpleEntity(
			final UpdateSimple eOrigin) throws Throwable {
		final String svalue = StringUtils.reverse(eOrigin.getASString());
		final Integer lvalue = eOrigin.getASLong().intValue() << 1;
		new ProcessUpdate<UpdateSimple>(eOrigin) {

			@Override
			public void processPayload(UpdateSimple eToSend) {
				eToSend.setASString(svalue);
				eToSend.setASLong(lvalue);
			}

			@Override
			public void processExpected(UpdateSimple eExpected) {
				eExpected.setASString(svalue);
				eExpected.setASLong(lvalue);
			}
		}.check();
	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestUpdateMultipleFieldsOfOneSimpleEntity()
			throws Throwable {
		String[] keys = ArrayUtils.toArray("1", "2", "3", "4", "5");
		UpdateSimple[] params = new UpdateSimple[keys.length];
		for (int i = 0; i < keys.length; i++) {
			UpdateSimple eOrigin = dcus.get(keys[i]);
			params[i] = eOrigin;
		}
		return params;
	}

	@Test
	@Parameters
	public void testUpdateMultipleFieldsOfMultipleGroupsOfSimpleEntities(
			List<UpdateSimple> esToSend, List<UpdateSimple> esExpected)
			throws Throwable {
		// Update the entities
		UpdateSimple[] esReceived = dcus.update(esToSend);
		// Assert
		assertArrayEquals(esExpected.toArray(new UpdateSimple[0]), esReceived);

	}

	@SuppressWarnings("unused")
	private Object[] parametersForTestUpdateMultipleFieldsOfMultipleGroupsOfSimpleEntities()
			throws Throwable {

		int count = (int) dcus.count();
		Object[] params = new Object[count];

		for (int i = 0; i < count; i++) {
			// Get the entities to update
			UpdateSimple[] esOrigin = dcus.filterBy("ID<=" + (i + 1));

			List<UpdateSimple> esToSend = new ArrayList<UpdateSimple>(
					esOrigin.length);
			List<UpdateSimple> esExpected = new ArrayList<UpdateSimple>(
					esOrigin.length);

			for (int y = 0; y < esOrigin.length; y++) {

				final String v1 = StringUtils
						.reverse(esOrigin[y].getASString());
				final Integer v2 = esOrigin[y].getASLong() << 1;

				ProcessUpdate<UpdateSimple> p = new ProcessUpdate<UpdateSimple>(
						esOrigin[y]) {

					@Override
					public void processPayload(UpdateSimple eToSend) {
						eToSend.setASString(v1);
						eToSend.setASLong(v2);
					}

					@Override
					public void processExpected(UpdateSimple eExpected) {
						eExpected.setASString(v1);
						eExpected.setASLong(v2);
					}
				};

				esToSend.add(p.getPayload());
				esExpected.add(p.getExpected());
			}

			params[i] = $(esToSend, esExpected);
		}
		return params;

	}

	@Test
	public void testUpdateStringAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("1");
		final String value = StringUtils.reverse(eOrigin.getASString());

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setASString(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setASString(value);
			}
		}.check();
	}

	@Test
	public void testUpdateBoolAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("1");
		final Boolean value = Boolean.valueOf(!eOrigin.getASBool()
				.booleanValue());

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setASBool(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setASBool(value);
			}
		}.check();

	}

	@Test
	public void testUpdateByteAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("1");
		final Byte value = (byte) (eOrigin.getASByte().byteValue() << 1);

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setASByte(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setASByte(value);
			}
		}.check();

	}

	@Test
	public void testUpdateWordAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("1");
		final Short value = (short) (eOrigin.getASWord().shortValue() << 1);

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setASWord(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setASWord(value);
			}
		}.check();

	}

	@Test
	public void testUpdateLongAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("1");
		final Integer value = (Integer) (eOrigin.getASLong().intValue() << 1);

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setASLong(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setASLong(value);
			}
		}.check();

	}

	@Test
	public void testUpdateLong64Attribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("1");
		final Long value = (Long) (eOrigin.getASLong64().longValue() << 1);

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setASLong64(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setASLong64(value);
			}
		}.check();

	}
	@Ignore
	@Test
	public void testUpdateNumberAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("1");
		final Double value = Double.longBitsToDouble(Double
				.doubleToRawLongBits(eOrigin.getASNumber()) << 1);

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setASNumber(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setASNumber(value);
			}
		}.check();

	}

	@Test
	public void testUpdateDurationAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("1");
		final Integer value = eOrigin.getASDuration() << 1;

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setASDuration(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setASDuration(value);
			}
		}.check();

	}

	@Test
	public void testUpdateUuidAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("1");
		final String value = StringUtils.reverse(eOrigin.getASUuid());

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setASUuid(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setASUuid(value);
			}
		}.check();

	}

	@Test
	public void testUpdateDateAttribute() throws Throwable {

		final UpdateComplex eOrigin = dcuc.get("1");
		final Date value = DateUtils.addDays(eOrigin.getASDate(), 1);

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setASDate(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setASDate(value);
			}
		}.check();

	}

	@Test
	public void testUpdateRelatedEntityAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("1");
		String key = null;

		final DataClass<Master1> dcum = getDSClient()
				.getDataClass(Master1.class);
		Master1[] all = dcum.getAll();
		for (Master1 master1 : all) {
			if (!master1.getKey().equals(
					eOrigin.getaRMaster1().getDeferred().getKey())) {
				logger.debug(master1.getKey());
				key = master1.getKey();
				break;
			}
		}

		final String fkey = key;

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				Master1 value = new Master1();
				value.setKey(fkey);
				eToSend.setaRMaster1(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				Master1 value = null;
				try {
					value = dcum.get(fkey);
					value.setEntityModel(null);
					value.setUri(new RESTRequestBuilder(value.getClass()
							.getSimpleName()).addKey(fkey).toString());
					eExpected.setaRMaster1(value);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}.check();

	}
}
