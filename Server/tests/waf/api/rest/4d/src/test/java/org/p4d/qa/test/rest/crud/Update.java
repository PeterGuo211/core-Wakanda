package org.p4d.qa.test.rest.crud;

/**
 * 
 */



import static org.junit.Assert.assertEquals;

import java.util.Date;



import junitparams.JUnitParamsRunner;


import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.commons.server.rest.Table;
import org.wakanda.qa.commons.server.rest.domain.BasicEntity;
import org.p4d.qa.test.rest.domain.UpdateComplex;
import org.p4d.qa.test.rest.extend.AbstractTestCase;

/**
 * @author soufiane.tigrioui@4d.com
 * 
 */
@RunWith(JUnitParamsRunner.class)
public class Update extends AbstractTestCase {
//
	@SuppressWarnings("unused")
	private final Table<UpdateComplex> dcus = getDSClient().getTable(
			UpdateComplex.class);
	private final Table<UpdateComplex> dcuc = getDSClient().getTable(
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
			Table<T> dcu = (Table<T>) getDSClient().getTable(
					eOrigin.getClass());
			logger.debug("Origin: " + eOrigin);
			logger.debug("Sent: " + getPayload());
			T eReceived = dcu.update(getPayload(),getSessionHttpContext());

			logger.debug("Received: " + eReceived);
			logger.debug("Expected: " + getExpected());
			// Assert
			assertEquals(getExpected(), eReceived);
		}
	}
	
	@Test
	public void testUpdateBoolAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("15343",getSessionHttpContext());
		final Boolean value = Boolean.valueOf(!eOrigin.getAs_bool()
				.booleanValue());

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setAs_bool(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setAs_bool(value);
			}
		}.check();

	}
	
	@Test
	public void testUpdateDateAttribute() throws Throwable {

		final UpdateComplex eOrigin = dcuc.get("15343",getSessionHttpContext());
		final Date value = DateUtils.addDays(eOrigin.getAs_date(), 1);

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setAs_date(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setAs_date(value);
			}
		}.check();

	}
	
	@Test
	public void testUpdateDurationAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("15343",getSessionHttpContext());
		final Integer value = eOrigin.getAs_duration() << 1;

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setAs_duration(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setAs_duration(value);
			}
		}.check();

	}
	
	@Test
	public void testUpdateLongAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("15343",getSessionHttpContext());
		final Integer value = (Integer) (eOrigin.getAs_long().intValue() << 1);

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setAs_long(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setAs_long(value);
			}
		}.check();

	}

	@Test
	public void testUpdateLong64Attribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("15343",getSessionHttpContext());
		final Long value = (Long) (eOrigin.getAs_long64().longValue() << 1);

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setAs_long64(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setAs_long64(value);
			}
		}.check();

	}
	
//	@Test
//	public void testUpdateNumberAttribute() throws Throwable {
//		final UpdateComplex eOrigin = dcuc.get("15343",getSessionHttpContext());
//		final Double value = Double.longBitsToDouble(Double
//				.doubleToRawLongBits(eOrigin.getAs_number()) << 1);
//
//		new ProcessUpdate<UpdateComplex>(eOrigin) {
//
//			@Override
//			public void processPayload(UpdateComplex eToSend) {
//				eToSend.setAs_number(value);
//			}
//
//			@Override
//			public void processExpected(UpdateComplex eExpected) {
//				eExpected.setAs_number(value);
//			}
//		}.check();
//
//	}
	
	
	@Test
	public void testUpdateStringAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("15343",getSessionHttpContext());
		final String value = StringUtils.reverse(eOrigin.getAs_string());

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setAs_string(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setAs_string(value);
			}
		}.check();
	}
	
	@Test
	public void testUpdateUuidAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("15343",getSessionHttpContext());
		final String value = StringUtils.reverse(eOrigin.getAs_uuid());

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setAs_uuid(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setAs_uuid(value);
			}
		}.check();

	}
	
	@Test
	public void testUpdateWordAttribute() throws Throwable {
		final UpdateComplex eOrigin = dcuc.get("15343",getSessionHttpContext());
		final Short value = (short) (eOrigin.getAs_word().shortValue() << 1);

		new ProcessUpdate<UpdateComplex>(eOrigin) {

			@Override
			public void processPayload(UpdateComplex eToSend) {
				eToSend.setAs_word(value);
			}

			@Override
			public void processExpected(UpdateComplex eExpected) {
				eExpected.setAs_word(value);
			}
		}.check();

	}
	
	
}
	
	
	
