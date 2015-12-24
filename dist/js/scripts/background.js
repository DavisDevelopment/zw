(function (console, $hx_exports) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Background = function() {
	this.listen();
};
$hxClasses["Background"] = Background;
Background.__name__ = ["Background"];
Background.main = function() {
	new Background();
};
Background.prototype = {
	listen: function() {
		chrome.app.runtime.onLaunched.addListener(function(data) {
			chrome_Windows.create("../pages/index.html",null,function(appw) {
				appw.maximize();
				appw.drawAttention();
			});
		});
	}
	,__class__: Background
};
var EReg = function() { };
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,matchedPos: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) len = -1;
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0?s:HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) this.r.s = s;
			return b;
		} else {
			var b1 = this.match(len < 0?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len));
			if(b1) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b1;
		}
	}
	,map: function(s,f) {
		var offset = 0;
		var buf = new StringBuf();
		do {
			if(offset >= s.length) break; else if(!this.matchSub(s,offset)) {
				buf.add(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf.add(HxOverrides.substr(s,offset,p.pos - offset));
			buf.add(f(this));
			if(p.len == 0) {
				buf.add(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else offset = p.pos + p.len;
		} while(this.r.global);
		if(!this.r.global && offset > 0 && offset < s.length) buf.add(HxOverrides.substr(s,offset,null));
		return buf.b;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = [];
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var chrome_Runtime = function() { };
$hxClasses["chrome.Runtime"] = chrome_Runtime;
chrome_Runtime.__name__ = ["chrome","Runtime"];
chrome_Runtime.__properties__ = {get_lib:"get_lib"}
chrome_Runtime.onLaunch = function(f) {
	chrome.app.runtime.onLaunched.addListener(f);
};
chrome_Runtime.onInstalled = function(f) {
	chrome_Runtime.rt.onInstalled.addListener(f);
};
chrome_Runtime.get_lib = function() {
	return chrome.app.runtime;
};
var chrome_Windows = function() { };
$hxClasses["chrome.Windows"] = chrome_Windows;
chrome_Windows.__name__ = ["chrome","Windows"];
chrome_Windows.create = function(url,options,cb) {
	chrome_Windows.lib.create(url,options,cb);
};
chrome_Windows.current = function() {
	return chrome_Windows.lib.current();
};
var chrome_app__$AppWindow_AppWindow_$Impl_$ = {};
$hxClasses["chrome.app._AppWindow.AppWindow_Impl_"] = chrome_app__$AppWindow_AppWindow_$Impl_$;
chrome_app__$AppWindow_AppWindow_$Impl_$.__name__ = ["chrome","app","_AppWindow","AppWindow_Impl_"];
chrome_app__$AppWindow_AppWindow_$Impl_$._new = function(tw) {
	return tw;
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
haxe_IMap.prototype = {
	__class__: haxe_IMap
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) return hb;
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_crypto_Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe_crypto_Base64;
haxe_crypto_Base64.__name__ = ["haxe","crypto","Base64"];
haxe_crypto_Base64.encode = function(bytes,complement) {
	if(complement == null) complement = true;
	var str = new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).encodeBytes(bytes).toString();
	if(complement) {
		var _g = bytes.length % 3;
		switch(_g) {
		case 1:
			str += "==";
			break;
		case 2:
			str += "=";
			break;
		default:
		}
	}
	return str;
};
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) complement = true;
	if(complement) while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw new js__$Boot_HaxeError("BaseCode : base length must be a power of two.");
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = ["haxe","crypto","BaseCode"];
haxe_crypto_BaseCode.prototype = {
	encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = haxe_io_Bytes.alloc(size + (b.length * 8 % nbits == 0?0:1));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.get(pin++);
			}
			curbits -= nbits;
			out.set(pout++,base.b[buf >> curbits & mask]);
		}
		if(curbits > 0) out.set(pout++,base.b[buf << nbits - curbits & mask]);
		return out;
	}
	,initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) this.initTable();
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = haxe_io_Bytes.alloc(size);
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.get(pin++)];
				if(i == -1) throw new js__$Boot_HaxeError("BaseCode : invalid encoded char");
				buf |= i;
			}
			curbits -= 8;
			out.set(pout++,buf >> curbits & 255);
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Error = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var tannus_ds_ArrayTools = function() { };
$hxClasses["tannus.ds.ArrayTools"] = tannus_ds_ArrayTools;
tannus_ds_ArrayTools.__name__ = ["tannus","ds","ArrayTools"];
tannus_ds_ArrayTools.pointerArray = function(a) {
	var res = [];
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = [_g1++];
		res.push(new tannus_io__$Pointer_Ref((function(i) {
			return function() {
				return a[i[0]];
			};
		})(i),(function(i) {
			return function(v) {
				return a[i[0]] = v;
			};
		})(i)));
	}
	return res;
};
tannus_ds_ArrayTools.without = function(list,blacklist) {
	var c = list.slice();
	var _g = 0;
	while(_g < blacklist.length) {
		var v = blacklist[_g];
		++_g;
		while(true) if(!HxOverrides.remove(c,v)) break;
	}
	return c;
};
tannus_ds_ArrayTools.hasf = function(set,item,tester) {
	var $it0 = $iterator(set)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(tester(x,item)) return true;
	}
	return false;
};
tannus_ds_ArrayTools.unique = function(set,tester) {
	if(tester == null) tester = function(x,y) {
		return x == y;
	};
	var results = [];
	var _g = 0;
	while(_g < set.length) {
		var item = set[_g];
		++_g;
		if(!tannus_ds_ArrayTools.hasf(results,item,tester)) results.push(item);
	}
	return results;
};
tannus_ds_ArrayTools.union = function(one,other) {
	return one.filter(function(item) {
		return Lambda.has(other,item);
	});
};
tannus_ds_ArrayTools.flatten = function(set) {
	var res = [];
	var _g = 0;
	while(_g < set.length) {
		var sub = set[_g];
		++_g;
		res = res.concat(sub);
	}
	return res;
};
tannus_ds_ArrayTools.last = function(list,v) {
	if(v == null) return list[list.length - 1]; else return list[list.length - 1] = v;
};
tannus_ds_ArrayTools.before = function(list,val) {
	return list.slice(0,HxOverrides.indexOf(list,val,0) != -1?HxOverrides.indexOf(list,val,0):list.length);
};
tannus_ds_ArrayTools.after = function(list,val) {
	return list.slice(HxOverrides.indexOf(list,val,0) != -1?HxOverrides.indexOf(list,val,0) + 1:0);
};
tannus_ds_ArrayTools.times = function(list,n) {
	var res = list.slice();
	var _g1 = 0;
	var _g = n - 1;
	while(_g1 < _g) {
		var i = _g1++;
		res = res.concat(list.slice());
	}
	return res;
};
tannus_ds_ArrayTools.min = function(list,predicate) {
	var m = null;
	var $it0 = $iterator(list)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		var score = predicate(x);
		if(m == null || score < m[1]) m = [x,score];
	}
	if(m == null) throw new js__$Boot_HaxeError("Error: Iterable must not be empty!");
	return m[0];
};
tannus_ds_ArrayTools.max = function(list,predicate) {
	var m = null;
	var $it0 = $iterator(list)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		var score = predicate(x);
		if(m == null || score > m[1]) m = [x,score];
	}
	if(m == null) throw new js__$Boot_HaxeError("Error: Iterable must not be empty!");
	return m[0];
};
tannus_ds_ArrayTools.minmax = function(list,predicate) {
	var l = null;
	var h = null;
	var $it0 = $iterator(list)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		var score = predicate(x);
		if(l == null || score < l[1]) l = [x,score]; else if(h == null || score > h[1]) h = [x,score];
	}
	if(l == null || h == null) throw new js__$Boot_HaxeError("Error: Iterable must not be empty!");
	return { 'min' : l[0], 'max' : h[0]};
};
tannus_ds_ArrayTools.splitfilter = function(list,pred) {
	var res = { 'pass' : [], 'fail' : []};
	var _g = 0;
	while(_g < list.length) {
		var item = list[_g];
		++_g;
		(pred(item)?res.pass:res.fail).push(item);
	}
	return res;
};
var tannus_ds__$Async_Async_$Impl_$ = {};
$hxClasses["tannus.ds._Async.Async_Impl_"] = tannus_ds__$Async_Async_$Impl_$;
tannus_ds__$Async_Async_$Impl_$.__name__ = ["tannus","ds","_Async","Async_Impl_"];
tannus_ds__$Async_Async_$Impl_$._new = function(f) {
	return f;
};
tannus_ds__$Async_Async_$Impl_$.fromTask = function(t) {
	var f = t.toAsync();
	return f;
};
tannus_ds__$Async_Async_$Impl_$.toTask = function(this1) {
	return new tannus_ds__$Async_AsyncTask(this1);
};
var tannus_ds__$Async_Async1_$Impl_$ = {};
$hxClasses["tannus.ds._Async.Async1_Impl_"] = tannus_ds__$Async_Async1_$Impl_$;
tannus_ds__$Async_Async1_$Impl_$.__name__ = ["tannus","ds","_Async","Async1_Impl_"];
tannus_ds__$Async_Async1_$Impl_$._new = function(f) {
	return f;
};
var tannus_ds_Task = function() {
	this._doing = false;
	this.onkill = new tannus_io_VoidSignal();
	this.onfinish = new tannus_io_VoidSignal();
};
$hxClasses["tannus.ds.Task"] = tannus_ds_Task;
tannus_ds_Task.__name__ = ["tannus","ds","Task"];
tannus_ds_Task.prototype = {
	start: function() {
		if(!this._doing) this._doing = true; else throw new js__$Boot_HaxeError("Error: Task already running");
	}
	,perform: function(done) {
		this.start();
		this.onfinish.once(done);
		this.action($bind(this,this.finish));
	}
	,action: function(done) {
		done();
	}
	,finish: function() {
		this._doing = false;
		this.onfinish.call();
	}
	,abort: function() {
		if(this._doing) this.onkill.call(); else throw new js__$Boot_HaxeError("Error: Cannot abort a Task that is not running!");
	}
	,toAsync: function() {
		return (function(f) {
			return function(a1) {
				f(a1);
			};
		})($bind(this,this.perform));
	}
	,get_doing: function() {
		return this._doing;
	}
	,__class__: tannus_ds_Task
	,__properties__: {get_doing:"get_doing"}
};
var tannus_ds__$Async_AsyncTask = function(a) {
	tannus_ds_Task.call(this);
	this.f = a;
};
$hxClasses["tannus.ds._Async.AsyncTask"] = tannus_ds__$Async_AsyncTask;
tannus_ds__$Async_AsyncTask.__name__ = ["tannus","ds","_Async","AsyncTask"];
tannus_ds__$Async_AsyncTask.__super__ = tannus_ds_Task;
tannus_ds__$Async_AsyncTask.prototype = $extend(tannus_ds_Task.prototype,{
	action: function(done) {
		this.f(done);
	}
	,__class__: tannus_ds__$Async_AsyncTask
});
var tannus_ds_Stack = function(dat) {
	if(dat != null) this.data = dat; else this.data = [];
};
$hxClasses["tannus.ds.Stack"] = tannus_ds_Stack;
tannus_ds_Stack.__name__ = ["tannus","ds","Stack"];
tannus_ds_Stack.prototype = {
	peek: function(d) {
		if(d == null) d = 0;
		return this.data[d];
	}
	,pop: function() {
		return this.data.shift();
	}
	,add: function(item) {
		this.data.unshift(item);
	}
	,under: function(item) {
		this.data.push(item);
	}
	,bottom: function() {
		return this.data.pop();
	}
	,next: function(item) {
		if(item != null) this.add(item); else item = this.pop();
		return item;
	}
	,last: function(item) {
		if(item != null) this.under(item); else item = this.bottom();
		return item;
	}
	,copy: function() {
		return new tannus_ds_Stack(this.data.slice());
	}
	,iterator: function() {
		return new tannus_ds__$Stack_StackIterator(this);
	}
	,get_empty: function() {
		return this.data.length == 0;
	}
	,__class__: tannus_ds_Stack
	,__properties__: {get_empty:"get_empty"}
};
var tannus_ds_AsyncStack = function() {
	tannus_ds_Stack.call(this);
	this.completion = new tannus_io_VoidSignal();
};
$hxClasses["tannus.ds.AsyncStack"] = tannus_ds_AsyncStack;
tannus_ds_AsyncStack.__name__ = ["tannus","ds","AsyncStack"];
tannus_ds_AsyncStack.__super__ = tannus_ds_Stack;
tannus_ds_AsyncStack.prototype = $extend(tannus_ds_Stack.prototype,{
	callNext: function() {
		if(!this.get_empty()) {
			var action = this.pop();
			action($bind(this,this.callNext));
		} else this.completion.call();
	}
	,run: function(done) {
		if(this.get_empty()) done(); else {
			this.completion.once(done);
			this.callNext();
		}
	}
	,push: function(f) {
		this.under(f);
	}
	,__class__: tannus_ds_AsyncStack
});
var tannus_ds__$Delta_Delta_$Impl_$ = {};
$hxClasses["tannus.ds._Delta.Delta_Impl_"] = tannus_ds__$Delta_Delta_$Impl_$;
tannus_ds__$Delta_Delta_$Impl_$.__name__ = ["tannus","ds","_Delta","Delta_Impl_"];
tannus_ds__$Delta_Delta_$Impl_$.__properties__ = {get_previous:"get_previous",get_current:"get_current"}
tannus_ds__$Delta_Delta_$Impl_$._new = function(cur,prev) {
	return [cur,prev];
};
tannus_ds__$Delta_Delta_$Impl_$.toString = function(this1) {
	var res = "Delta(";
	if(this1[1] != null) res += "from " + Std.string(this1[1]) + " ";
	res += "to " + Std.string(this1[0]) + ")";
	return res;
};
tannus_ds__$Delta_Delta_$Impl_$.get_current = function(this1) {
	return this1[0];
};
tannus_ds__$Delta_Delta_$Impl_$.get_previous = function(this1) {
	return this1[1];
};
var tannus_ds_Destructible = function() { };
$hxClasses["tannus.ds.Destructible"] = tannus_ds_Destructible;
tannus_ds_Destructible.__name__ = ["tannus","ds","Destructible"];
tannus_ds_Destructible.prototype = {
	__class__: tannus_ds_Destructible
};
var tannus_ds__$Dict_Dict_$Impl_$ = {};
$hxClasses["tannus.ds._Dict.Dict_Impl_"] = tannus_ds__$Dict_Dict_$Impl_$;
tannus_ds__$Dict_Dict_$Impl_$.__name__ = ["tannus","ds","_Dict","Dict_Impl_"];
tannus_ds__$Dict_Dict_$Impl_$._new = function(cd) {
	return cd != null?cd:new tannus_ds_CDict();
};
tannus_ds__$Dict_Dict_$Impl_$.iterator = function(this1) {
	return new _$List_ListIterator(this1.pairs.h);
};
tannus_ds__$Dict_Dict_$Impl_$.get = function(this1,k) {
	return this1.get(k);
};
tannus_ds__$Dict_Dict_$Impl_$.set = function(this1,k,v) {
	return this1.setByKey(k,v);
};
tannus_ds__$Dict_Dict_$Impl_$.setKey = function(this1,v,k) {
	return this1.setByValue(k,v);
};
tannus_ds__$Dict_Dict_$Impl_$.remove = function(this1,id) {
	{
		var _g = id;
		switch(_g[1]) {
		case 0:
			var key = _g[2];
			this1.removeByKey(key);
			break;
		case 1:
			var val = _g[2];
			this1.removeByValue(val);
			break;
		}
	}
};
tannus_ds__$Dict_Dict_$Impl_$.exists = function(this1,key) {
	return this1.get(key) != null;
};
tannus_ds__$Dict_Dict_$Impl_$.write_a = function(this1,other) {
	this1.write(other);
};
tannus_ds__$Dict_Dict_$Impl_$.toObject = function(this1) {
	var o = { };
	var $it0 = new _$List_ListIterator(this1.pairs.h);
	while( $it0.hasNext() ) {
		var p = $it0.next();
		var key = Std.string(p[0]) + "";
		Reflect.setProperty(o,key,p[1]);
		Reflect.getProperty(o,key);
	}
	return o;
};
var tannus_ds_CDict = function() {
	this.pairs = new List();
};
$hxClasses["tannus.ds.CDict"] = tannus_ds_CDict;
tannus_ds_CDict.__name__ = ["tannus","ds","CDict"];
tannus_ds_CDict.prototype = {
	get: function(key) {
		var pair;
		{
			var this1 = this.getPairByKey(key);
			if(this1 != null) pair = this1; else pair = this1;
		}
		if(pair != null) return pair[1]; else return null;
	}
	,set: function(k,v) {
		return this.setByKey(k,v);
	}
	,getPairByKey: function(key) {
		var _g_head = this.pairs.h;
		var _g_val = null;
		while(_g_head != null) {
			var p;
			p = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			if(p[0] == key) return p;
		}
		return null;
	}
	,getPairByValue: function(value) {
		var _g_head = this.pairs.h;
		var _g_val = null;
		while(_g_head != null) {
			var p;
			p = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			if(p[1] == value) return p;
		}
		return null;
	}
	,setByKey: function(k,v) {
		var p = this.getPairByKey(k);
		if(p != null) (p != null?p:p)[1] = v; else this.pairs.add([k,v]);
		return v;
	}
	,setByValue: function(k,v) {
		var p = this.getPairByValue(v);
		if(p != null) (p != null?p:p)[0] = k; else this.pairs.add([k,v]);
		return k;
	}
	,removeByKey: function(key) {
		this.pairs.remove((function($this) {
			var $r;
			var this1 = $this.getPairByKey(key);
			$r = this1 != null?this1:this1;
			return $r;
		}(this)));
	}
	,removeByValue: function(val) {
		this.pairs.remove((function($this) {
			var $r;
			var this1 = $this.getPairByValue(val);
			$r = this1 != null?this1:this1;
			return $r;
		}(this)));
	}
	,write: function(other) {
		var $it0 = (function($this) {
			var $r;
			var o = { };
			var $it1 = new _$List_ListIterator(other.pairs.h);
			while( $it1.hasNext() ) {
				var p = $it1.next();
				var key = Std.string(p[0]) + "";
				Reflect.setProperty(o,key,p[1]);
				Reflect.getProperty(o,key);
			}
			$r = o;
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var pair = $it0.next();
			this.setByKey(pair.key,pair.value);
		}
	}
	,__class__: tannus_ds_CDict
};
var tannus_ds__$Dict_Pair_$Impl_$ = {};
$hxClasses["tannus.ds._Dict.Pair_Impl_"] = tannus_ds__$Dict_Pair_$Impl_$;
tannus_ds__$Dict_Pair_$Impl_$.__name__ = ["tannus","ds","_Dict","Pair_Impl_"];
tannus_ds__$Dict_Pair_$Impl_$.__properties__ = {set_value:"set_value",get_value:"get_value",set_key:"set_key",get_key:"get_key"}
tannus_ds__$Dict_Pair_$Impl_$._new = function(p) {
	return p;
};
tannus_ds__$Dict_Pair_$Impl_$.get_key = function(this1) {
	return this1[0];
};
tannus_ds__$Dict_Pair_$Impl_$.set_key = function(this1,nk) {
	return this1[0] = nk;
};
tannus_ds__$Dict_Pair_$Impl_$.get_value = function(this1) {
	return this1[1];
};
tannus_ds__$Dict_Pair_$Impl_$.set_value = function(this1,nv) {
	return this1[1] = nv;
};
tannus_ds__$Dict_Pair_$Impl_$.toArray = function(this1) {
	var a = [this1[0],this1[1]];
	return a;
};
var tannus_ds__$EitherType_EitherType_$Impl_$ = {};
$hxClasses["tannus.ds._EitherType.EitherType_Impl_"] = tannus_ds__$EitherType_EitherType_$Impl_$;
tannus_ds__$EitherType_EitherType_$Impl_$.__name__ = ["tannus","ds","_EitherType","EitherType_Impl_"];
tannus_ds__$EitherType_EitherType_$Impl_$.__properties__ = {get_type:"get_type"}
tannus_ds__$EitherType_EitherType_$Impl_$._new = function(e) {
	return e;
};
tannus_ds__$EitherType_EitherType_$Impl_$.get_type = function(this1) {
	return this1;
};
tannus_ds__$EitherType_EitherType_$Impl_$.toLeft = function(this1) {
	{
		var _g = this1;
		switch(_g[1]) {
		case 0:
			var lv = _g[2];
			return lv;
		case 1:
			var rv = _g[2];
			throw new js__$Boot_HaxeError("EitherTypeError: " + Std.string(rv) + " was not the expected value!");
			break;
		}
	}
};
tannus_ds__$EitherType_EitherType_$Impl_$.toRight = function(this1) {
	{
		var _g = this1;
		switch(_g[1]) {
		case 1:
			var rv = _g[2];
			return rv;
		case 0:
			var lv = _g[2];
			throw new js__$Boot_HaxeError("EitherTypeError: " + Std.string(lv) + " was not the expected value!");
			break;
		}
	}
};
tannus_ds__$EitherType_EitherType_$Impl_$.fromL = function(v) {
	var e = tannus_ds_Either.Left(v);
	return e;
};
tannus_ds__$EitherType_EitherType_$Impl_$.fromR = function(v) {
	var e = tannus_ds_Either.Right(v);
	return e;
};
var tannus_ds_Either = { __ename__ : ["tannus","ds","Either"], __constructs__ : ["Left","Right"] };
tannus_ds_Either.Left = function(value) { var $x = ["Left",0,value]; $x.__enum__ = tannus_ds_Either; $x.toString = $estr; return $x; };
tannus_ds_Either.Right = function(value) { var $x = ["Right",1,value]; $x.__enum__ = tannus_ds_Either; $x.toString = $estr; return $x; };
var tannus_ds_Range = function(mi,ma) {
	this.min = mi;
	this.max = ma;
};
$hxClasses["tannus.ds.Range"] = tannus_ds_Range;
tannus_ds_Range.__name__ = ["tannus","ds","Range"];
tannus_ds_Range.prototype = {
	contains: function(v) {
		return v > this.min && v < this.max;
	}
	,clamp: function(v) {
		if(v < this.min) return this.min; else if(v > this.max) return this.max; else return v;
	}
	,toString: function() {
		return "Range(" + Std.string(this.min) + " => " + Std.string(this.max) + ")";
	}
	,get_size: function() {
		return this.max - this.min;
	}
	,__class__: tannus_ds_Range
	,__properties__: {get_size:"get_size"}
};
var tannus_ds_FloatRange = function(mi,ma) {
	tannus_ds_Range.call(this,mi,ma);
};
$hxClasses["tannus.ds.FloatRange"] = tannus_ds_FloatRange;
tannus_ds_FloatRange.__name__ = ["tannus","ds","FloatRange"];
tannus_ds_FloatRange.__super__ = tannus_ds_Range;
tannus_ds_FloatRange.prototype = $extend(tannus_ds_Range.prototype,{
	__class__: tannus_ds_FloatRange
});
var tannus_ds_MapTools = function() { };
$hxClasses["tannus.ds.MapTools"] = tannus_ds_MapTools;
tannus_ds_MapTools.__name__ = ["tannus","ds","MapTools"];
tannus_ds_MapTools.keyArray = function(self) {
	var _g = [];
	var $it0 = self.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		_g.push(k);
	}
	return _g;
};
tannus_ds_MapTools.toObject = function(self) {
	var o = { };
	var $it0 = self.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		var value;
		value = __map_reserved[key] != null?self.getReserved(key):self.h[key];
		Reflect.setProperty(o,key,value);
		Reflect.getProperty(o,key);
	}
	return o;
};
var tannus_ds__$Maybe_Maybe_$Impl_$ = {};
$hxClasses["tannus.ds._Maybe.Maybe_Impl_"] = tannus_ds__$Maybe_Maybe_$Impl_$;
tannus_ds__$Maybe_Maybe_$Impl_$.__name__ = ["tannus","ds","_Maybe","Maybe_Impl_"];
tannus_ds__$Maybe_Maybe_$Impl_$.__properties__ = {get_value:"get_value",get_exists:"get_exists"}
tannus_ds__$Maybe_Maybe_$Impl_$._new = function(x) {
	return x;
};
tannus_ds__$Maybe_Maybe_$Impl_$.or = function(this1,alt) {
	if(this1 != null) return this1; else return alt;
};
tannus_ds__$Maybe_Maybe_$Impl_$.orGetter = function(this1,gettr) {
	if(this1 != null) return this1; else return gettr();
};
tannus_ds__$Maybe_Maybe_$Impl_$.runIf = function(this1,f) {
	if(this1 != null) return f(this1 != null?this1:this1); else return null;
};
tannus_ds__$Maybe_Maybe_$Impl_$.get_exists = function(this1) {
	return this1 != null;
};
tannus_ds__$Maybe_Maybe_$Impl_$.get_value = function(this1) {
	return this1 != null?this1:this1;
};
tannus_ds__$Maybe_Maybe_$Impl_$.orDie = function(this1,error) {
	if(!(this1 != null)) throw new js__$Boot_HaxeError(error);
	return this1 != null?this1:this1;
};
tannus_ds__$Maybe_Maybe_$Impl_$.toNonNullable = function(this1) {
	if(this1 != null) return this1; else return this1;
};
tannus_ds__$Maybe_Maybe_$Impl_$.toBoolean = function(this1) {
	return this1 != null;
};
var tannus_ds__$Method_Method_$Impl_$ = {};
$hxClasses["tannus.ds._Method.Method_Impl_"] = tannus_ds__$Method_Method_$Impl_$;
tannus_ds__$Method_Method_$Impl_$.__name__ = ["tannus","ds","_Method","Method_Impl_"];
tannus_ds__$Method_Method_$Impl_$.__properties__ = {get_call:"get_call"}
tannus_ds__$Method_Method_$Impl_$._new = function(func,ctx) {
	var this1;
	this1 = (function(f,o,a1) {
		return function(a2) {
			return f(o,a1,a2);
		};
	})(Reflect.callMethod,ctx,func);
	return this1;
};
tannus_ds__$Method_Method_$Impl_$.get_call = function(this1) {
	return Reflect.makeVarArgs(this1);
};
tannus_ds__$Method_Method_$Impl_$.fromFunction = function(f) {
	var this1;
	this1 = (function(f1,o,a1) {
		return function(a2) {
			return f1(o,a1,a2);
		};
	})(Reflect.callMethod,null,f);
	return this1;
};
var tannus_ds__$Object_Object_$Impl_$ = {};
$hxClasses["tannus.ds._Object.Object_Impl_"] = tannus_ds__$Object_Object_$Impl_$;
tannus_ds__$Object_Object_$Impl_$.__name__ = ["tannus","ds","_Object","Object_Impl_"];
tannus_ds__$Object_Object_$Impl_$.__properties__ = {get_keys:"get_keys"}
tannus_ds__$Object_Object_$Impl_$._new = function(o) {
	return o;
};
tannus_ds__$Object_Object_$Impl_$.get_keys = function(this1) {
	return Reflect.fields(this1);
};
tannus_ds__$Object_Object_$Impl_$.get = function(this1,key) {
	return Reflect.getProperty(this1,key);
};
tannus_ds__$Object_Object_$Impl_$.set = function(this1,key,value) {
	Reflect.setProperty(this1,key,value);
	return Reflect.getProperty(this1,key);
};
tannus_ds__$Object_Object_$Impl_$.exists = function(this1,key) {
	return Object.prototype.hasOwnProperty.call(this1,key);
};
tannus_ds__$Object_Object_$Impl_$.remove = function(this1,key) {
	Reflect.deleteField(this1,key);
};
tannus_ds__$Object_Object_$Impl_$.clone = function(this1) {
	var c = { };
	var _g = 0;
	var _g1 = Reflect.fields(this1);
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		var value = Reflect.getProperty(this1,k);
		Reflect.setProperty(c,k,value);
		Reflect.getProperty(c,k);
	}
	return c;
};
tannus_ds__$Object_Object_$Impl_$.pairs = function(this1) {
	return Reflect.fields(this1).map(function(k) {
		return { 'name' : k, 'value' : Reflect.getProperty(this1,k)};
	});
};
tannus_ds__$Object_Object_$Impl_$.iterator = function(this1) {
	var _this;
	var this2 = this1;
	_this = Reflect.fields(this2).map(function(k) {
		return { 'name' : k, 'value' : Reflect.getProperty(this2,k)};
	});
	return HxOverrides.iter(_this);
};
tannus_ds__$Object_Object_$Impl_$.plus = function(this1,other) {
	var res = tannus_ds__$Object_Object_$Impl_$.clone(this1);
	var _g = 0;
	var _g1 = Reflect.fields(other);
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		if(!Object.prototype.hasOwnProperty.call(res,k)) {
			var value = Reflect.getProperty(other,k);
			Reflect.setProperty(res,k,value);
			Reflect.getProperty(res,k);
		}
	}
	return res;
};
tannus_ds__$Object_Object_$Impl_$.write = function(this1,o) {
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		var value = Reflect.getProperty(o,k);
		Reflect.setProperty(this1,k,value);
		Reflect.getProperty(this1,k);
	}
};
tannus_ds__$Object_Object_$Impl_$.method = function(this1,mname) {
	var func;
	{
		var this3 = Reflect.getProperty(this1,mname);
		if(this3 != null) func = this3; else func = this3;
	}
	var this2;
	this2 = (function(f,o,a1) {
		return function(a2) {
			return f(o,a1,a2);
		};
	})(Reflect.callMethod,this1,func);
	return this2;
};
tannus_ds__$Object_Object_$Impl_$.plucka = function(this1,keys) {
	return tannus_ds__$Object_Object_$Impl_$._plk(this1,keys);
};
tannus_ds__$Object_Object_$Impl_$._plk = function(this1,keys,mtarget) {
	var target;
	target = mtarget != null?mtarget:{ };
	var _g = 0;
	while(_g < keys.length) {
		var k = keys[_g];
		++_g;
		var value = Reflect.getProperty(this1,k);
		Reflect.setProperty(target,k,value);
		Reflect.getProperty(target,k);
	}
	return target;
};
tannus_ds__$Object_Object_$Impl_$["is"] = function(this1,oreg) {
	var sel = new tannus_nore_CSelector(oreg);
	return sel.test(this1);
};
tannus_ds__$Object_Object_$Impl_$.toMap = function(this1) {
	var m = new haxe_ds_StringMap();
	var $it0 = (function($this) {
		var $r;
		var _this;
		{
			var this2 = this1;
			_this = Reflect.fields(this2).map(function(k) {
				return { 'name' : k, 'value' : Reflect.getProperty(this2,k)};
			});
		}
		$r = HxOverrides.iter(_this);
		return $r;
	}(this));
	while( $it0.hasNext() ) {
		var p = $it0.next();
		var value = p.value;
		m.set(p.name,value);
	}
	return m;
};
tannus_ds__$Object_Object_$Impl_$.fromMap = function(map) {
	var o = { };
	var $it0 = map.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		var value;
		value = __map_reserved[key] != null?map.getReserved(key):map.h[key];
		Reflect.setProperty(o,key,value);
		Reflect.getProperty(o,key);
	}
	return o;
};
tannus_ds__$Object_Object_$Impl_$.toTannusDict = function(this1) {
	var d = new tannus_ds_CDict();
	var $it0 = (function($this) {
		var $r;
		var _this;
		{
			var this2 = this1;
			_this = Reflect.fields(this2).map(function(k) {
				return { 'name' : k, 'value' : Reflect.getProperty(this2,k)};
			});
		}
		$r = HxOverrides.iter(_this);
		return $r;
	}(this));
	while( $it0.hasNext() ) {
		var p = $it0.next();
		var v = p.value;
		d.setByKey(p.name,v);
	}
	return d;
};
var tannus_ds__$Pair_Pair_$Impl_$ = {};
$hxClasses["tannus.ds._Pair.Pair_Impl_"] = tannus_ds__$Pair_Pair_$Impl_$;
tannus_ds__$Pair_Pair_$Impl_$.__name__ = ["tannus","ds","_Pair","Pair_Impl_"];
tannus_ds__$Pair_Pair_$Impl_$._new = function(l,r) {
	return new tannus_ds_CPair(l,r);
};
tannus_ds__$Pair_Pair_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_ds__$Pair_Pair_$Impl_$.swap = function(this1) {
	return new tannus_ds_CPair(this1.right,this1.left);
};
tannus_ds__$Pair_Pair_$Impl_$.eq = function(this1,other) {
	return this1.left == other.left && this1.right == other.right;
};
var tannus_ds_CPair = function(l,r) {
	this.left = l;
	this.right = r;
};
$hxClasses["tannus.ds.CPair"] = tannus_ds_CPair;
tannus_ds_CPair.__name__ = ["tannus","ds","CPair"];
tannus_ds_CPair.prototype = {
	equals: function(other) {
		return this.left == other.left && this.right == other.right;
	}
	,toString: function() {
		return "Pair(" + Std.string(this.left) + ", " + Std.string(this.right) + ")";
	}
	,swap: function() {
		return new tannus_ds_CPair(this.right,this.left);
	}
	,__class__: tannus_ds_CPair
};
var tannus_ds_Promise = function(exec,nocall) {
	if(nocall == null) nocall = false;
	this.back = null;
	this.in_progress = false;
	this.executor = exec;
	this.fulfillment = new tannus_io_Signal();
	this.rejection = new tannus_io_Signal();
	this.derived = [];
	if(!nocall) this.make();
};
$hxClasses["tannus.ds.Promise"] = tannus_ds_Promise;
tannus_ds_Promise.__name__ = ["tannus","ds","Promise"];
tannus_ds_Promise.prototype = {
	fulfill: function(v) {
		this.in_progress = false;
		this.fulfillment.broadcast(v);
	}
	,reject: function(err) {
		this.in_progress = false;
		this.rejection.call(err);
	}
	,derive: function(der) {
		this.derived.push(der);
	}
	,then: function(callback) {
		this.fulfillment.listen(callback,false);
		return this;
	}
	,unless: function(callback) {
		this.rejection.listen(callback,false);
		return this;
	}
	,always: function(cb) {
		var called = false;
		this.then(function(x) {
			if(!called) {
				cb();
				called = true;
			}
		});
		this.unless(function(e) {
			if(!called) {
				cb();
				called = true;
			}
		});
	}
	,transform: function(change) {
		var _g = this;
		var res1 = new tannus_ds_Promise(function(res,err) {
			_g.then(function(val) {
				res(change(val));
			});
			_g.unless(function(error) {
				err(error);
			});
		});
		this.attach(res1);
		return res1;
	}
	,parent: function() {
		if(this.back != null) return this.back; else throw new js__$Boot_HaxeError("PromiseError: Cannot read field 'back' from the given Promise, as it has not yet been assigned");
	}
	,attach: function(child) {
		this.derive(child);
		child.back = this;
		return this;
	}
	,make: function(cb) {
		var _g = this;
		if(cb == null) cb = function() {
			null;
		};
		if(!this.in_progress) {
			this.in_progress = true;
			var stack = new tannus_ds_AsyncStack();
			var _g1 = 0;
			var _g11 = this.derived;
			while(_g1 < _g11.length) {
				var child = [_g11[_g1]];
				++_g1;
				stack.under((function(child) {
					return function(nxt) {
						child[0].make(nxt);
					};
				})(child));
			}
			stack.run(function() {
				var ff = function(x) {
					_g.fulfill(x);
					cb();
				};
				var rj = function(e) {
					_g.reject(e);
					cb();
				};
				_g.executor(ff,rj);
			});
		} else {
			var remake = (function(max_calls) {
				var run = 0;
				var rm = function() {
					if(run < max_calls) {
						_g.make();
						run++;
					}
				};
				return rm;
			})(1);
			this.fulfillment.listen(function(x1) {
				remake();
			},true);
			this.rejection.listen(function(x2) {
				remake();
			},true);
		}
	}
	,print: function() {
		this.then(function(x) {
			console.log(x);
		});
		return this;
	}
	,typeError: function(msg) {
		return "TypeError: " + msg;
	}
	,bool: function() {
		var _g = this;
		var res = new tannus_ds_promises_BoolPromise(function(yep,nope) {
			_g.then(function(data) {
				if(typeof(data) == "boolean") yep(data); else nope("TypeError: " + ("Cannot cast " + Std.string(data) + " to Boolean!"));
			});
			_g.unless(nope);
		});
		this.attach(res);
		return res;
	}
	,string: function() {
		var _g = this;
		var res = new tannus_ds_promises_StringPromise(function(accept,reject) {
			_g.then(function(data) {
				if(typeof(data) == "string") accept(Std.string(data) + ""); else reject("TypeError: " + ("Cannot cast " + Std.string(data) + " to String"));
			});
		});
		this.attach(res);
		return res;
	}
	,array: function() {
		var _g = this;
		var res = new tannus_ds_promises_ArrayPromise(function(yep,nope) {
			_g.then(function(data) {
				if((data instanceof Array) && data.__enum__ == null) try {
					var list;
					var _g1 = [];
					var _g2 = 0;
					var _g3;
					_g3 = js_Boot.__cast(data , Array);
					while(_g2 < _g3.length) {
						var x = _g3[_g2];
						++_g2;
						_g1.push(x);
					}
					list = _g1;
					yep(list);
				} catch( err ) {
					if (err instanceof js__$Boot_HaxeError) err = err.val;
					if( js_Boot.__instanceof(err,String) ) {
						nope(err);
					} else throw(err);
				} else nope("TypeError: " + ("Cannot cast " + Std.string(data) + " to Array!"));
			});
			_g.unless(nope);
		});
		this.attach(res);
		return res;
	}
	,object: function() {
		var _g = this;
		var res = new tannus_ds_promises_ObjectPromise(function(reply,reject) {
			_g.then(function(data) {
				var stype = tannus_internal_TypeTools.typename(data);
				if(!(typeof(data) == "boolean") && !(typeof(data) == "number") && !((data instanceof Array) && data.__enum__ == null) && !(typeof(data) == "string")) {
					var _g1 = Type["typeof"](data);
					switch(_g1[1]) {
					case 4:case 6:
						reply(data);
						break;
					default:
						reject("TypeError: " + ("Cannot cast " + stype + " to Object"));
					}
				} else reject("TypeError: " + ("Cannot cast " + stype + " to Object"));
			});
		});
		this.attach(res);
		return res;
	}
	,eq: function(other) {
		var _g = this;
		return new tannus_ds_promises_BoolPromise(function(done,fail) {
			_g.then(function(data) {
				{
					var _g1 = other;
					switch(_g1[1]) {
					case 0:
						var val = _g1[2];
						done(val == data);
						break;
					case 1:
						var prom = _g1[2];
						prom.then(function(val1) {
							done(val1 == data);
						});
						prom.unless(fail);
						break;
					}
				}
			});
			_g.unless(fail);
		});
	}
	,__class__: tannus_ds_Promise
};
var tannus_ds__$Stack_StackIterator = function(s) {
	this.stack = s;
};
$hxClasses["tannus.ds._Stack.StackIterator"] = tannus_ds__$Stack_StackIterator;
tannus_ds__$Stack_StackIterator.__name__ = ["tannus","ds","_Stack","StackIterator"];
tannus_ds__$Stack_StackIterator.prototype = {
	hasNext: function() {
		return !this.stack.get_empty();
	}
	,next: function() {
		return this.stack.pop();
	}
	,__class__: tannus_ds__$Stack_StackIterator
};
var tannus_ds_StringUtils = function() { };
$hxClasses["tannus.ds.StringUtils"] = tannus_ds_StringUtils;
tannus_ds_StringUtils.__name__ = ["tannus","ds","StringUtils"];
tannus_ds_StringUtils.byteAt = function(s,i) {
	if(i <= s.length - 1) {
		var n = HxOverrides.cca(s,i);
		var this1;
		if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
		this1 = n;
		return this1;
	} else throw new js__$Boot_HaxeError("IndexOutOfBoundError: " + i + " is not within range(0, " + (s.length - 1) + ")");
};
tannus_ds_StringUtils.strip = function(str,pat) {
	{
		var _g = pat;
		switch(_g[1]) {
		case 0:
			var repl = _g[2];
			return StringTools.replace(str,repl,"");
		case 1:
			var patt = _g[2];
			var res = str;
			var reg = patt;
			var bits = tannus_io__$RegEx_RegEx_$Impl_$.matches(reg,res);
			var _g1 = 0;
			while(_g1 < bits.length) {
				var bit = bits[_g1];
				++_g1;
				res = StringTools.replace(res,bit[0],"");
			}
			return res;
		}
	}
};
tannus_ds_StringUtils.remove = function(str,sub) {
	var i = str.indexOf(sub);
	if(i == -1) return str; else if(i == 0) return str.substring(i + sub.length); else return str.substring(0,i) + str.substring(i + 1);
};
tannus_ds_StringUtils.wrap = function(str,wrapper,end) {
	if(end == null) end = wrapper;
	return wrapper + str + end;
};
tannus_ds_StringUtils.capitalize = function(s) {
	return s.substring(0,1).toUpperCase() + s.substring(1).toLowerCase();
};
tannus_ds_StringUtils.has = function(str,sub) {
	return str.indexOf(sub) != -1;
};
tannus_ds_StringUtils.slice = function(str,pos,len) {
	if(len != null) return HxOverrides.substr(str,pos,len); else return str.substring(pos);
};
tannus_ds_StringUtils.before = function(s,del) {
	if(tannus_ds_StringUtils.has(s,del)) return s.substring(0,s.indexOf(del)); else return s;
};
tannus_ds_StringUtils.beforeLast = function(s,del) {
	if(tannus_ds_StringUtils.has(s,del)) return s.substring(0,s.lastIndexOf(del)); else return s;
};
tannus_ds_StringUtils.after = function(s,del) {
	if(tannus_ds_StringUtils.has(s,del)) return s.substring(s.indexOf(del) + 1); else return s;
};
tannus_ds_StringUtils.afterLast = function(s,del) {
	if(tannus_ds_StringUtils.has(s,del)) return s.substring(s.lastIndexOf(del) + 1); else return "";
};
tannus_ds_StringUtils.lastByte = function(s) {
	var n = HxOverrides.cca(s,s.length - 1);
	var this1;
	if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
	this1 = n;
	return this1;
};
tannus_ds_StringUtils.empty = function(s) {
	return s.length == 0;
};
tannus_ds_StringUtils.times = function(s,count) {
	if(count == 0) return ""; else {
		var res = s;
		var _g1 = 0;
		var _g = --count;
		while(_g1 < _g) {
			var i = _g1++;
			res += s;
		}
		return res;
	}
};
var tannus_ds__$TwoTuple_TwoTuple_$Impl_$ = {};
$hxClasses["tannus.ds._TwoTuple.TwoTuple_Impl_"] = tannus_ds__$TwoTuple_TwoTuple_$Impl_$;
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.__name__ = ["tannus","ds","_TwoTuple","TwoTuple_Impl_"];
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.__properties__ = {set_two:"set_two",get_two:"get_two",set_one:"set_one",get_one:"get_one"}
tannus_ds__$TwoTuple_TwoTuple_$Impl_$._new = function(a,b) {
	return [a,b];
};
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.get_one = function(this1) {
	return this1[0];
};
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.set_one = function(this1,v) {
	return this1[0] = v;
};
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.get_two = function(this1) {
	return this1[1];
};
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.set_two = function(this1,v) {
	return this1[1] = v;
};
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.toString = function(this1) {
	return "(" + Std.string(this1[0]) + ", " + Std.string(this1[1]) + ")";
};
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.toArray = function(this1) {
	return this1;
};
var tannus_ds_promises_ArrayPromise = function(f) {
	tannus_ds_Promise.call(this,f);
};
$hxClasses["tannus.ds.promises.ArrayPromise"] = tannus_ds_promises_ArrayPromise;
tannus_ds_promises_ArrayPromise.__name__ = ["tannus","ds","promises","ArrayPromise"];
tannus_ds_promises_ArrayPromise.fromPrim = function(pa) {
	return new tannus_ds_promises_ArrayPromise(function(res,err) {
		pa.then(res);
		pa.unless(err);
	});
};
tannus_ds_promises_ArrayPromise.__super__ = tannus_ds_Promise;
tannus_ds_promises_ArrayPromise.prototype = $extend(tannus_ds_Promise.prototype,{
	get: function(index) {
		var _g = this;
		var res = new tannus_ds_Promise(function(accept,reject) {
			_g.then(function(items) {
				accept(items[index]);
			});
			_g.unless(function(error) {
				reject(error);
			});
		},null);
		this.attach(res);
		return res;
	}
	,slice: function(pos,end) {
		var _g = this;
		return new tannus_ds_promises_ArrayPromise(function(res,err) {
			_g.then(function(list) {
				res(list.slice(pos,end));
			});
			_g.unless(function(error) {
				err(error);
			});
		});
	}
	,concat: function(other) {
		var _g = this;
		var res1 = new tannus_ds_promises_ArrayPromise(function(res,err) {
			_g.then(function(list) {
				res(list.concat(other));
			});
			_g.unless(function(error) {
				err(error);
			});
		});
		this.attach(res1);
		return res1;
	}
	,map: function(f) {
		var res = tannus_ds_promises_ArrayPromise.fromPrim(this.transform(function(x) {
			return x.map(f);
		}));
		this.attach(res);
		return res;
	}
	,filter: function(test) {
		var res = tannus_ds_promises_ArrayPromise.fromPrim(this.transform(function(list) {
			return list.filter(test);
		}));
		this.attach(res);
		return res;
	}
	,has: function(item) {
		var _g = this;
		var result = new tannus_ds_promises_BoolPromise(function(res,err) {
			_g.then(function(list) {
				res(Lambda.has(list,item));
			});
			_g.unless(err);
		});
		this.attach(result);
		return result;
	}
	,join: function(sep) {
		var _g = this;
		var result = new tannus_ds_promises_StringPromise(function(accept,reject) {
			_g.then(function(list) {
				accept(list.join(sep));
			});
			_g.unless(reject);
		});
		this.attach(result);
		return result;
	}
	,each: function(f) {
		this.then(function(list) {
			var _g = 0;
			while(_g < list.length) {
				var item = list[_g];
				++_g;
				f(item);
			}
		});
		return this;
	}
	,__class__: tannus_ds_promises_ArrayPromise
});
var tannus_ds_promises_BoolPromise = function(exec,nocall) {
	tannus_ds_Promise.call(this,exec,nocall);
};
$hxClasses["tannus.ds.promises.BoolPromise"] = tannus_ds_promises_BoolPromise;
tannus_ds_promises_BoolPromise.__name__ = ["tannus","ds","promises","BoolPromise"];
tannus_ds_promises_BoolPromise.__super__ = tannus_ds_Promise;
tannus_ds_promises_BoolPromise.prototype = $extend(tannus_ds_Promise.prototype,{
	yep: function(onyes) {
		this.then(function(v) {
			if(v) onyes();
		});
		return this;
	}
	,nope: function(onno) {
		this.then(function(v) {
			if(!v) onno();
		});
		return this;
	}
	,__class__: tannus_ds_promises_BoolPromise
});
var tannus_ds_promises_ObjectPromise = function(exec,nocall) {
	tannus_ds_Promise.call(this,exec,nocall);
};
$hxClasses["tannus.ds.promises.ObjectPromise"] = tannus_ds_promises_ObjectPromise;
tannus_ds_promises_ObjectPromise.__name__ = ["tannus","ds","promises","ObjectPromise"];
tannus_ds_promises_ObjectPromise.__super__ = tannus_ds_Promise;
tannus_ds_promises_ObjectPromise.prototype = $extend(tannus_ds_Promise.prototype,{
	exists: function(key) {
		var _g = this;
		var r = new tannus_ds_promises_BoolPromise(function(res,err) {
			_g.then(function(o) {
				res(Object.prototype.hasOwnProperty.call(o,key));
			});
			_g.unless(err);
		});
		this.attach(r);
		return r;
	}
	,keys: function() {
		var _g = this;
		var r = new tannus_ds_promises_ArrayPromise(function(a,e) {
			_g.then(function(o) {
				a(Reflect.fields(o));
			});
			_g.unless(e);
		});
		this.attach(r);
		return r;
	}
	,get: function(key) {
		var _g = this;
		var r = new tannus_ds_promises_ObjectPromise(function(accept,reject) {
			_g.then(function(o) {
				console.log(o);
				accept((function($this) {
					var $r;
					var this1 = Reflect.getProperty(o,key);
					$r = this1 != null?this1:this1;
					return $r;
				}(this)));
			});
			_g.unless(reject);
		});
		this.attach(r);
		return r;
	}
	,__class__: tannus_ds_promises_ObjectPromise
});
var tannus_ds_promises_StringPromise = function(exec,nocall) {
	tannus_ds_Promise.call(this,exec,nocall);
};
$hxClasses["tannus.ds.promises.StringPromise"] = tannus_ds_promises_StringPromise;
tannus_ds_promises_StringPromise.__name__ = ["tannus","ds","promises","StringPromise"];
tannus_ds_promises_StringPromise.__super__ = tannus_ds_Promise;
tannus_ds_promises_StringPromise.prototype = $extend(tannus_ds_Promise.prototype,{
	charAt: function(i) {
		var _g = this;
		var res = new tannus_ds_promises_StringPromise(function(accept,reject) {
			_g.then(function(s) {
				accept(s.charAt(i));
			});
			_g.unless(reject);
		});
		this.attach(res);
		return res;
	}
	,charCodeAt: function(i) {
		var res = this.charAt(i).transform(function(c) {
			return HxOverrides.cca(c,0);
		});
		this.attach(res);
		return res;
	}
	,split: function(delimiter) {
		var _g = this;
		var res = new tannus_ds_Promise(function(accept,reject) {
			_g.then(function(s) {
				accept(s.split(delimiter));
			});
			_g.unless(function(err) {
				reject(err);
			});
		},null).array();
		this.attach(res);
		return res;
	}
	,substr: function(pos,len) {
		var _g = this;
		var res = new tannus_ds_promises_StringPromise(function(accept,reject) {
			_g.then(function(data) {
				var sub = HxOverrides.substr(data,pos,len);
				accept(sub);
			});
			_g.unless(reject);
		});
		this.attach(res);
		return res;
	}
	,substring: function(start,end) {
		var _g = this;
		var res = new tannus_ds_promises_StringPromise(function(accept,reject) {
			_g.then(function(data) {
				var sub = data.substring(start,end);
				accept(sub);
			});
			_g.unless(reject);
		});
		this.attach(res);
		return res;
	}
	,toUpperCase: function() {
		var _g = this;
		var res = new tannus_ds_promises_StringPromise(function(accept,reject) {
			_g.then(function(s) {
				accept(s.toUpperCase());
			});
			_g.unless(reject);
		});
		this.attach(res);
		return res;
	}
	,toLowerCase: function() {
		var _g = this;
		var res = new tannus_ds_promises_StringPromise(function(accept,reject) {
			_g.then(function(s) {
				accept(s.toLowerCase());
			});
			_g.unless(reject);
		});
		this.attach(res);
		return res;
	}
	,capitalize: function() {
		var _g = this;
		var res = new tannus_ds_Promise(function(accept,reject) {
			_g.then(function(s) {
				var chars = s.split("");
				var first = chars.shift().toUpperCase();
				var rest = chars.join("").toLowerCase();
				accept(first + rest);
			});
			_g.unless(function(err) {
				reject(err);
			});
		},null).string();
		this.attach(res);
		return res;
	}
	,startsWith: function(start) {
		var _g = this;
		var res = new tannus_ds_promises_BoolPromise(function(reply,reject) {
			_g.then(function(data) {
				{
					var _g1 = start;
					switch(_g1[1]) {
					case 0:
						var str = _g1[2];
						reply(StringTools.startsWith(data,str));
						break;
					case 1:
						var _pstr = _g1[2];
						var pstr = _pstr.string();
						pstr.then(function(str1) {
							reply(StringTools.startsWith(data,str1));
						});
						break;
					}
				}
			});
			_g.unless(reject);
		});
		this.attach(res);
		return res;
	}
	,endsWith: function(end) {
		var _g = this;
		var res = new tannus_ds_promises_BoolPromise(function(reply,reject) {
			_g.then(function(data) {
				{
					var _g1 = end;
					switch(_g1[1]) {
					case 0:
						var str = _g1[2];
						reply(StringTools.endsWith(data,str));
						break;
					case 1:
						var _pstr = _g1[2];
						var pstr = _pstr.string();
						pstr.then(function(str1) {
							reply(StringTools.endsWith(data,str1));
						});
						break;
					}
				}
			});
			_g.unless(reject);
		});
		this.attach(res);
		return res;
	}
	,ltrim: function() {
		var lt = this.transform(function(s) {
			return StringTools.ltrim(s);
		}).string();
		this.attach(lt);
		return lt;
	}
	,rtrim: function() {
		var rt = this.transform(function(s) {
			return StringTools.rtrim(s);
		}).string();
		this.attach(rt);
		return rt;
	}
	,trim: function() {
		var trimmed = this.transform(function(s) {
			return StringTools.trim(s);
		}).string();
		this.attach(trimmed);
		return trimmed;
	}
	,match: function(pattern) {
		var res = this.transform(function(s) {
			return pattern.match(s);
		}).bool();
		this.attach(res);
		return res;
	}
	,__class__: tannus_ds_promises_StringPromise
});
var tannus_ds_tuples__$Tup2_Tup2_$Impl_$ = {};
$hxClasses["tannus.ds.tuples._Tup2.Tup2_Impl_"] = tannus_ds_tuples__$Tup2_Tup2_$Impl_$;
tannus_ds_tuples__$Tup2_Tup2_$Impl_$.__name__ = ["tannus","ds","tuples","_Tup2","Tup2_Impl_"];
tannus_ds_tuples__$Tup2_Tup2_$Impl_$.__properties__ = {set__1:"set__1",get__1:"get__1",set__0:"set__0",get__0:"get__0"}
tannus_ds_tuples__$Tup2_Tup2_$Impl_$._new = function(a,b) {
	return [a,b];
};
tannus_ds_tuples__$Tup2_Tup2_$Impl_$.get__0 = function(this1) {
	return this1[0];
};
tannus_ds_tuples__$Tup2_Tup2_$Impl_$.set__0 = function(this1,v) {
	return this1[0] = v;
};
tannus_ds_tuples__$Tup2_Tup2_$Impl_$.get__1 = function(this1) {
	return this1[1];
};
tannus_ds_tuples__$Tup2_Tup2_$Impl_$.set__1 = function(this1,v) {
	return this1[1] = v;
};
var tannus_internal_TypeTools = function() { };
$hxClasses["tannus.internal.TypeTools"] = tannus_internal_TypeTools;
tannus_internal_TypeTools.__name__ = ["tannus","internal","TypeTools"];
tannus_internal_TypeTools.typename = function(o) {
	var valtype = Type["typeof"](o);
	switch(valtype[1]) {
	case 3:
		return "Bool";
	case 2:case 1:
		return "Number";
	case 0:
		return "Null";
	case 5:
		return "Function";
	case 8:
		return "Unknown";
	case 6:
		var klass = valtype[2];
		try {
			var name = Type.getClassName(klass);
			return name;
		} catch( err ) {
			if (err instanceof js__$Boot_HaxeError) err = err.val;
			if( js_Boot.__instanceof(err,String) ) {
				return "Unknown";
			} else throw(err);
		}
		break;
	case 7:
		var enumer = valtype[2];
		var enumName = Type.getEnumName(enumer);
		var valueNames = Type.getEnumConstructs(enumer);
		var index = o[1];
		var results = "" + enumName + "." + valueNames[index];
		var args = o.slice(2);
		if(args.length == 0) return results; else {
			var reps;
			var _g = [];
			var _g1 = 0;
			while(_g1 < args.length) {
				var x = args[_g1];
				++_g1;
				_g.push(Std.string(x));
			}
			reps = _g;
			results += "(" + reps.join(", ") + ")";
			return results;
		}
		break;
	case 4:
		try {
			var name1 = Type.getClassName(o);
			if(name1 != null) return "Class<" + name1 + ">"; else throw new js__$Boot_HaxeError("failed!");
		} catch( err1 ) {
			if (err1 instanceof js__$Boot_HaxeError) err1 = err1.val;
			if( js_Boot.__instanceof(err1,String) ) {
				try {
					var name2 = Type.getEnumName(o);
					if(name2 != null) return "Enum<" + name2 + ">"; else throw new js__$Boot_HaxeError("failed!");
				} catch( err2 ) {
					if (err2 instanceof js__$Boot_HaxeError) err2 = err2.val;
					return "Unknown";
				}
			} else throw(err1);
		}
		break;
	}
};
tannus_internal_TypeTools.getClassHierarchy = function(klass) {
	var kl = klass;
	var hierarchy = [];
	var name = Type.getClassName(kl);
	hierarchy.push(name);
	while(true) try {
		kl = Type.getSuperClass(kl);
		name = Type.getClassName(kl);
		hierarchy.push(name);
	} catch( err ) {
		if (err instanceof js__$Boot_HaxeError) err = err.val;
		break;
	}
	return hierarchy;
};
tannus_internal_TypeTools.hierarchy = function(o) {
	if(Reflect.isObject(o)) {
		var klass = Type.getClass(o);
		if(klass != null) return tannus_internal_TypeTools.getClassHierarchy(klass);
	}
	return [];
};
var tannus_io_Asserts = function() { };
$hxClasses["tannus.io.Asserts"] = tannus_io_Asserts;
tannus_io_Asserts.__name__ = ["tannus","io","Asserts"];
var tannus_io_Binary = function(size,_b) {
	this._length = size;
	this.b = _b;
	this.position = 0;
};
$hxClasses["tannus.io.Binary"] = tannus_io_Binary;
tannus_io_Binary.__name__ = ["tannus","io","Binary"];
tannus_io_Binary.prototype = {
	get: function(index) {
		return 0;
	}
	,set: function(index,value) {
		return 0;
	}
	,getInt32: function(i) {
		return this.get(i) | this.get(i + 1) << 8 | this.get(i + 2) << 16 | this.get(i + 3) << 24;
	}
	,setInt32: function(i,v) {
		this.set(i,v);
		this.set(i + 1,v >> 8);
		this.set(i + 2,v >> 16);
		this.set(i + 3,v >> 24);
	}
	,getInt64: function(i) {
		var high = this.getInt32(i + 4);
		var low = this.getInt32(i);
		var x = new haxe__$Int64__$_$_$Int64(high,low);
		return x;
	}
	,setInt64: function(i,v) {
		this.setInt32(i,v.low);
		this.setInt32(i + 4,v.high);
	}
	,getDouble: function(i) {
		return tannus_math_TMath.i64ToDouble(this.getInt32(i),this.getInt32(i + 4));
	}
	,setDouble: function(i,v) {
		var _i = tannus_math_TMath.doubleToI64(v);
		this.setInt32(i,_i.low);
		this.setInt32(i + 4,_i.high);
	}
	,getFloat: function(i) {
		return tannus_math_TMath.i32ToFloat(this.getInt32(i));
	}
	,setFloat: function(i,v) {
		this.setInt32(i,tannus_math_TMath.floatToI32(v));
	}
	,fill: function(c,index,size) {
		if(index == null) index = 0;
		if(size == null) size = this._length;
		var _g = index;
		while(_g < size) {
			var i = _g++;
			this.set(i,c);
		}
	}
	,readByte: function() {
		return this.get(this.position++);
	}
	,readInt32: function() {
		var v = this.getInt32(this.position);
		this.position += 4;
		return v;
	}
	,writeInt32: function(i) {
		this.setInt32(this.position,i);
		this.position += 4;
	}
	,readFloat: function() {
		return tannus_math_TMath.i32ToFloat(this.readInt32());
	}
	,writeFloat: function(v) {
		this.writeInt32(tannus_math_TMath.floatToI32(v));
	}
	,writeByte: function(c) {
		this.set(this.position++,c);
	}
	,read: function(len) {
		var res = this.sub(this.position,len);
		this.position += len;
		return res;
	}
	,readString: function(len) {
		var res = this.getString(this.position,len);
		this.position += len;
		return res;
	}
	,write: function(other,len) {
		if(len == null) len = other._length;
		this.blit(this.position,other,0,len);
		this.position += len;
	}
	,writeString: function(s) {
		this.write((Reflect.getProperty(js_Boot.getClass(this),"ofString"))(s));
	}
	,push: function(c) {
		this.position = this._length;
		{
			this.resize(this._length + 1);
			this;
		}
		this.setData(this.b);
		this.set(this.position++,c);
		return this.position;
	}
	,unshift: function(c) {
		this.shiftRight(1);
		this.setData(this.b);
		this.set(0,c);
		return 0;
	}
	,pop: function() {
		var v = this.get(this._length - 1);
		this.position = 0;
		this.resize(this._length - 1);
		this.setData(this.b);
		return v;
	}
	,shift: function() {
		var v = this.get(0);
		this.setData(this.copy().slice(1).b);
		return v;
	}
	,append: function(footer,len) {
		if(len == null) len = footer._length;
		this.position = this._length;
		{
			this.resize(this._length + len);
			this;
		}
		this.write(footer);
		return this;
	}
	,appendString: function(foot,len) {
		return this.append((Reflect.getProperty(js_Boot.getClass(this),"ofString"))(foot),len);
	}
	,prepend: function(header,len) {
		if(len == null) len = header._length;
		this.shiftRight(header._length);
		this.position = 0;
		this.write(header);
		return this;
	}
	,prependString: function(head,len) {
		return this.prepend((Reflect.getProperty(js_Boot.getClass(this),"ofString"))(head),len);
	}
	,shiftRight: function(digits) {
		var lpad = this._alloc(digits);
		lpad.fill(0);
		lpad = lpad.concat(this);
		{
			this.resize(this._length + digits);
			this;
		}
		this.setData(lpad.b);
	}
	,shiftLeft: function(digits) {
		var rpad = this._alloc(digits);
		rpad.fill(0);
		var backward;
		var this1 = this.slice(digits);
		backward = this1.concat(rpad);
		{
			this.resize(this._length + digits);
			this;
		}
		this.setData(backward.b);
	}
	,sub: function(index,size) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,slice: function(min,max) {
		return this.sub(min,(max != null?max:this._length) - min);
	}
	,blit: function(index,src,srcIndex,size) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,resize: function(size) {
		this._length = size;
	}
	,reverse: function() {
		var _g1 = 0;
		var _g = this._length;
		while(_g1 < _g) {
			var i = _g1++;
			var ri = this._length - (i + 1);
			this.set(ri,this.get(ri));
		}
	}
	,grow: function(amount) {
		this.resize(this._length + amount);
		return this;
	}
	,concat: function(other) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,copy: function() {
		return this;
	}
	,iterator: function() {
		return new tannus_io_impl_BinaryIterator(this);
	}
	,getString: function(index,len) {
		return "";
	}
	,getData: function() {
		return this.b;
	}
	,seek: function(i) {
		return this.position = i;
	}
	,toString: function() {
		return this.getString(0,this._length);
	}
	,toBytes: function() {
		return haxe_io_Bytes.ofData(this.b);
	}
	,toHex: function() {
		var sb_b = "";
		var chars = "0123456789ABCDEF".split("").map(function(s) {
			return HxOverrides.cca(s,0);
		});
		var _g1 = 0;
		var _g = this._length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.get(i);
			sb_b += String.fromCharCode(chars[c >> 4]);
			sb_b += String.fromCharCode(chars[c & 15]);
		}
		return sb_b;
	}
	,base64Encode: function() {
		return haxe_crypto_Base64.encode(this.toBytes());
	}
	,toBase64: function() {
		return this.base64Encode();
	}
	,toDataUrl: function(type) {
		if(type == null) type = "text/plain";
		var encoded = this.base64Encode();
		return "data:" + type + ";base64," + encoded;
	}
	,toArray: function() {
		var _g = [];
		var $it0 = this.iterator();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			_g.push(c);
		}
		return _g;
	}
	,equals: function(other) {
		if(this._length != other._length) return false; else {
			var _g1 = 0;
			var _g = this._length;
			while(_g1 < _g) {
				var i = _g1++;
				if(this.get(i) != other.get(i)) return false;
			}
			return true;
		}
	}
	,setData: function(data) {
		this.b = data;
	}
	,_alloc: function(size) {
		var allocf = Reflect.getProperty(js_Boot.getClass(this),"alloc");
		return allocf(size);
	}
	,_ofString: function(s) {
		return (Reflect.getProperty(js_Boot.getClass(this),"ofString"))(s);
	}
	,get_length: function() {
		return this._length;
	}
	,get_empty: function() {
		return this._length <= 0;
	}
	,get_first: function() {
		return this.get(0);
	}
	,set_first: function(v) {
		return this.set(0,v);
	}
	,get_last: function() {
		return this.get(this._length - 1);
	}
	,set_last: function(v) {
		return this.set(this._length - 1,v);
	}
	,__class__: tannus_io_Binary
	,__properties__: {set_last:"set_last",get_last:"get_last",set_first:"set_first",get_first:"get_first",get_empty:"get_empty",get_length:"get_length"}
};
var tannus_io__$Byte_Byte_$Impl_$ = {};
$hxClasses["tannus.io._Byte.Byte_Impl_"] = tannus_io__$Byte_Byte_$Impl_$;
tannus_io__$Byte_Byte_$Impl_$.__name__ = ["tannus","io","_Byte","Byte_Impl_"];
tannus_io__$Byte_Byte_$Impl_$.__properties__ = {set_aschar:"set_aschar",get_aschar:"get_aschar",set_asint:"set_asint",get_asint:"get_asint",get_self:"get_self"}
tannus_io__$Byte_Byte_$Impl_$._new = function(n) {
	var this1;
	if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
	this1 = n;
	return this1;
};
tannus_io__$Byte_Byte_$Impl_$.get_self = function(this1) {
	return this1;
};
tannus_io__$Byte_Byte_$Impl_$.get_asint = function(this1) {
	return this1;
};
tannus_io__$Byte_Byte_$Impl_$.set_asint = function(this1,n) {
	if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
	return this1 = n;
};
tannus_io__$Byte_Byte_$Impl_$.get_aschar = function(this1) {
	return String.fromCharCode(this1);
};
tannus_io__$Byte_Byte_$Impl_$.set_aschar = function(this1,s) {
	var n = HxOverrides.cca(s,0);
	if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
	this1 = n;
	return String.fromCharCode(this1);
};
tannus_io__$Byte_Byte_$Impl_$.isNumeric = function(this1) {
	return this1 >= 48 && this1 <= 57;
};
tannus_io__$Byte_Byte_$Impl_$.isLetter = function(this1) {
	return this1 >= 65 && this1 <= 90 || this1 >= 97 && this1 <= 122;
};
tannus_io__$Byte_Byte_$Impl_$.isAlphaNumeric = function(this1) {
	return this1 >= 48 && this1 <= 57 || (this1 >= 65 && this1 <= 90 || this1 >= 97 && this1 <= 122);
};
tannus_io__$Byte_Byte_$Impl_$.isUppercase = function(this1) {
	return this1 >= 65 && this1 <= 90;
};
tannus_io__$Byte_Byte_$Impl_$.isLowercase = function(this1) {
	return this1 >= 97 && this1 <= 122;
};
tannus_io__$Byte_Byte_$Impl_$.isWhiteSpace = function(this1) {
	return Lambda.has([9,10,11,12,13,32],this1);
};
tannus_io__$Byte_Byte_$Impl_$.isLineBreaking = function(this1) {
	return this1 == 10 || this1 == 13;
};
tannus_io__$Byte_Byte_$Impl_$.isPunctuation = function(this1) {
	return Lambda.has([33,44,45,46,58,59,53],this1);
};
tannus_io__$Byte_Byte_$Impl_$.equalsi = function(this1,other) {
	return this1 == other;
};
tannus_io__$Byte_Byte_$Impl_$.equalss = function(this1,other) {
	return this1 == HxOverrides.cca(other,0);
};
tannus_io__$Byte_Byte_$Impl_$.repeat = function(this1,times) {
	return tannus_ds_StringUtils.times(String.fromCharCode(this1),times);
};
tannus_io__$Byte_Byte_$Impl_$.toString = function(this1) {
	return String.fromCharCode(this1);
};
tannus_io__$Byte_Byte_$Impl_$.toInt = function(this1) {
	return this1;
};
tannus_io__$Byte_Byte_$Impl_$.fromString = function(s) {
	var n = HxOverrides.cca(s,0);
	var this1;
	if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
	this1 = n;
	return this1;
};
tannus_io__$Byte_Byte_$Impl_$.isValid = function(n) {
	return ((n | 0) === n) && isFinite(n) && !isNaN(n);
};
tannus_io__$Byte_Byte_$Impl_$.assertValid = function(n) {
	if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
};
var tannus_io__$ByteArray_ByteArray_$Impl_$ = {};
$hxClasses["tannus.io._ByteArray.ByteArray_Impl_"] = tannus_io__$ByteArray_ByteArray_$Impl_$;
tannus_io__$ByteArray_ByteArray_$Impl_$.__name__ = ["tannus","io","_ByteArray","ByteArray_Impl_"];
tannus_io__$ByteArray_ByteArray_$Impl_$._new = function(size) {
	if(size == null) size = 0;
	var this1;
	this1 = tannus_io_impl_JavaScriptBinary.alloc(size);
	return this1;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.get = function(this1,i) {
	return this1.get(i);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.set = function(this1,i,v) {
	return this1.set(i,v);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toBytes = function(this1) {
	return this1.toBytes();
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toBase = function(this1) {
	return this1.b;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toArray = function(this1) {
	return this1.toArray();
};
tannus_io__$ByteArray_ByteArray_$Impl_$.expand = function(this1,other) {
	return this1.append(other);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.concat = function(this1,other) {
	return this1.concat(other);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.equals = function(this1,o) {
	return this1.equals(o);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.alloc = function(size) {
	var size1 = tannus_io_impl_JavaScriptBinary.alloc(size);
	var this1;
	this1 = tannus_io_impl_JavaScriptBinary.alloc(size1);
	return this1;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.ofData = function(d) {
	return tannus_io_impl_JavaScriptBinary.ofData(d);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.ofString = function(s) {
	return tannus_io_impl_JavaScriptBinary.ofString(s);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.fromBytes = function(b) {
	return tannus_io_impl_JavaScriptBinary.fromBytes(b);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.fromBase64 = function(s) {
	return tannus_io_impl_JavaScriptBinary.fromBase64(s);
};
var tannus_io_ByteStack = function(data) {
	tannus_ds_Stack.call(this,[]);
	this.b = data;
	this.i = 0;
};
$hxClasses["tannus.io.ByteStack"] = tannus_io_ByteStack;
tannus_io_ByteStack.__name__ = ["tannus","io","ByteStack"];
tannus_io_ByteStack.__super__ = tannus_ds_Stack;
tannus_io_ByteStack.prototype = $extend(tannus_ds_Stack.prototype,{
	read: function(dis) {
		var data;
		var this1;
		this1 = tannus_io_impl_JavaScriptBinary.alloc(dis);
		data = this1;
		var _g = 0;
		while(_g < dis) {
			var i = _g++;
			data.writeByte(this.pop());
		}
		return data;
	}
	,readUntil: function(delimiter) {
		var res;
		var this1;
		this1 = tannus_io_impl_JavaScriptBinary.alloc(0);
		res = this1;
		while(this.peek() != delimiter) res.push(this.pop());
		return res;
	}
	,peekAhead: function(dis) {
		var data;
		var this1;
		this1 = tannus_io_impl_JavaScriptBinary.alloc(dis);
		data = this1;
		var _g1 = 1;
		var _g = dis + 1;
		while(_g1 < _g) {
			var i = _g1++;
			data.writeByte(this.peek(i));
		}
		return data;
	}
	,copy: function() {
		return new tannus_io_ByteStack(this.b);
	}
	,peek: function(dis) {
		if(dis == null) dis = 0;
		return this.b.get(this.i + dis);
	}
	,pop: function() {
		var i = this.i++;
		return this.b.get(i);
	}
	,get_empty: function() {
		return this.i >= this.b._length;
	}
	,__class__: tannus_io_ByteStack
});
var tannus_io__$Getter_Getter_$Impl_$ = {};
$hxClasses["tannus.io._Getter.Getter_Impl_"] = tannus_io__$Getter_Getter_$Impl_$;
tannus_io__$Getter_Getter_$Impl_$.__name__ = ["tannus","io","_Getter","Getter_Impl_"];
tannus_io__$Getter_Getter_$Impl_$.__properties__ = {get_v:"get_v"}
tannus_io__$Getter_Getter_$Impl_$._new = function(f) {
	return f;
};
tannus_io__$Getter_Getter_$Impl_$.get_v = function(this1) {
	return this1();
};
tannus_io__$Getter_Getter_$Impl_$.get = function(this1) {
	return this1();
};
tannus_io__$Getter_Getter_$Impl_$.transform = function(this1,f) {
	return function() {
		return f(this1());
	};
};
var tannus_io__$Pointer_Pointer_$Impl_$ = {};
$hxClasses["tannus.io._Pointer.Pointer_Impl_"] = tannus_io__$Pointer_Pointer_$Impl_$;
tannus_io__$Pointer_Pointer_$Impl_$.__name__ = ["tannus","io","_Pointer","Pointer_Impl_"];
tannus_io__$Pointer_Pointer_$Impl_$.__properties__ = {set_deleter:"set_deleter",get_deleter:"get_deleter",get_set:"get_set",get_get:"get_get",get_exists:"get_exists",set__:"set__",get__:"get__",set_setter:"set_setter",get_setter:"get_setter",set_getter:"set_getter",get_getter:"get_getter",set_v:"set_v",get_v:"get_v",set_value:"set_value",get_value:"get_value",get_self:"get_self"}
tannus_io__$Pointer_Pointer_$Impl_$._new = function(g,s,d) {
	return new tannus_io__$Pointer_Ref(g,s);
};
tannus_io__$Pointer_Pointer_$Impl_$.get_self = function(this1) {
	return this1;
};
tannus_io__$Pointer_Pointer_$Impl_$.get_value = function(this1) {
	return this1.get();
};
tannus_io__$Pointer_Pointer_$Impl_$.set_value = function(this1,nv) {
	return this1.set(nv);
};
tannus_io__$Pointer_Pointer_$Impl_$.get_v = function(this1) {
	return this1.get();
};
tannus_io__$Pointer_Pointer_$Impl_$.set_v = function(this1,nv) {
	return this1.set(nv);
};
tannus_io__$Pointer_Pointer_$Impl_$.get_getter = function(this1) {
	return this1.getter;
};
tannus_io__$Pointer_Pointer_$Impl_$.set_getter = function(this1,ng) {
	return this1.getter = ng;
};
tannus_io__$Pointer_Pointer_$Impl_$.get_setter = function(this1) {
	return this1.setter;
};
tannus_io__$Pointer_Pointer_$Impl_$.set_setter = function(this1,ns) {
	return this1.setter = ns;
};
tannus_io__$Pointer_Pointer_$Impl_$.get__ = function(this1) {
	return this1.get();
};
tannus_io__$Pointer_Pointer_$Impl_$.set__ = function(this1,v) {
	return this1.set(v);
};
tannus_io__$Pointer_Pointer_$Impl_$.get_exists = function(this1) {
	return this1.get() != null;
};
tannus_io__$Pointer_Pointer_$Impl_$.get_get = function(this1) {
	return $bind(this1,this1.get);
};
tannus_io__$Pointer_Pointer_$Impl_$.get_set = function(this1) {
	return $bind(this1,this1.set);
};
tannus_io__$Pointer_Pointer_$Impl_$.get_deleter = function(this1) {
	return this1.deleter;
};
tannus_io__$Pointer_Pointer_$Impl_$.set_deleter = function(this1,nd) {
	return this1.deleter = nd;
};
tannus_io__$Pointer_Pointer_$Impl_$["delete"] = function(this1) {
	this1["delete"]();
};
tannus_io__$Pointer_Pointer_$Impl_$.to_underlying = function(this1) {
	return this1.get();
};
tannus_io__$Pointer_Pointer_$Impl_$.setvalue = function(this1,v) {
	return this1.set(v);
};
tannus_io__$Pointer_Pointer_$Impl_$.setPointer = function(this1,v) {
	return this1.set(v.get());
};
tannus_io__$Pointer_Pointer_$Impl_$.access = function(this1,v) {
	if(v != null) return this1.set(v); else return this1.get();
};
tannus_io__$Pointer_Pointer_$Impl_$.attach_str = function(this1,str) {
	var s = this1.setter;
	this1.setter = tannus_io__$Setter_Setter_$Impl_$.attach(s,str);
};
tannus_io__$Pointer_Pointer_$Impl_$._transform = function(this1,mget,mset) {
	var g = tannus_io__$Getter_Getter_$Impl_$.transform(this1.getter,mget);
	var s = tannus_io__$Setter_Setter_$Impl_$.transform(this1.setter,mset);
	return new tannus_io__$Pointer_Ref(g,s);
};
tannus_io__$Pointer_Pointer_$Impl_$.clone = function(this1) {
	return new tannus_io__$Pointer_Ref(this1.getter,this1.setter);
};
tannus_io__$Pointer_Pointer_$Impl_$.toGetter = function(this1) {
	return this1.getter;
};
tannus_io__$Pointer_Pointer_$Impl_$.toSetter = function(this1) {
	return this1.setter;
};
tannus_io__$Pointer_Pointer_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_io__$Pointer_Pointer_$Impl_$.iterator = function(self) {
	return $iterator(self.get())();
};
tannus_io__$Pointer_Pointer_$Impl_$.fromAccessor = function(af) {
	var g = (function(f,a1) {
		return function() {
			return f(a1);
		};
	})(af,null);
	var s = (function(f1) {
		return function(a11) {
			return f1(a11);
		};
	})(af);
	return new tannus_io__$Pointer_Ref(g,s);
};
var tannus_io__$Pointer_Ref = function(g,s,d) {
	this.getter = g;
	this.setter = s;
	this.deleter = d;
};
$hxClasses["tannus.io._Pointer.Ref"] = tannus_io__$Pointer_Ref;
tannus_io__$Pointer_Ref.__name__ = ["tannus","io","_Pointer","Ref"];
tannus_io__$Pointer_Ref.prototype = {
	get: function() {
		return this.getter();
	}
	,set: function(v) {
		return this.setter(v);
	}
	,'delete': function() {
		if(this.deleter != null) this.deleter();
	}
	,toString: function() {
		return Std.string(this.get());
	}
	,__class__: tannus_io__$Pointer_Ref
};
var tannus_io__$RegEx_RegEx_$Impl_$ = {};
$hxClasses["tannus.io._RegEx.RegEx_Impl_"] = tannus_io__$RegEx_RegEx_$Impl_$;
tannus_io__$RegEx_RegEx_$Impl_$.__name__ = ["tannus","io","_RegEx","RegEx_Impl_"];
tannus_io__$RegEx_RegEx_$Impl_$._new = function(pattern) {
	return pattern;
};
tannus_io__$RegEx_RegEx_$Impl_$.matches = function(this1,text) {
	var ma = [];
	this1.map(text,function(e) {
		var parts = [];
		var i = 0;
		var matched = true;
		while(matched) try {
			parts.push(e.matched(i));
			i++;
		} catch( err ) {
			if (err instanceof js__$Boot_HaxeError) err = err.val;
			matched = false;
			break;
		}
		ma.push(parts);
		return "";
	});
	return ma;
};
tannus_io__$RegEx_RegEx_$Impl_$.search = function(this1,s) {
	return tannus_io__$RegEx_RegEx_$Impl_$.matches(this1,s);
};
tannus_io__$RegEx_RegEx_$Impl_$.extract = function(this1,str,n) {
	if(n == null) n = 0;
	return tannus_io__$RegEx_RegEx_$Impl_$.matches(this1,str)[n];
};
tannus_io__$RegEx_RegEx_$Impl_$.extractGroups = function(this1,str,n) {
	if(n == null) n = 0;
	return tannus_io__$RegEx_RegEx_$Impl_$.matches(this1,str)[0].slice(1);
};
tannus_io__$RegEx_RegEx_$Impl_$.findAll = function(this1,s) {
	var all = [];
	this1.map(s,function(e) {
		var pos = e.matchedPos();
		all.push({ 'str' : s, 'pos' : e.matchedPos()});
		return s;
	});
	return all;
};
tannus_io__$RegEx_RegEx_$Impl_$.replace = function(this1,rtext,text) {
	return this1.map(rtext,function(e) {
		var i = 0;
		var whole = null;
		var subs = [];
		while(true) try {
			var s = this1.matched(i++);
			if(whole == null) whole = s; else subs.push(s);
		} catch( err ) {
			if (err instanceof js__$Boot_HaxeError) err = err.val;
			break;
		}
		var _t = text;
		var _g1 = 0;
		var _g = subs.length;
		while(_g1 < _g) {
			var ii = _g1++;
			_t = StringTools.replace(_t,"{{" + ii + "}}",subs[ii]);
		}
		return _t;
	});
};
tannus_io__$RegEx_RegEx_$Impl_$.toTester = function(this1) {
	return (function(f) {
		return function(s) {
			return f(s);
		};
	})($bind(this1,this1.match));
};
var tannus_io__$Setter_Setter_$Impl_$ = {};
$hxClasses["tannus.io._Setter.Setter_Impl_"] = tannus_io__$Setter_Setter_$Impl_$;
tannus_io__$Setter_Setter_$Impl_$.__name__ = ["tannus","io","_Setter","Setter_Impl_"];
tannus_io__$Setter_Setter_$Impl_$.__properties__ = {set_v:"set_v"}
tannus_io__$Setter_Setter_$Impl_$._new = function(f) {
	return f;
};
tannus_io__$Setter_Setter_$Impl_$.set_v = function(this1,nv) {
	return this1(nv);
};
tannus_io__$Setter_Setter_$Impl_$.wrap = function(this1,f) {
	var self = this1;
	this1 = function(v) {
		return f(self,v);
	};
};
tannus_io__$Setter_Setter_$Impl_$.attach = function(this1,other) {
	var f = function(s,val) {
		other(val);
		return s(val);
	};
	var self = this1;
	this1 = function(v) {
		return f(self,v);
	};
	return this1;
};
tannus_io__$Setter_Setter_$Impl_$.transform = function(this1,f) {
	return function(o) {
		var v = f(o);
		this1(v);
		return o;
	};
};
tannus_io__$Setter_Setter_$Impl_$.set = function(this1,v) {
	return this1(v);
};
var tannus_io_Signal = function() {
	this.handlers = [];
	this.ondelete = function() {
		null;
	};
};
$hxClasses["tannus.io.Signal"] = tannus_io_Signal;
tannus_io_Signal.__name__ = ["tannus","io","Signal"];
tannus_io_Signal.prototype = {
	add: function(handler) {
		this.handlers.push(handler);
	}
	,listen: function(f,once) {
		if(once == null) once = false;
		if(!once) this.add(tannus_io__$Signal_Handler.Normal(f)); else {
			var _fired = false;
			var fired = new tannus_io__$Pointer_Ref(function() {
				return _fired;
			},function(v) {
				return _fired = v;
			});
			this.add(tannus_io__$Signal_Handler.Once(f,fired));
		}
	}
	,on: function(f,once) {
		if(once == null) once = false;
		this.listen(f,once);
	}
	,once: function(f) {
		this.listen(f,true);
	}
	,when: function(test,f) {
		this.add(tannus_io__$Signal_Handler.Tested(f,test));
	}
	,times: function(count,f) {
		var _fired = 0;
		var fired = new tannus_io__$Pointer_Ref(function() {
			return _fired;
		},function(v) {
			return _fired = v;
		});
		this.add(tannus_io__$Signal_Handler.Counted(f,count,fired));
	}
	,every: function(wait,f) {
		var _rem = 0;
		var rem = new tannus_io__$Pointer_Ref(function() {
			return _rem;
		},function(v) {
			return _rem = v;
		});
		this.add(tannus_io__$Signal_Handler.Every(f,wait,rem));
	}
	,ignore: function(func) {
		this.handlers = this.handlers.filter(function(h) {
			switch(h[1]) {
			case 0:
				var f = h[2];
				return !Reflect.compareMethods(f,func);
			case 3:
				var f1 = h[2];
				return !Reflect.compareMethods(f1,func);
			case 4:
				var f2 = h[2];
				return !Reflect.compareMethods(f2,func);
			case 1:
				var f3 = h[2];
				return !Reflect.compareMethods(f3,func);
			case 2:
				var f4 = h[2];
				return !Reflect.compareMethods(f4,func);
			}
		});
	}
	,off: function(f) {
		this.ignore(f);
	}
	,clear: function() {
		this.handlers = [];
	}
	,callHandler: function(h,arg) {
		switch(h[1]) {
		case 0:
			var f = h[2];
			f(arg);
			break;
		case 3:
			var fired = h[3];
			var f1 = h[2];
			if(!fired.get()) {
				f1(arg);
				fired.set(true);
			}
			break;
		case 4:
			var test = h[3];
			var f2 = h[2];
			if(test(arg)) f2(arg);
			break;
		case 1:
			var called = h[4];
			var count = h[3];
			var f3 = h[2];
			if(called.get() <= count) {
				f3(arg);
				var v = called.get() + 1;
				called.set(v);
			}
			break;
		case 2:
			var rem = h[4];
			var wait = h[3];
			var f4 = h[2];
			if(rem.get() == wait) {
				f4(arg);
				rem.set(0);
			} else {
				var nv = rem.get() + 1;
				rem.set(nv);
			}
			break;
		}
	}
	,broadcast: function(data) {
		var _g = 0;
		var _g1 = this.handlers;
		while(_g < _g1.length) {
			var h = _g1[_g];
			++_g;
			this.callHandler(h,data);
		}
	}
	,call: function(data) {
		this.broadcast(data);
	}
	,__class__: tannus_io_Signal
};
var tannus_io__$Signal_Handler = { __ename__ : ["tannus","io","_Signal","Handler"], __constructs__ : ["Normal","Counted","Every","Once","Tested"] };
tannus_io__$Signal_Handler.Normal = function(func) { var $x = ["Normal",0,func]; $x.__enum__ = tannus_io__$Signal_Handler; $x.toString = $estr; return $x; };
tannus_io__$Signal_Handler.Counted = function(func,count,fired) { var $x = ["Counted",1,func,count,fired]; $x.__enum__ = tannus_io__$Signal_Handler; $x.toString = $estr; return $x; };
tannus_io__$Signal_Handler.Every = function(func,wait,remaining) { var $x = ["Every",2,func,wait,remaining]; $x.__enum__ = tannus_io__$Signal_Handler; $x.toString = $estr; return $x; };
tannus_io__$Signal_Handler.Once = function(func,fired) { var $x = ["Once",3,func,fired]; $x.__enum__ = tannus_io__$Signal_Handler; $x.toString = $estr; return $x; };
tannus_io__$Signal_Handler.Tested = function(func,test) { var $x = ["Tested",4,func,test]; $x.__enum__ = tannus_io__$Signal_Handler; $x.toString = $estr; return $x; };
var tannus_io_VoidSignal = function() {
	this.handlers = [];
	this.ondelete = function() {
		null;
	};
	this._remove = [];
};
$hxClasses["tannus.io.VoidSignal"] = tannus_io_VoidSignal;
tannus_io_VoidSignal.__name__ = ["tannus","io","VoidSignal"];
tannus_io_VoidSignal.prototype = {
	add: function(h) {
		this.handlers.push(h);
	}
	,on: function(f) {
		this.add(tannus_io__$VoidSignal_Handler.Normal(f));
	}
	,once: function(f) {
		this.add(tannus_io__$VoidSignal_Handler.Once(f,(function() {
			var _v = false;
			return new tannus_io__$Pointer_Ref(function() {
				return _v;
			},function(v) {
				return _v = v;
			});
		})()));
	}
	,times: function(count,f) {
		this.add(tannus_io__$VoidSignal_Handler.Counted(f,count,(function() {
			var _v = 0;
			return new tannus_io__$Pointer_Ref(function() {
				return _v;
			},function(v) {
				return _v = v;
			});
		})()));
	}
	,every: function(interval,f) {
		this.add(tannus_io__$VoidSignal_Handler.Every(f,interval,(function() {
			var _v = interval;
			return new tannus_io__$Pointer_Ref(function() {
				return _v;
			},function(v) {
				return _v = v;
			});
		})()));
	}
	,ignore: function(func) {
		var ignores = [];
		var _g = 0;
		var _g1 = this.handlers;
		while(_g < _g1.length) {
			var h = _g1[_g];
			++_g;
			switch(h[1]) {
			case 0:
				var f = h[2];
				if(Reflect.compareMethods(f,func)) ignores.push(h);
				break;
			case 3:
				var f1 = h[2];
				if(Reflect.compareMethods(f1,func)) ignores.push(h);
				break;
			case 1:
				var f2 = h[2];
				if(Reflect.compareMethods(f2,func)) ignores.push(h);
				break;
			case 2:
				var f3 = h[2];
				if(Reflect.compareMethods(f3,func)) ignores.push(h);
				break;
			}
		}
		var _g2 = 0;
		while(_g2 < ignores.length) {
			var h1 = ignores[_g2];
			++_g2;
			HxOverrides.remove(this.handlers,h1);
		}
	}
	,off: function(f) {
		this.ignore(f);
	}
	,clear: function() {
		this.handlers = [];
	}
	,callHandler: function(h) {
		switch(h[1]) {
		case 0:
			var f = h[2];
			f();
			break;
		case 3:
			var fired = h[3];
			var f1 = h[2];
			if(!fired.get()) {
				f1();
				this._remove.push(h);
			}
			break;
		case 1:
			var fired1 = h[4];
			var count = h[3];
			var f2 = h[2];
			if(fired1.get() < count) {
				f2();
				var nv = fired1.get() + 1;
				fired1.set(nv);
			} else this._remove.push(h);
			break;
		case 2:
			var rem = h[4];
			var wait = h[3];
			var f3 = h[2];
			if(rem.get() == wait) {
				f3();
				rem.set(0);
			} else {
				var nv1 = rem.get() + 1;
				rem.set(nv1);
			}
			break;
		}
	}
	,call: function() {
		var _g = 0;
		var _g1 = this.handlers;
		while(_g < _g1.length) {
			var h = _g1[_g];
			++_g;
			this.callHandler(h);
		}
		var _g2 = 0;
		var _g11 = this._remove;
		while(_g2 < _g11.length) {
			var h1 = _g11[_g2];
			++_g2;
			HxOverrides.remove(this.handlers,h1);
		}
		this._remove = [];
	}
	,fire: function() {
		this.call();
	}
	,__class__: tannus_io_VoidSignal
};
var tannus_io__$VoidSignal_Handler = { __ename__ : ["tannus","io","_VoidSignal","Handler"], __constructs__ : ["Normal","Counted","Every","Once"] };
tannus_io__$VoidSignal_Handler.Normal = function(func) { var $x = ["Normal",0,func]; $x.__enum__ = tannus_io__$VoidSignal_Handler; $x.toString = $estr; return $x; };
tannus_io__$VoidSignal_Handler.Counted = function(func,count,fired) { var $x = ["Counted",1,func,count,fired]; $x.__enum__ = tannus_io__$VoidSignal_Handler; $x.toString = $estr; return $x; };
tannus_io__$VoidSignal_Handler.Every = function(func,wait,remaining) { var $x = ["Every",2,func,wait,remaining]; $x.__enum__ = tannus_io__$VoidSignal_Handler; $x.toString = $estr; return $x; };
tannus_io__$VoidSignal_Handler.Once = function(func,fired) { var $x = ["Once",3,func,fired]; $x.__enum__ = tannus_io__$VoidSignal_Handler; $x.toString = $estr; return $x; };
var tannus_io_impl_BinaryIterator = function(b) {
	this.bin = b;
	this.index = 0;
};
$hxClasses["tannus.io.impl.BinaryIterator"] = tannus_io_impl_BinaryIterator;
tannus_io_impl_BinaryIterator.__name__ = ["tannus","io","impl","BinaryIterator"];
tannus_io_impl_BinaryIterator.prototype = {
	hasNext: function() {
		return this.index <= this.bin._length - 1;
	}
	,next: function() {
		var c = this.bin.get(this.index);
		this.index++;
		return c;
	}
	,__class__: tannus_io_impl_BinaryIterator
};
var tannus_io_impl_JavaScriptBinary = $hx_exports.Binary = function(size,data,arr) {
	tannus_io_Binary.call(this,size,data);
	if(arr != null) this.array = arr; else this.array = new Uint8Array(data);
};
$hxClasses["tannus.io.impl.JavaScriptBinary"] = tannus_io_impl_JavaScriptBinary;
tannus_io_impl_JavaScriptBinary.__name__ = ["tannus","io","impl","JavaScriptBinary"];
tannus_io_impl_JavaScriptBinary.alloc = function(size) {
	var list = new Uint8Array(size);
	var data = list.buffer;
	return new tannus_io_impl_JavaScriptBinary(size,data,list);
};
tannus_io_impl_JavaScriptBinary.ofData = function(d) {
	var copy = (js_Boot.__cast(d , ArrayBuffer)).slice(0);
	return new tannus_io_impl_JavaScriptBinary(d.byteLength,copy);
};
tannus_io_impl_JavaScriptBinary.ofString = function(s) {
	if(s == "") throw new js__$Boot_HaxeError("Error: Dealing with empty Strings is too much bullshit");
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	var tarr = new Uint8Array(a);
	return new tannus_io_impl_JavaScriptBinary(a.length,tarr.buffer);
};
tannus_io_impl_JavaScriptBinary.fromBuffer = function(b) {
	var jsb = tannus_io_impl_JavaScriptBinary.alloc(b.length);
	var _g1 = 0;
	var _g = b.length;
	while(_g1 < _g) {
		var i = _g1++;
		jsb.set(i,b[i]);
	}
	return jsb;
};
tannus_io_impl_JavaScriptBinary.fromBytes = function(b) {
	return tannus_io_impl_JavaScriptBinary.ofData(b.b.buffer);
};
tannus_io_impl_JavaScriptBinary.list = function(uia) {
	return Array.prototype.slice.call(uia,0);
};
tannus_io_impl_JavaScriptBinary.fromBase64 = function(s) {
	return tannus_io_impl_JavaScriptBinary.fromBytes(haxe_crypto_Base64.decode(s));
};
tannus_io_impl_JavaScriptBinary.__super__ = tannus_io_Binary;
tannus_io_impl_JavaScriptBinary.prototype = $extend(tannus_io_Binary.prototype,{
	get: function(i) {
		tannus_io_Binary.prototype.get.call(this,i);
		return this.array[i];
	}
	,set: function(i,v) {
		tannus_io_Binary.prototype.set.call(this,i,v);
		return this.array[i] = v;
	}
	,sub: function(index,size) {
		return new tannus_io_impl_JavaScriptBinary(size,this.b.slice(index,index + size));
	}
	,slice: function(start,end) {
		if(end == null) end = this._length;
		return new tannus_io_impl_JavaScriptBinary(end - start,this.b.slice(start,end));
	}
	,blit: function(index,src,srcIndex,size) {
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			this.set(index + i,src.get(srcIndex + i));
		}
	}
	,getString: function(index,size) {
		var result = "";
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			var this1 = this.get(index + i);
			result += String.fromCharCode(this1);
		}
		return result;
	}
	,resize: function(size) {
		if(size < this._length) this.setData(this.b = this.b.slice(0,size)); else {
			var bigger = tannus_io_impl_JavaScriptBinary.alloc(size);
			bigger.blit(0,this,0,this._length);
			this.setData(bigger.b);
		}
	}
	,concat: function(other) {
		var lensum = this._length + other._length;
		var sum = new tannus_io_impl_JavaScriptBinary(lensum,new ArrayBuffer(lensum));
		sum.blit(0,this,0,this._length);
		sum.blit(this._length,other,0,other._length);
		return sum;
	}
	,setData: function(d) {
		this.b = d;
		this.array = new Uint8Array(this.b);
		this._length = this.array.length;
	}
	,toBuffer: function() {
		return new Buffer(this.array);
	}
	,__class__: tannus_io_impl_JavaScriptBinary
});
var tannus_macro_MacroTools = function() { };
$hxClasses["tannus.macro.MacroTools"] = tannus_macro_MacroTools;
tannus_macro_MacroTools.__name__ = ["tannus","macro","MacroTools"];
var tannus_math_TMath = function() { };
$hxClasses["tannus.math.TMath"] = tannus_math_TMath;
tannus_math_TMath.__name__ = ["tannus","math","TMath"];
tannus_math_TMath.sum_Float = function(list) {
	var res = null;
	var _g = 0;
	while(_g < list.length) {
		var item = list[_g];
		++_g;
		if(!(res != null)) res = item; else res = (res != null?res:res) + item;
	}
	return res != null?res:res;
};
tannus_math_TMath.toRadians = function(degrees) {
	return degrees * 3.141592653589793 / 180;
};
tannus_math_TMath.toDegrees = function(radians) {
	return radians * 180 / 3.141592653589793;
};
tannus_math_TMath.angleBetween = function(x1,y1,x2,y2) {
	return tannus_math_TMath.toDegrees(Math.atan2(y2 - y1,x2 - x1));
};
tannus_math_TMath.max = function(a,b) {
	if(a > b) return a; else return b;
};
tannus_math_TMath.min = function(a,b) {
	if(a < b) return a; else return b;
};
tannus_math_TMath.maxr = function(nums) {
	var m = null;
	var $it0 = $iterator(nums)();
	while( $it0.hasNext() ) {
		var n = $it0.next();
		if(m == null) m = n;
		m = n > m?n:m;
	}
	return m;
};
tannus_math_TMath.minr = function(nums) {
	var m = null;
	var _g = 0;
	while(_g < nums.length) {
		var n = nums[_g];
		++_g;
		if(m == null) m = n;
		m = n < m?n:m;
	}
	return m;
};
tannus_math_TMath.range = function(nums) {
	var mi = null;
	var ma = null;
	var _g = 0;
	while(_g < nums.length) {
		var n = nums[_g];
		++_g;
		if(mi == null) mi = n;
		if(ma == null) ma = n;
		mi = n < mi?n:mi;
		ma = n > ma?n:ma;
	}
	return new tannus_ds_Range(mi,ma);
};
tannus_math_TMath.lerp = function(a,b,x) {
	return a + x * (b - a);
};
tannus_math_TMath.i = function(f) {
	return f | 0;
};
tannus_math_TMath.roundFloat = function(f,digit) {
	var n = Math.pow(10,digit);
	var r = Math.round(f * n) / n;
	return r;
};
tannus_math_TMath.average = function(values) {
	var sum = 0;
	var _g = 0;
	while(_g < values.length) {
		var n = values[_g];
		++_g;
		sum += n;
	}
	return sum / values.length;
};
tannus_math_TMath.largest = function(items,predicate) {
	var highest = 0;
	var $it0 = $iterator(items)();
	while( $it0.hasNext() ) {
		var item = $it0.next();
		highest = tannus_math_TMath.max(highest,predicate(item));
	}
	return highest;
};
tannus_math_TMath.smallest = function(items,predicate) {
	var lowest = 0;
	var $it0 = $iterator(items)();
	while( $it0.hasNext() ) {
		var item = $it0.next();
		lowest = tannus_math_TMath.min(lowest,predicate(item));
	}
	return lowest;
};
tannus_math_TMath.largestItem = function(items,predicate) {
	var asarr = Lambda.array(items);
	if(asarr.length == 0) return null; else if(asarr.length == 1) return asarr[0]; else if(asarr.length == 2) {
		var px = predicate(asarr[0]);
		var py = predicate(asarr[1]);
		if(px >= py) return asarr[0]; else return asarr[1];
	} else {
		var best = null;
		var $it0 = $iterator(items)();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			var score = predicate(item);
			if(best == null || score > best.score) best = { 'item' : item, 'score' : score};
		}
		return best.item;
	}
};
tannus_math_TMath.minmax = function(items,predicate) {
	var res = new tannus_ds_FloatRange(NaN,NaN);
	var $it0 = $iterator(items)();
	while( $it0.hasNext() ) {
		var item = $it0.next();
		var score = predicate(item);
		if(res.max < score || isNaN(res.max)) res.max = score; else if(res.min > score || isNaN(res.min)) res.min = score;
		if(res.min > res.max) {
			var _t = res.max;
			res.max = res.min;
			res.min = _t;
		}
	}
	return res;
};
tannus_math_TMath.sign = function(value) {
	if(value < 0) return -1; else if(value > 0) return 1; else return 0;
};
tannus_math_TMath.sampleVariance = function(data) {
	var sampleSize = data.length;
	if(sampleSize < 2) return 0;
	var mean = tannus_math_TMath.average(data);
	return tannus_math_TMath.sum_Float(data.map(function(val) {
		return Math.pow(val - mean,2);
	})) / (sampleSize - 1);
};
tannus_math_TMath.standardDeviation = function(data) {
	return Math.sqrt(tannus_math_TMath.sampleVariance(data));
};
tannus_math_TMath.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
tannus_math_TMath.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
tannus_math_TMath.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
tannus_math_TMath.doubleToI64 = function(v) {
	var i64;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	i64 = x;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var tannus_nore_Check = { __ename__ : ["tannus","nore","Check"], __constructs__ : ["TypeCheck","LooseTypeCheck","ShortTypeCheck","NestedCheck","FieldExistsCheck","FieldValueCheck","FieldValueBlockCheck","FieldValueTypeCheck","HelperCheck","GroupCheck","EitherCheck","InvertedCheck","TernaryCheck"] };
tannus_nore_Check.TypeCheck = function(t) { var $x = ["TypeCheck",0,t]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.LooseTypeCheck = function(t) { var $x = ["LooseTypeCheck",1,t]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.ShortTypeCheck = function(t) { var $x = ["ShortTypeCheck",2,t]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.NestedCheck = function(op,value) { var $x = ["NestedCheck",3,op,value]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.FieldExistsCheck = function(name) { var $x = ["FieldExistsCheck",4,name]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.FieldValueCheck = function(op,name,value) { var $x = ["FieldValueCheck",5,op,name,value]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.FieldValueBlockCheck = function(name,checks) { var $x = ["FieldValueBlockCheck",6,name,checks]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.FieldValueTypeCheck = function(name,type,loose) { var $x = ["FieldValueTypeCheck",7,name,type,loose]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.HelperCheck = function(name,args) { var $x = ["HelperCheck",8,name,args]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.GroupCheck = function(checks) { var $x = ["GroupCheck",9,checks]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.EitherCheck = function(left,right) { var $x = ["EitherCheck",10,left,right]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.InvertedCheck = function(check) { var $x = ["InvertedCheck",11,check]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.TernaryCheck = function(condition,itrue,ifalse) { var $x = ["TernaryCheck",12,condition,itrue,ifalse]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
var tannus_nore_Compiler = function() {
	this.reset();
};
$hxClasses["tannus.nore.Compiler"] = tannus_nore_Compiler;
tannus_nore_Compiler.__name__ = ["tannus","nore","Compiler"];
tannus_nore_Compiler.prototype = {
	compileString: function(s) {
		var l = new tannus_nore_Lexer();
		var $it0 = this.operators.keys();
		while( $it0.hasNext() ) {
			var s1 = $it0.next();
			l.operators.push(s1);
		}
		var p = new tannus_nore_Parser();
		var toks = l.lex(s);
		var tree = p.parse(toks);
		return this.compile(tree);
	}
	,compile: function(checkList) {
		this.checks = new tannus_ds_Stack(checkList);
		while(!this.checks.get_empty()) {
			var cf = this.compileCheck(this.checks.pop());
			this.checkFuncs.push(cf);
		}
		return (function(f) {
			return function(o) {
				return f(o);
			};
		})($bind(this,this.testAll));
	}
	,compileCheck: function(check) {
		var _g = this;
		switch(check[1]) {
		case 9:
			var list = check[2];
			var state = this.save();
			var child = new tannus_nore_Compiler();
			child.restore(state);
			return child.compile(list);
		case 0:
			var type = check[2];
			return (function(f,a1,a2) {
				return function(o) {
					return f(o,a1,a2);
				};
			})(($_=this.tools,$bind($_,$_.checkType)),type,false);
		case 1:
			var type1 = check[2];
			return (function(f1,a11,a21) {
				return function(o1) {
					return f1(o1,a11,a21);
				};
			})(($_=this.tools,$bind($_,$_.checkType)),type1,true);
		case 2:
			var type2 = check[2];
			return (function(f2,a12) {
				return function(o2) {
					return f2(o2,a12);
				};
			})(($_=this.tools,$bind($_,$_.checkShortType)),type2);
		case 3:
			var value = check[3];
			var sop = check[2];
			if(this.operators.exists(sop)) {
				var op = this.operators.get(sop);
				return function(o3) {
					return op(o3,(function($this) {
						var $r;
						var this1 = tannus_nore_ValueTools.haxeValue(value,_g.tools,o3);
						$r = this1();
						return $r;
					}(this)));
				};
			} else throw new js__$Boot_HaxeError("CompilationError: Invalid operator \"" + sop + "\"!");
			break;
		case 4:
			var name = check[2];
			return (function(f3,a13) {
				return function(o4) {
					return f3(o4,a13);
				};
			})(($_=this.tools,$bind($_,$_.has)),name);
		case 5:
			var value1 = check[4];
			var name1 = check[3];
			var sop1 = check[2];
			if(this.operators.exists(sop1)) {
				var op1 = this.operators.get(sop1);
				return function(o5) {
					return op1(_g.tools.get(o5,name1),(function($this) {
						var $r;
						var this2 = tannus_nore_ValueTools.haxeValue(value1,_g.tools,o5);
						$r = this2();
						return $r;
					}(this)));
				};
			} else throw new js__$Boot_HaxeError("CompilationError: Invalid operator \"" + sop1 + "\"!");
			break;
		case 7:
			var loose = check[4];
			var type3 = check[3];
			var name2 = check[2];
			return function(o6) {
				return _g.tools.checkType(_g.tools.get(o6,name2),type3,loose);
			};
		case 6:
			var block = check[3];
			var name3 = check[2];
			var getit = (function(f4,a14) {
				return function(o7) {
					return f4(o7,a14);
				};
			})(($_=this.tools,$bind($_,$_.get)),name3);
			var test = this.sub(block);
			return function(o8) {
				return test(getit(o8));
			};
		case 8:
			var vargs = check[3];
			var name4 = check[2];
			return (function(f5,a15,a22) {
				return function(o9) {
					return f5(o9,a15,a22);
				};
			})(($_=this.tools,$bind($_,$_.helper_check)),name4,vargs);
		case 10:
			var cright = check[3];
			var cleft = check[2];
			var left = this.compileCheck(cleft);
			var right = this.compileCheck(cright);
			return function(o10) {
				return left(o10) || right(o10);
			};
		case 11:
			var cc = check[2];
			var c = this.compileCheck(cc);
			return function(o11) {
				return !c(o11);
			};
		case 12:
			var cfalse = check[4];
			var ctrue = check[3];
			var ccondition = check[2];
			var cond = this.compileCheck(ccondition);
			var itrue = this.compileCheck(ctrue);
			var ifalse;
			if(cfalse != null) ifalse = this.compileCheck(cfalse); else ifalse = null;
			return function(o12) {
				if(cond(o12)) return itrue(o12); else if(ifalse != null) return ifalse(o12); else return true;
			};
		}
	}
	,reset: function() {
		this.checks = new tannus_ds_Stack();
		this.checkFuncs = [];
		try {
			this.operators.exists("");
		} catch( error ) {
			if (error instanceof js__$Boot_HaxeError) error = error.val;
			this.operators = new haxe_ds_StringMap();
		}
		try {
			this.helpers.exists("");
		} catch( error1 ) {
			if (error1 instanceof js__$Boot_HaxeError) error1 = error1.val;
			this.helpers = new haxe_ds_StringMap();
		}
		this.tools = new tannus_nore_CompilerTools(this);
		this.initOperators();
		this.initHelpers();
	}
	,initOperators: function() {
		var _g = this;
		var eq2 = function(x,y) {
			if(tannus_internal_TypeTools.typename(x) == tannus_internal_TypeTools.typename(y)) {
				if(x == y) return true; else {
					var eq = _g.tools.get(x,"equals");
					if(Reflect.isFunction(eq)) try {
						var eqv = Reflect.callMethod(x,eq,[y]);
						if(eqv != null) return eqv == true;
					} catch( err ) {
						if (err instanceof js__$Boot_HaxeError) err = err.val;
						null;
					}
					var eq1 = _g.tools.get(y,"equals");
					if(Reflect.isFunction(eq1)) try {
						var eqv1 = Reflect.callMethod(y,eq1,[x]);
						if(eqv1 != null) return eqv1 == true;
					} catch( err1 ) {
						if (err1 instanceof js__$Boot_HaxeError) err1 = err1.val;
						null;
					}
					return false;
				}
			} else return false;
		};
		this.operators.set("==",eq2);
		this.operators.set("!=",function(x3,y3) {
			return !eq2(x3,y3);
		});
		var greaterThan = function(x1,y1) {
			if(tannus_internal_TypeTools.typename(x1) == "Number" && tannus_internal_TypeTools.typename(y1) == "Number") return x1 > y1; else return false;
		};
		var lessThan = function(x2,y2) {
			if(tannus_internal_TypeTools.typename(x2) == "Number" && tannus_internal_TypeTools.typename(y2) == "Number") return x2 < y2; else return false;
		};
		this.operators.set(">",greaterThan);
		this.operators.set("<",lessThan);
		this.operators.set(">=",function(x4,y4) {
			return greaterThan(x4,y4) || eq2(x4,y4);
		});
		this.operators.set("<=",function(x5,y5) {
			return lessThan(x5,y5) || eq2(x5,y5);
		});
		this.operators.set("has",function(x6,y6) {
			if(typeof(x6) == "string") return tannus_ds_StringUtils.has(js_Boot.__cast(x6 , String),Std.string(y6)); else if((x6 instanceof Array) && x6.__enum__ == null) return Lambda.has(js_Boot.__cast(x6 , Array),y6); else return false;
		});
	}
	,initHelpers: function() {
		null;
	}
	,operator: function(name,f) {
		this.operators.set(name,f);
	}
	,helper: function(name,f) {
		this.helpers.set(name,f);
	}
	,save: function() {
		return { 'checks' : this.checks.copy(), 'checkFuncs' : this.checkFuncs.slice(), 'operators' : this.copyOperators(), 'helpers' : this.copyHelpers(), 'tools' : this.tools};
	}
	,restore: function(s) {
		this.checks = s.checks;
		this.checkFuncs = s.checkFuncs;
		this.operators = s.operators;
		this.helpers = s.helpers;
		this.tools = s.tools;
	}
	,sub: function(checkList) {
		var state = this.save();
		this.reset();
		var result = this.compile(checkList);
		this.restore(state);
		return result;
	}
	,copyOperators: function() {
		var copy = new haxe_ds_StringMap();
		var $it0 = this.operators.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			var value = this.operators.get(key);
			if(__map_reserved[key] != null) copy.setReserved(key,value); else copy.h[key] = value;
		}
		return copy;
	}
	,copyHelpers: function() {
		var copy = new haxe_ds_StringMap();
		var $it0 = this.helpers.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			var value = this.helpers.get(key);
			if(__map_reserved[key] != null) copy.setReserved(key,value); else copy.h[key] = value;
		}
		return copy;
	}
	,testAll: function(o) {
		var _g = 0;
		var _g1 = this.checkFuncs;
		while(_g < _g1.length) {
			var check = _g1[_g];
			++_g;
			if(!check(o)) return false;
		}
		return true;
	}
	,get_end: function() {
		return this.checks.get_empty();
	}
	,__class__: tannus_nore_Compiler
	,__properties__: {get_end:"get_end"}
};
var tannus_nore_CompilerTools = function(owner) {
	this.c = owner;
};
$hxClasses["tannus.nore.CompilerTools"] = tannus_nore_CompilerTools;
tannus_nore_CompilerTools.__name__ = ["tannus","nore","CompilerTools"];
tannus_nore_CompilerTools.prototype = {
	has: function(o,name) {
		return Object.prototype.hasOwnProperty.call(o,name);
	}
	,get: function(o,name) {
		return Reflect.getProperty(o,name);
	}
	,checkType: function(o,type,loose) {
		if(loose == null) loose = false;
		if(!loose) return tannus_internal_TypeTools.typename(o) == type; else {
			var tc = Type.resolveClass(type);
			return js_Boot.__instanceof(o,tc);
		}
	}
	,checkShortType: function(o,type) {
		var className = tannus_ds_ArrayTools.last(tannus_internal_TypeTools.typename(o).split("."));
		return className == type;
	}
	,helper_check: function(o,name,vargs) {
		var args;
		var _g = [];
		var _g1 = 0;
		while(_g1 < vargs.length) {
			var v = vargs[_g1];
			++_g1;
			_g.push((function($this) {
				var $r;
				var this1 = tannus_nore_ValueTools.haxeValue(v,$this,o);
				$r = this1();
				return $r;
			}(this)));
		}
		args = _g;
		if(this.c.helpers.exists(name)) {
			var help = this.c.helpers.get(name);
			return help(o,args);
		} else if(this.has(o,name)) {
			var v1 = this.get(o,name);
			if(typeof(v1) == "boolean") return v1; else if(Reflect.isFunction(v1)) return Reflect.callMethod(o,this.get(o,name),args) == true; else return false;
		} else return false;
	}
	,__class__: tannus_nore_CompilerTools
};
var tannus_nore_Lexer = function() {
	this.reset();
	this.operators = [];
	this.operators.push("=>");
	this.operators.push("is");
};
$hxClasses["tannus.nore.Lexer"] = tannus_nore_Lexer;
tannus_nore_Lexer.__name__ = ["tannus","nore","Lexer"];
tannus_nore_Lexer.prototype = {
	operator: function(op) {
		this.operators.push(op);
	}
	,lex: function(s) {
		this.reset();
		this.bytes = new tannus_io_ByteStack(tannus_io_impl_JavaScriptBinary.ofString(s));
		while(!this.bytes.get_empty()) {
			var t = this.lexNext();
			if(t != null) this.tokens.push(t);
		}
		return this.tokens;
	}
	,lexNext: function() {
		var c = this.bytes.peek();
		if(Lambda.has([9,10,11,12,13,32],c)) {
			this.bytes.pop();
			if(!this.bytes.get_empty()) return this.lexNext(); else return null;
		} else if(c >= 65 && c <= 90 || c >= 97 && c <= 122 || c == 95) {
			var id = String.fromCharCode(c);
			this.bytes.pop();
			while(!this.bytes.get_empty() && this.isIdent(this.bytes.peek())) {
				var this1 = this.bytes.pop();
				id += String.fromCharCode(this1);
			}
			if(Lambda.has(this.operators,id)) return tannus_nore_Token.TOperator(id);
			if(Lambda.has(["if"],id.toLowerCase())) return this.lexStructure(id.toLowerCase()); else return tannus_nore_Token.TConst(tannus_nore_Const.CIdent(id));
		} else if(c == 64) {
			this.bytes.pop();
			var id1 = "";
			while(!this.bytes.get_empty() && this.isIdent(this.bytes.peek())) {
				var this2 = this.bytes.pop();
				id1 += String.fromCharCode(this2);
			}
			return tannus_nore_Token.TConst(tannus_nore_Const.CReference(id1));
		} else if(Lambda.has([34,39,96],c)) {
			var delimiter = this.bytes.pop();
			var level;
			switch(delimiter) {
			case 39:
				level = 1;
				break;
			case 34:
				level = 2;
				break;
			case 96:
				level = 3;
				break;
			default:
				level = -1;
			}
			var str;
			{
				var this3 = this.bytes.readUntil(delimiter);
				str = this3.toString();
			}
			this.bytes.pop();
			return tannus_nore_Token.TConst(tannus_nore_Const.CString(str,level));
		} else if(c >= 48 && c <= 57) {
			var snum;
			{
				var this4 = this.bytes.pop();
				snum = String.fromCharCode(this4);
			}
			while(!this.bytes.get_empty() && ((function($this) {
				var $r;
				var this5 = $this.bytes.peek();
				$r = this5 >= 48 && this5 <= 57;
				return $r;
			}(this)) || (function($this) {
				var $r;
				var this6 = $this.bytes.peek();
				$r = this6 == HxOverrides.cca(".",0);
				return $r;
			}(this)))) {
				var this7 = this.bytes.pop();
				snum += String.fromCharCode(this7);
			}
			return tannus_nore_Token.TConst(tannus_nore_Const.CNumber(parseFloat(snum)));
		} else if(c == 91) {
			var sgroup;
			{
				var this10 = this.readGroup((function($this) {
					var $r;
					var n = HxOverrides.cca("[",0);
					var this8;
					if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
					this8 = n;
					$r = this8;
					return $r;
				}(this)),(function($this) {
					var $r;
					var n1 = HxOverrides.cca("]",0);
					var this9;
					if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n1)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n1 + ")!");
					this9 = n1;
					$r = this9;
					return $r;
				}(this)));
				sgroup = this10.toString();
			}
			var group = this.sub(sgroup);
			return tannus_nore_Token.TBrackets(group);
		} else if(c == 123) {
			var sg;
			{
				var this13 = this.readGroup((function($this) {
					var $r;
					var n2 = HxOverrides.cca("{",0);
					var this11;
					if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n2)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n2 + ")!");
					this11 = n2;
					$r = this11;
					return $r;
				}(this)),(function($this) {
					var $r;
					var n3 = HxOverrides.cca("}",0);
					var this12;
					if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n3)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n3 + ")!");
					this12 = n3;
					$r = this12;
					return $r;
				}(this)));
				sg = this13.toString();
			}
			var g = this.sub(sg);
			return tannus_nore_Token.TBoxBrackets(g);
		} else if(this.isOpChar(c)) {
			var state = this.save();
			var op;
			{
				var this14 = this.bytes.pop();
				op = String.fromCharCode(this14);
			}
			while(!this.bytes.get_empty() && this.isOpChar(this.bytes.peek())) {
				var this15 = this.bytes.pop();
				op += String.fromCharCode(this15);
			}
			if(Lambda.has(this.operators,op)) return tannus_nore_Token.TOperator(op); else switch(op) {
			case "!":
				return tannus_nore_Token.TNot;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Invalid operator \"" + op + "\"!");
				return null;
			}
		} else if(c == 40) {
			var s = this.readGroup((function($this) {
				var $r;
				var n4 = HxOverrides.cca("(",0);
				var this16;
				if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n4)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n4 + ")!");
				this16 = n4;
				$r = this16;
				return $r;
			}(this)),(function($this) {
				var $r;
				var n5 = HxOverrides.cca(")",0);
				var this17;
				if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n5)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n5 + ")!");
				this17 = n5;
				$r = this17;
				return $r;
			}(this)));
			var toklist;
			if(s._length <= 0) toklist = []; else toklist = this.sub(s.toString());
			var treeStack = new tannus_ds_Stack(toklist.slice());
			var tree = [];
			var hasComma = false;
			while(!treeStack.get_empty()) {
				var t = treeStack.pop();
				if(!(function($this) {
					var $r;
					switch(t[1]) {
					case 9:
						$r = true;
						break;
					default:
						$r = false;
					}
					return $r;
				}(this))) tree.push(t); else hasComma = true;
			}
			if(hasComma) return tannus_nore_Token.TTuple(tree); else return tannus_nore_Token.TGroup(toklist);
		} else if(c == 44) {
			this.bytes.pop();
			return tannus_nore_Token.TComma;
		} else if(c == 124) {
			this.bytes.pop();
			return tannus_nore_Token.TOr;
		} else if(c == 58) {
			this.bytes.pop();
			this.canCall = true;
			var name = this.lexNext();
			if(name != null) switch(name[1]) {
			case 0:
				switch(name[2][1]) {
				case 0:
					var name1 = name[2][2];
					if(!this.bytes.get_empty()) {
						var state1 = this.save();
						var targs = this.lexNext();
						if(targs != null) switch(targs[1]) {
						case 5:
							var args = targs[2];
							console.log("helper");
							return tannus_nore_Token.THelper(name1,args);
						case 4:
							var __ex0 = targs[2];
							{
								var _g = __ex0[0];
								var arg = _g;
								console.log("helper");
								return tannus_nore_Token.THelper(name1,[arg]);
							}
							break;
						default:
							this.restore(state1);
							console.log("helper");
							return tannus_nore_Token.THelper(name1,[]);
						} else {
							this.restore(state1);
							console.log("helper");
							return tannus_nore_Token.THelper(name1,[]);
						}
					} else {
						console.log("helper");
						return tannus_nore_Token.THelper(name1,[]);
					}
					break;
				default:
					throw new js__$Boot_HaxeError("SyntaxError: Expected identifier, got " + Std.string(name));
				}
				break;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Expected identifier, got " + Std.string(name));
			} else throw new js__$Boot_HaxeError("SyntaxError: Expected identifier, got " + Std.string(name));
		} else if(c == 46) {
			this.bytes.pop();
			if((function($this) {
				var $r;
				var this18 = $this.bytes.peek();
				$r = this18 == 46;
				return $r;
			}(this))) {
				this.bytes.pop();
				return tannus_nore_Token.TDoubleDot;
			} else throw new js__$Boot_HaxeError("SyntaxError: Expected \".\", got " + (function($this) {
				var $r;
				var this19 = $this.bytes.peek();
				$r = String.fromCharCode(this19);
				return $r;
			}(this)));
		} else if(c == 126) {
			this.bytes.pop();
			return tannus_nore_Token.TApprox;
		} else throw new js__$Boot_HaxeError("SyntaxError: Unexpected \"" + String.fromCharCode(c) + "\"!");
	}
	,lexStructure: function(kw) {
		switch(kw) {
		case "if":
			var cond = this.lexNext();
			console.log(cond);
			var then = this.lexNext();
			console.log(then);
			switch(then[1]) {
			case 0:
				switch(then[2][1]) {
				case 0:
					switch(then[2][2]) {
					case "then":
						var itrue = this.lexNext();
						console.log(itrue);
						var ifalse = null;
						if(!this.bytes.get_empty()) {
							var state = this.save();
							var otherwise = this.lexNext();
							switch(otherwise[1]) {
							case 0:
								switch(otherwise[2][1]) {
								case 0:
									switch(otherwise[2][2]) {
									case "else":
										ifalse = this.lexNext();
										console.log(ifalse);
										break;
									default:
										this.restore(state);
									}
									break;
								default:
									this.restore(state);
								}
								break;
							default:
								this.restore(state);
							}
						}
						if(cond != null) null; else throw new js__$Boot_HaxeError("SyntaxError: Unexpected if!");
						if(itrue != null) null; else throw new js__$Boot_HaxeError("SyntaxError: Unexpected end of input!");
						return tannus_nore_Token.TIf(cond,itrue,ifalse);
					default:
						throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(then) + "!");
					}
					break;
				default:
					throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(then) + "!");
				}
				break;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(then) + "!");
			}
			break;
		default:
			throw new js__$Boot_HaxeError("FuckUpError: \"" + kw + "\" is not a keyword");
		}
	}
	,readGroup: function(start,end) {
		var c = this.bytes.peek();
		if(c == start) {
			var level = 1;
			var data;
			var this1;
			this1 = tannus_io_impl_JavaScriptBinary.alloc(0);
			data = this1;
			this.bytes.pop();
			while(level > 0) {
				c = this.bytes.peek();
				if(c == start) level++; else if(c == end) level--;
				if(level > 0) data.push(c);
				this.bytes.pop();
			}
			return data;
		}
		var this2;
		this2 = tannus_io_impl_JavaScriptBinary.alloc(0);
		return this2;
	}
	,sub: function(s) {
		var state = this.save();
		var _it = this.inTernary;
		var result = this.lex(s);
		this.restore(state);
		this.inTernary = _it;
		return result;
	}
	,reset: function() {
		this.tokens = [];
		this.canCall = false;
		this.inTernary = false;
		this.bytes = new tannus_io_ByteStack((function($this) {
			var $r;
			var this1;
			this1 = tannus_io_impl_JavaScriptBinary.alloc(0);
			$r = this1;
			return $r;
		}(this)));
	}
	,save: function() {
		return { 'tokens' : this.tokens.slice(), 'bytes' : this.bytes.copy(), 'canCall' : this.canCall};
	}
	,restore: function(s) {
		this.bytes = s.bytes;
		this.tokens = s.tokens;
		this.canCall = s.canCall;
	}
	,next: function() {
		return this.bytes.peek();
	}
	,advance: function() {
		return this.bytes.pop();
	}
	,last: function() {
		return this.tokens.pop();
	}
	,isIdent: function(c) {
		return c >= 48 && c <= 57 || (c >= 65 && c <= 90 || c >= 97 && c <= 122) || c == 46 || c == 95;
	}
	,isOpChar: function(c) {
		return Lambda.has(["=","!","<",">","$","^"],String.fromCharCode(c));
	}
	,isOperator: function(op) {
		return Lambda.has(this.operators,op);
	}
	,isKeyword: function(id) {
		return Lambda.has(["if"],id.toLowerCase());
	}
	,get_end: function() {
		return this.bytes.get_empty();
	}
	,__class__: tannus_nore_Lexer
	,__properties__: {get_end:"get_end"}
};
var tannus_nore_ORegEx = function() { };
$hxClasses["tannus.nore.ORegEx"] = tannus_nore_ORegEx;
tannus_nore_ORegEx.__name__ = ["tannus","nore","ORegEx"];
tannus_nore_ORegEx.compile = function(sel,pred) {
	var comp = new tannus_nore_Compiler();
	if(pred != null) pred(comp);
	return comp.compileString(sel);
};
var tannus_nore_Parser = function() {
	this.reset();
};
$hxClasses["tannus.nore.Parser"] = tannus_nore_Parser;
tannus_nore_Parser.__name__ = ["tannus","nore","Parser"];
tannus_nore_Parser.prototype = {
	parse: function(tokenList) {
		this.reset();
		this.tokens = new tannus_ds_Stack(tokenList);
		while(!this.tokens.get_empty()) this.tree.push(this.nextCheck());
		return this.tree;
	}
	,nextCheck: function() {
		var t = this.tokens.pop();
		switch(t[1]) {
		case 0:
			switch(t[2][1]) {
			case 0:
				var type = t[2][2];
				return tannus_nore_Check.TypeCheck(type);
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(t) + "!");
			}
			break;
		case 12:
			t = this.tokens.pop();
			switch(t[1]) {
			case 0:
				switch(t[2][1]) {
				case 0:
					var type1 = t[2][2];
					return tannus_nore_Check.LooseTypeCheck(type1);
				default:
					throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(t) + "!");
				}
				break;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(t) + "!");
			}
			break;
		case 13:
			t = this.tokens.pop();
			switch(t[1]) {
			case 0:
				switch(t[2][1]) {
				case 0:
					var type2 = t[2][2];
					return tannus_nore_Check.ShortTypeCheck(type2);
				default:
					throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(t) + "!");
				}
				break;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(t) + "!");
			}
			break;
		case 2:
			var group = t[2];
			switch(group.length) {
			case 1:
				switch(group[0][1]) {
				case 0:
					switch(group[0][2][1]) {
					case 0:
						var name = group[0][2][2];
						return tannus_nore_Check.FieldExistsCheck(name);
					default:
						throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
					}
					break;
				default:
					throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
				}
				break;
			case 3:
				switch(group[0][1]) {
				case 0:
					switch(group[0][2][1]) {
					case 0:
						switch(group[1][1]) {
						case 1:
							var op = group[1][2];
							var op1 = group[1][2];
							switch(group[1][2]) {
							case "=>":
								var valueToken = group[2];
								var valueToken1 = group[2];
								switch(group[2][1]) {
								case 3:
									var name1 = group[0][2][2];
									var __ex0 = group[2][2];
									{
										var _g = this.sub(__ex0);
										var checks = _g;
										return tannus_nore_Check.FieldValueBlockCheck(name1,checks);
									}
									break;
								default:
									var name2 = group[0][2][2];
									switch(group[0][2][2]) {
									case "this":
										return tannus_nore_Check.NestedCheck(op,tannus_nore_ValueTools.toValue(valueToken));
									default:
										return tannus_nore_Check.FieldValueCheck(op1,name2,tannus_nore_ValueTools.toValue(valueToken1));
									}
								}
								break;
							case "is":
								var valueToken2 = group[2];
								var valueToken3 = group[2];
								switch(group[2][1]) {
								case 0:
									switch(group[2][2][1]) {
									case 0:
										var name3 = group[0][2][2];
										var type3 = group[2][2][2];
										return tannus_nore_Check.FieldValueTypeCheck(name3,type3,false);
									default:
										var name4 = group[0][2][2];
										switch(group[0][2][2]) {
										case "this":
											return tannus_nore_Check.NestedCheck(op,tannus_nore_ValueTools.toValue(valueToken2));
										default:
											return tannus_nore_Check.FieldValueCheck(op1,name4,tannus_nore_ValueTools.toValue(valueToken3));
										}
									}
									break;
								default:
									var name5 = group[0][2][2];
									switch(group[0][2][2]) {
									case "this":
										return tannus_nore_Check.NestedCheck(op,tannus_nore_ValueTools.toValue(valueToken2));
									default:
										return tannus_nore_Check.FieldValueCheck(op1,name5,tannus_nore_ValueTools.toValue(valueToken3));
									}
								}
								break;
							default:
								var name6 = group[0][2][2];
								switch(group[0][2][2]) {
								case "this":
									var valueToken4 = group[2];
									return tannus_nore_Check.NestedCheck(op,tannus_nore_ValueTools.toValue(valueToken4));
								default:
									var valueToken5 = group[2];
									return tannus_nore_Check.FieldValueCheck(op1,name6,tannus_nore_ValueTools.toValue(valueToken5));
								}
							}
							break;
						default:
							throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
						}
						break;
					default:
						throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
					}
					break;
				default:
					throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
				}
				break;
			case 4:
				switch(group[0][1]) {
				case 0:
					switch(group[0][2][1]) {
					case 0:
						switch(group[1][1]) {
						case 1:
							switch(group[1][2]) {
							case "is":
								switch(group[2][1]) {
								case 12:
									switch(group[3][1]) {
									case 0:
										switch(group[3][2][1]) {
										case 0:
											var name7 = group[0][2][2];
											var type4 = group[3][2][2];
											return tannus_nore_Check.FieldValueTypeCheck(name7,type4,true);
										default:
											throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
										}
										break;
									default:
										throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
									}
									break;
								default:
									throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
								}
								break;
							default:
								throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
							}
							break;
						default:
							throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
						}
						break;
					default:
						throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
					}
					break;
				default:
					throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
				}
				break;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
			}
			break;
		case 4:
			var group1 = t[2];
			var subChecks = this.sub(group1);
			return tannus_nore_Check.GroupCheck(subChecks);
		case 3:
			var group2 = t[2];
			var subChecks1 = this.sub(group2);
			return tannus_nore_Check.GroupCheck(subChecks1);
		case 7:
			var argTokens = t[3];
			var name8 = t[2];
			var args;
			var _g1 = [];
			var _g11 = 0;
			while(_g11 < argTokens.length) {
				var t1 = argTokens[_g11];
				++_g11;
				_g1.push(tannus_nore_ValueTools.toValue(t1));
			}
			args = _g1;
			return tannus_nore_Check.HelperCheck(name8,args);
		case 10:
			var left = this.tree.pop();
			var right = this.nextCheck();
			{
				var l = left;
				var l1 = left;
				if(left == null) {
					var r = right;
					throw new js__$Boot_HaxeError("SyntaxError: Unexpected \"|\"!");
				} else switch(left[1]) {
				default:
					var r1 = right;
					if(right == null) throw new js__$Boot_HaxeError("SyntaxError: Unexpected end of input!"); else switch(right[1]) {
					default:
						return tannus_nore_Check.EitherCheck(left,right);
					}
				}
			}
			break;
		case 11:
			var check = this.nextCheck();
			if(check != null) return tannus_nore_Check.InvertedCheck(check); else throw new js__$Boot_HaxeError("SyntaxError: Unexpected end of input!");
			break;
		case 8:
			var telse = t[4];
			var tthen = t[3];
			var ttest = t[2];
			var toks = [ttest,tthen];
			if(telse != null) toks.push(telse);
			var chl = this.sub(toks);
			return Type.createEnum(tannus_nore_Check,"TernaryCheck",chl);
		default:
			throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(t) + "!");
		}
	}
	,reset: function() {
		this.tokens = new tannus_ds_Stack();
		this.tree = [];
	}
	,token: function() {
		return this.tokens.pop();
	}
	,last: function() {
		return this.tree.pop();
	}
	,save: function() {
		return { 'tokens' : this.tokens.copy(), 'tree' : this.tree.slice()};
	}
	,restore: function(s) {
		this.tokens = s.tokens;
		this.tree = s.tree;
	}
	,sub: function(toks) {
		var child = new tannus_nore_Parser();
		return child.parse(toks);
	}
	,get_end: function() {
		return this.tokens.get_empty();
	}
	,__class__: tannus_nore_Parser
	,__properties__: {get_end:"get_end"}
};
var tannus_nore__$Selector_Selector_$Impl_$ = {};
$hxClasses["tannus.nore._Selector.Selector_Impl_"] = tannus_nore__$Selector_Selector_$Impl_$;
tannus_nore__$Selector_Selector_$Impl_$.__name__ = ["tannus","nore","_Selector","Selector_Impl_"];
tannus_nore__$Selector_Selector_$Impl_$._new = function(s) {
	return new tannus_nore_CSelector(s);
};
tannus_nore__$Selector_Selector_$Impl_$.invert = function(this1) {
	return this1.invert();
};
tannus_nore__$Selector_Selector_$Impl_$.sum = function(this1,other) {
	return this1.sum(other);
};
tannus_nore__$Selector_Selector_$Impl_$.diff = function(this1,other) {
	return this1.diff(other);
};
tannus_nore__$Selector_Selector_$Impl_$.toPredicate = function(this1) {
	return this1.f;
};
tannus_nore__$Selector_Selector_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_nore__$Selector_Selector_$Impl_$.fromString = function(s) {
	return new tannus_nore_CSelector(s);
};
var tannus_nore_CSelector = function(sel) {
	this.selector = sel;
	this.f = tannus_nore_ORegEx.compile(sel);
};
$hxClasses["tannus.nore.CSelector"] = tannus_nore_CSelector;
tannus_nore_CSelector.__name__ = ["tannus","nore","CSelector"];
tannus_nore_CSelector.prototype = {
	test: function(o) {
		return this.f(o);
	}
	,filter: function(list) {
		return list.filter(this.f);
	}
	,clone: function() {
		return new tannus_nore_CSelector(this.selector);
	}
	,toString: function() {
		return "Selector(" + this.selector + ")";
	}
	,invert: function() {
		return new tannus_nore_CSelector("!(" + this.selector + ")");
	}
	,sum: function(other) {
		return new tannus_nore_CSelector(this.selector + other.selector);
	}
	,diff: function(other) {
		var s = this.selector + other.invert().selector;
		return new tannus_nore_CSelector(s);
	}
	,__class__: tannus_nore_CSelector
};
var tannus_nore_Token = { __ename__ : ["tannus","nore","Token"], __constructs__ : ["TConst","TOperator","TBrackets","TBoxBrackets","TGroup","TTuple","TCall","THelper","TIf","TComma","TOr","TNot","TApprox","TDoubleDot"] };
tannus_nore_Token.TConst = function(c) { var $x = ["TConst",0,c]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TOperator = function(op) { var $x = ["TOperator",1,op]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TBrackets = function(tree) { var $x = ["TBrackets",2,tree]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TBoxBrackets = function(tree) { var $x = ["TBoxBrackets",3,tree]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TGroup = function(tree) { var $x = ["TGroup",4,tree]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TTuple = function(values) { var $x = ["TTuple",5,values]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TCall = function(id,args) { var $x = ["TCall",6,id,args]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.THelper = function(id,args) { var $x = ["THelper",7,id,args]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TIf = function(test,then,otherwise) { var $x = ["TIf",8,test,then,otherwise]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TComma = ["TComma",9];
tannus_nore_Token.TComma.toString = $estr;
tannus_nore_Token.TComma.__enum__ = tannus_nore_Token;
tannus_nore_Token.TOr = ["TOr",10];
tannus_nore_Token.TOr.toString = $estr;
tannus_nore_Token.TOr.__enum__ = tannus_nore_Token;
tannus_nore_Token.TNot = ["TNot",11];
tannus_nore_Token.TNot.toString = $estr;
tannus_nore_Token.TNot.__enum__ = tannus_nore_Token;
tannus_nore_Token.TApprox = ["TApprox",12];
tannus_nore_Token.TApprox.toString = $estr;
tannus_nore_Token.TApprox.__enum__ = tannus_nore_Token;
tannus_nore_Token.TDoubleDot = ["TDoubleDot",13];
tannus_nore_Token.TDoubleDot.toString = $estr;
tannus_nore_Token.TDoubleDot.__enum__ = tannus_nore_Token;
var tannus_nore_Const = { __ename__ : ["tannus","nore","Const"], __constructs__ : ["CIdent","CString","CReference","CNumber"] };
tannus_nore_Const.CIdent = function(id) { var $x = ["CIdent",0,id]; $x.__enum__ = tannus_nore_Const; $x.toString = $estr; return $x; };
tannus_nore_Const.CString = function(s,quotes) { var $x = ["CString",1,s,quotes]; $x.__enum__ = tannus_nore_Const; $x.toString = $estr; return $x; };
tannus_nore_Const.CReference = function(name) { var $x = ["CReference",2,name]; $x.__enum__ = tannus_nore_Const; $x.toString = $estr; return $x; };
tannus_nore_Const.CNumber = function(n) { var $x = ["CNumber",3,n]; $x.__enum__ = tannus_nore_Const; $x.toString = $estr; return $x; };
var tannus_nore_Value = { __ename__ : ["tannus","nore","Value"], __constructs__ : ["VString","VNumber","VArray","VField"] };
tannus_nore_Value.VString = function(str) { var $x = ["VString",0,str]; $x.__enum__ = tannus_nore_Value; $x.toString = $estr; return $x; };
tannus_nore_Value.VNumber = function(num) { var $x = ["VNumber",1,num]; $x.__enum__ = tannus_nore_Value; $x.toString = $estr; return $x; };
tannus_nore_Value.VArray = function(values) { var $x = ["VArray",2,values]; $x.__enum__ = tannus_nore_Value; $x.toString = $estr; return $x; };
tannus_nore_Value.VField = function(name) { var $x = ["VField",3,name]; $x.__enum__ = tannus_nore_Value; $x.toString = $estr; return $x; };
var tannus_nore_ValueTools = function() { };
$hxClasses["tannus.nore.ValueTools"] = tannus_nore_ValueTools;
tannus_nore_ValueTools.__name__ = ["tannus","nore","ValueTools"];
tannus_nore_ValueTools.toValue = function(t) {
	switch(t[1]) {
	case 0:
		switch(t[2][1]) {
		case 1:
			var str = t[2][2];
			return tannus_nore_Value.VString(str);
		case 3:
			var num = t[2][2];
			return tannus_nore_Value.VNumber(num);
		case 2:
			var name = t[2][2];
			return tannus_nore_Value.VField(name);
		default:
			throw new js__$Boot_HaxeError("ValueError: Cannot get a Value from " + Std.string(t) + "!");
		}
		break;
	case 5:
		var vals = t[2];
		var values = vals.map(tannus_nore_ValueTools.toValue);
		return tannus_nore_Value.VArray(values);
	default:
		throw new js__$Boot_HaxeError("ValueError: Cannot get a Value from " + Std.string(t) + "!");
	}
};
tannus_nore_ValueTools.haxeValue = function(val,tools,o) {
	switch(val[1]) {
	case 0:
		var str = val[2];
		return function() {
			return str;
		};
	case 1:
		var num = val[2];
		return function() {
			return num;
		};
	case 2:
		var values = val[2];
		return function() {
			var _g = [];
			var _g1 = 0;
			while(_g1 < values.length) {
				var v = values[_g1];
				++_g1;
				_g.push(tannus_nore_ValueTools.haxeValue(v,tools,o));
			}
			return _g;
		};
	case 3:
		var name = val[2];
		return function() {
			return tools.get(o,name);
		};
	}
};
var tannus_sys__$Mime_Mime_$Impl_$ = {};
$hxClasses["tannus.sys._Mime.Mime_Impl_"] = tannus_sys__$Mime_Mime_$Impl_$;
tannus_sys__$Mime_Mime_$Impl_$.__name__ = ["tannus","sys","_Mime","Mime_Impl_"];
tannus_sys__$Mime_Mime_$Impl_$.__properties__ = {get_subtype:"get_subtype",get_type:"get_type"}
tannus_sys__$Mime_Mime_$Impl_$._new = function(m) {
	return m;
};
tannus_sys__$Mime_Mime_$Impl_$.get_type = function(this1) {
	if(tannus_ds_StringUtils.has(this1,"/")) return this1.substring(0,this1.indexOf("/")); else return this1;
};
tannus_sys__$Mime_Mime_$Impl_$.get_subtype = function(this1) {
	var st;
	if(tannus_ds_StringUtils.has(this1,"/")) st = this1.substring(this1.indexOf("/") + 1); else st = null;
	if(st == null) return null;
	return tannus_ds_StringUtils.before(tannus_ds_StringUtils.after(st,"."),"+");
};
tannus_sys__$Mime_Mime_$Impl_$.getSegments = function(this1) {
	var res = [];
	res = res.concat(this1.split("/"));
	var last;
	if(res.length == 2) {
		last = res.pop();
		var subs = last.split(".");
		res = res.concat(subs);
		last = res.pop();
		if(tannus_ds_StringUtils.has(last,"+")) {
			var suff = last.split("+");
			res = res.concat(suff);
		} else res.push(last);
	}
	return res;
};
tannus_sys__$Mime_Mime_$Impl_$.getMainType = function(this1) {
	if(tannus_ds_StringUtils.has(this1,"/")) return this1.substring(0,this1.indexOf("/")); else return this1;
};
tannus_sys__$Mime_Mime_$Impl_$.getSubType = function(this1) {
	if(tannus_ds_StringUtils.has(this1,"/")) return this1.substring(this1.indexOf("/") + 1); else return null;
};
tannus_sys__$Mime_Mime_$Impl_$.getTree = function(this1) {
	var st;
	if(tannus_ds_StringUtils.has(this1,"/")) st = this1.substring(this1.indexOf("/") + 1); else st = null;
	if(st == null) return null; else if(tannus_ds_StringUtils.has(st,".")) return st.substring(0,st.indexOf(".")); else return null;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var __map_reserved = {}
var ArrayBuffer = typeof(window) != "undefined" && window.ArrayBuffer || typeof(global) != "undefined" && global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = typeof(window) != "undefined" && window.DataView || typeof(global) != "undefined" && global.DataView || js_html_compat_DataView;
var Uint8Array = typeof(window) != "undefined" && window.Uint8Array || typeof(global) != "undefined" && global.Uint8Array || js_html_compat_Uint8Array._new;
chrome_Runtime.rt = chrome.runtime;
chrome_Windows.lib = chrome.app.window;
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
tannus_math_TMath.E = 2.718281828459045;
tannus_math_TMath.LN2 = 0.6931471805599453;
tannus_math_TMath.LN10 = 2.302585092994046;
tannus_math_TMath.LOG2E = 1.4426950408889634;
tannus_math_TMath.LOG10E = 0.43429448190325176;
tannus_math_TMath.PI = 3.141592653589793;
tannus_math_TMath.SQRT1_2 = 0.7071067811865476;
tannus_math_TMath.SQRT2 = 1.4142135623730951;
tannus_math_TMath.KAPPA = 4 * (Math.sqrt(2) - 1) / 3;
tannus_math_TMath.INT_MIN = -2147483648;
tannus_math_TMath.INT_MAX = 2147483647;
tannus_math_TMath.FLOAT_MIN = -1.79769313486231e+308;
tannus_math_TMath.FLOAT_MAX = 1.79769313486231e+308;
Background.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
