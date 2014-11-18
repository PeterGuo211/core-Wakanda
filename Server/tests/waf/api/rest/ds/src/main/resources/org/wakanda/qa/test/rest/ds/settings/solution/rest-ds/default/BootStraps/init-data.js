var nsmall = 5;
var nmedium = 10;
var nlarge = 50;
var raz = false;

// Scope
DataGenUtils.generateData(ds.ScopePublic, nsmall, raz);
DataGenUtils.generateData(ds.ScopePublicOnServer, nsmall, raz);

// Case-sensitivity
//DataGenUtils.generateData(ds.CAsEsEnSiTiVe, nsmall, raz);
//DataGenUtils.generateData(ds.CaSeSeNsItIvE, nsmall, raz);
DataGenUtils.generateData(ds.MethodCaseSensitive, nsmall, raz);
DataGenUtils.generateData(ds.AttributeCaseSensitive, 1, raz);

// Stamp
DataGenUtils.generateData(ds.Stamp, nsmall, raz);

// Simple
DataGenUtils.generateData(ds.Simple, nsmall, raz);

// Filter
DataGenUtils.generateFilterAndOrderByData(ds.SimpleFilter, nlarge, raz);

// Masters
DataGenUtils.generateData(ds.Master1, nsmall, raz);
DataGenUtils.generateData(ds.Master2, nsmall, raz);
DataGenUtils.generateData(ds.MasterComplex, nsmall, raz);

// Attributes
DataGenUtils.generateFilterAndOrderByData(ds.Attributes, nmedium, raz);

// Complex
DataGenUtils.generateData(ds.Complex, nsmall, raz);
DataGenUtils.generateData(ds.SuperComplex, nsmall, raz);

// Extends
DataGenUtils.generateData(ds.SubComplex, nsmall, raz);

// Slave
DataGenUtils.generateData(ds.Slave1, nsmall, raz);

// Key
DataGenUtils.generateData(ds.Master3, nmedium, raz);
DataGenUtils.generateData(ds.KeyLong, nmedium, raz);
DataGenUtils.generateData(ds.KeyLong64, nmedium, raz);
DataGenUtils.generateData(ds.KeyNumber, nmedium, raz);
DataGenUtils.generateData(ds.KeyUuid, nmedium, raz);
DataGenUtils.generateData(ds.KeyString, nmedium, raz);

// Method
DataGenUtils.generateData(ds.Method, nsmall, raz);