//
//	@Test
//	@Parameters
//	public void testUpdateMultipleFieldsOfOneSimpleEntity(
//			final Supercomplex eOrigin) throws Throwable {
//		final String svalue = StringUtils.reverse(eOrigin.getASString());
//		final Integer lvalue = eOrigin.getASLong().intValue() << 1;
//		new ProcessUpdate<Supercomplex>(eOrigin) {
//
//			@Override
//			public void processPayload(Supercomplex eToSend) {
//				eToSend.setASString(svalue);
//				eToSend.setASLong(lvalue);
//			}
//
//			@Override
//			public void processExpected(Supercomplex eExpected) {
//				eExpected.setASString(svalue);
//				eExpected.setASLong(lvalue);
//			}
//		}.check();
//	}
//
//	@SuppressWarnings("unused")
//	private Object[] parametersForTestUpdateMultipleFieldsOfOneSimpleEntity()
//			throws Throwable {
//		String[] keys = ArrayUtils.toArray("1", "2", "3", "4", "5");
//		Supercomplex[] params = new Supercomplex[keys.length];
//		for (int i = 0; i < keys.length; i++) {
//			Supercomplex eOrigin = dcus.get(keys[i]);
//			params[i] = eOrigin;
//		}
//		return params;
//	}
//
//	@Test
//	@Parameters
//	public void testUpdateMultipleFieldsOfMultipleGroupsOfSimpleEntities(
//			List<Supercomplex> esToSend, List<Supercomplex> esExpected)
//			throws Throwable {
//		// Update the entities
//		Supercomplex[] esReceived = dcus.update(esToSend);
//		// Assert
//		assertArrayEquals(esExpected.toArray(new Supercomplex[0]), esReceived);
//
//	}
//
//	@SuppressWarnings("unused")
//	private Object[] parametersForTestUpdateMultipleFieldsOfMultipleGroupsOfSimpleEntities()
//			throws Throwable {
//
//		int count = (int) dcus.count();
//		Object[] params = new Object[count];
//
//		for (int i = 0; i < count; i++) {
//			// Get the entities to update
//			Supercomplex[] esOrigin = dcus.filterBy("ID<=" + (i + 1));
//
//			List<Supercomplex> esToSend = new ArrayList<Supercomplex>(
//					esOrigin.length);
//			List<Supercomplex> esExpected = new ArrayList<Supercomplex>(
//					esOrigin.length);
//
//			for (int y = 0; y < esOrigin.length; y++) {
//
//				final String v1 = StringUtils
//						.reverse(esOrigin[y].getASString());
//				final Integer v2 = esOrigin[y].getASLong() << 1;
//
//				ProcessUpdate<Supercomplex> p = new ProcessUpdate<Supercomplex>(
//						esOrigin[y]) {
//
//					@Override
//					public void processPayload(Supercomplex eToSend) {
//						eToSend.setASString(v1);
//						eToSend.setASLong(v2);
//					}
//
//					@Override
//					public void processExpected(Supercomplex eExpected) {
//						eExpected.setASString(v1);
//						eExpected.setASLong(v2);
//					}
//				};
//
//				esToSend.add(p.getPayload());
//				esExpected.add(p.getExpected());
//			}
//
//			params[i] = $(esToSend, esExpected);
//		}
//		return params;
//
//	}
//
//	@Test
//	public void testUpdateStringAttribute() throws Throwable {
//		final Supercomplex eOrigin = dcuc.get("1");
//		final String value = StringUtils.reverse(eOrigin.getASString());
//
//		new ProcessUpdate<Supercomplex>(eOrigin) {
//
//			@Override
//			public void processPayload(Supercomplex eToSend) {
//				eToSend.setASString(value);
//			}
//
//			@Override
//			public void processExpected(Supercomplex eExpected) {
//				eExpected.setASString(value);
//			}
//		}.check();
//	}
//

//
//	@Test
//	public void testUpdateByteAttribute() throws Throwable {
//		final Supercomplex eOrigin = dcuc.get("1");
//		final Byte value = (byte) (eOrigin.getASByte().byteValue() << 1);
//
//		new ProcessUpdate<Supercomplex>(eOrigin) {
//
//			@Override
//			public void processPayload(Supercomplex eToSend) {
//				eToSend.setASByte(value);
//			}
//
//			@Override
//			public void processExpected(Supercomplex eExpected) {
//				eExpected.setASByte(value);
//			}
//		}.check();
//
//	}
//
//	@Test
//	public void testUpdateWordAttribute() throws Throwable {
//		final Supercomplex eOrigin = dcuc.get("1");
//		final Short value = (short) (eOrigin.getASWord().shortValue() << 1);
//
//		new ProcessUpdate<Supercomplex>(eOrigin) {
//
//			@Override
//			public void processPayload(Supercomplex eToSend) {
//				eToSend.setASWord(value);
//			}
//
//			@Override
//			public void processExpected(Supercomplex eExpected) {
//				eExpected.setASWord(value);
//			}
//		}.check();
//
//	}
//
//	@Test
//	public void testUpdateLongAttribute() throws Throwable {
//		final Supercomplex eOrigin = dcuc.get("1");
//		final Integer value = (Integer) (eOrigin.getASLong().intValue() << 1);
//
//		new ProcessUpdate<Supercomplex>(eOrigin) {
//
//			@Override
//			public void processPayload(Supercomplex eToSend) {
//				eToSend.setASLong(value);
//			}
//
//			@Override
//			public void processExpected(Supercomplex eExpected) {
//				eExpected.setASLong(value);
//			}
//		}.check();
//
//	}
//
//	@Test
//	public void testUpdateLong64Attribute() throws Throwable {
//		final Supercomplex eOrigin = dcuc.get("1");
//		final Long value = (Long) (eOrigin.getASLong64().longValue() << 1);
//
//		new ProcessUpdate<Supercomplex>(eOrigin) {
//
//			@Override
//			public void processPayload(Supercomplex eToSend) {
//				eToSend.setASLong64(value);
//			}
//
//			@Override
//			public void processExpected(Supercomplex eExpected) {
//				eExpected.setASLong64(value);
//			}
//		}.check();
//
//	}
//
//	@Test
//	public void testUpdateNumberAttribute() throws Throwable {
//		final Supercomplex eOrigin = dcuc.get("1");
//		final Double value = Double.longBitsToDouble(Double
//				.doubleToRawLongBits(eOrigin.getASNumber()) << 1);
//
//		new ProcessUpdate<Supercomplex>(eOrigin) {
//
//			@Override
//			public void processPayload(Supercomplex eToSend) {
//				eToSend.setASNumber(value);
//			}
//
//			@Override
//			public void processExpected(Supercomplex eExpected) {
//				eExpected.setASNumber(value);
//			}
//		}.check();
//
//	}
//
//	@Test
//	public void testUpdateDurationAttribute() throws Throwable {
//		final Supercomplex eOrigin = dcuc.get("1");
//		final Integer value = eOrigin.getASDuration() << 1;
//
//		new ProcessUpdate<Supercomplex>(eOrigin) {
//
//			@Override
//			public void processPayload(Supercomplex eToSend) {
//				eToSend.setASDuration(value);
//			}
//
//			@Override
//			public void processExpected(Supercomplex eExpected) {
//				eExpected.setASDuration(value);
//			}
//		}.check();
//
//	}
//
//	@Test
//	public void testUpdateUuidAttribute() throws Throwable {
//		final Supercomplex eOrigin = dcuc.get("1");
//		final String value = StringUtils.reverse(eOrigin.getASUuid());
//
//		new ProcessUpdate<Supercomplex>(eOrigin) {
//
//			@Override
//			public void processPayload(Supercomplex eToSend) {
//				eToSend.setASUuid(value);
//			}
//
//			@Override
//			public void processExpected(Supercomplex eExpected) {
//				eExpected.setASUuid(value);
//			}
//		}.check();
//
//	}
//
//	@Test
//	public void testUpdateDateAttribute() throws Throwable {
//
//		final Supercomplex eOrigin = dcuc.get("1");
//		final Date value = DateUtils.addDays(eOrigin.getAsi_date(), 1);
//
//		new ProcessUpdate<Supercomplex>(eOrigin) {
//
//			@Override
//			public void processPayload(Supercomplex eToSend) {
//				eToSend.setAsi_date(value);
//			}
//
//			@Override
//			public void processExpected(Supercomplex eExpected) {
//				eExpected.setAsi_date(value);
//			}
//		}.check();
//
//	}
//
//	@Test
//	public void testUpdateRelatedEntityAttribute() throws Throwable {
//		final Supercomplex eOrigin = dcuc.get("1");
//		String key = null;
//
//		final DataClass<Master1> dcum = getDSClient()
//				.getDataClass(Master1.class);
//		Master1[] all = dcum.getAll();
//		for (Master1 master1 : all) {
//			if (!master1.getKey().equals(
//					eOrigin.getaRMaster1().getDeferred().getKey())) {
//				logger.debug(master1.getKey());
//				key = master1.getKey();
//				break;
//			}
//		}
//
//		final String fkey = key;
//
//		new ProcessUpdate<Supercomplex>(eOrigin) {
//
//			@Override
//			public void processPayload(Supercomplex eToSend) {
//				Master1 value = new Master1();
//				value.setKey(fkey);
//				eToSend.setaRMaster1(value);
//			}
//
//			@Override
//			public void processExpected(Supercomplex eExpected) {
//				Master1 value = null;
//				try {
//					value = dcum.get(fkey);
//					value.setEntityModel(null);
//					value.setUri(new RESTRequestBuilder(value.getClass()
//							.getSimpleName()).addKey(fkey).toString());
//					eExpected.setaRMaster1(value);
//				} catch (Exception e) {
//					e.printStackTrace();
//				}
//			}
//		}.check();
//
//	}
//}
//
