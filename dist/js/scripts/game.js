(function (console, $hx_exports) { "use strict";
$hx_exports.tannus = $hx_exports.tannus || {};
$hx_exports.tannus.sys = $hx_exports.tannus.sys || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
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
	,replace: function(s,by) {
		return s.replace(this.r,by);
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
var GameMain = function() {
	this.canvas = window.document.getElementById("stage");
	this.stage = new gryffin_core_Stage(this.canvas);
	Reflect.setProperty(window,"stage",this.stage);
	this.stage.fill();
	this.game = new war_Game(this.stage);
	this.stage.addChild(this.game);
	this.game.open();
	this.listen();
	this.consoleUtils();
};
$hxClasses["GameMain"] = GameMain;
GameMain.__name__ = ["GameMain"];
GameMain.main = function() {
	var g = new GameMain();
};
GameMain.prototype = {
	listen: function() {
		this.stage.on("click",$bind(this,this.click));
	}
	,consoleUtils: function() {
		var _g = this;
		var w = window;
		var self = tannus_ds_CObj.create(w);
		var val = function() {
			var _g1 = 0;
			var _g2 = _g.game.world.wave.zombies;
			while(_g1 < _g2.length) {
				var z = _g2[_g1];
				++_g1;
				z.cache();
			}
		};
		self.set("pauseZombies",val);
		var self1 = tannus_ds_CObj.create(w);
		var val1 = function() {
			var _g11 = 0;
			var _g21 = _g.game.world.wave.zombies;
			while(_g11 < _g21.length) {
				var z1 = _g21[_g11];
				++_g11;
				z1.hurt(z1.max_health);
			}
		};
		self1.set("killAll",val1);
		var self2 = tannus_ds_CObj.create(w);
		var val2 = function() {
			var drops = _g.stage.get("war.items.Drop");
			var $it0 = drops.iterator();
			while( $it0.hasNext() ) {
				var d = $it0.next();
				d.pickup(_g.game.player);
			}
		};
		self2.set("grab",val2);
		var self3 = tannus_ds_CObj.create(w);
		var val3 = function(x,y) {
			return new tannus_geom_TPoint(x,y,0);
		};
		self3.set("point",val3);
	}
	,click: function(e) {
	}
	,__class__: GameMain
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
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
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIterator"] = IntIterator;
IntIterator.__name__ = ["IntIterator"];
IntIterator.prototype = {
	hasNext: function() {
		return this.min < this.max;
	}
	,__class__: IntIterator
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
Lambda.empty = function(it) {
	return !$iterator(it)().hasNext();
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
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
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
Reflect.setField = function(o,field,value) {
	o[field] = value;
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
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		Reflect.setField(o2,f,Reflect.field(o,f));
	}
	return o2;
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
Std["is"] = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
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
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
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
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
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
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw new js__$Boot_HaxeError(index + " is not a valid enum constructor index");
	return Type.createEnum(e,c,params);
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
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e1 ) {
		if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
		return false;
	}
	return true;
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
var gryffin_Tools = function() { };
$hxClasses["gryffin.Tools"] = gryffin_Tools;
gryffin_Tools.__name__ = ["gryffin","Tools"];
gryffin_Tools.__properties__ = {get_win:"get_win",get_now:"get_now"}
gryffin_Tools.wait = function(ms,action) {
	window.setTimeout(action,ms);
};
gryffin_Tools.defer = function(f) {
	window.setTimeout(f,5);
};
gryffin_Tools.makeUniqueIdentifier = function(digits) {
	var id = "";
	var r = new tannus_math_Random();
	var _g = 0;
	while(_g < digits) {
		var i = _g++;
		var range = [0,0];
		var letter = r.randbool();
		if(letter) {
			var upper = r.randbool();
			if(upper) range = [65,90]; else range = [97,122];
		} else range = [48,57];
		var c;
		var n = r.randint(range[0],range[1]);
		var this1;
		if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
		this1 = n;
		c = this1;
		id += String.fromCharCode(c);
	}
	if(Lambda.has(gryffin_Tools.used_idents,id)) return gryffin_Tools.makeUniqueIdentifier(digits); else {
		gryffin_Tools.used_idents.push(id);
		return id;
	}
};
gryffin_Tools.deleteUniqueIdentifier = function(id) {
	return HxOverrides.remove(gryffin_Tools.used_idents,id);
};
gryffin_Tools.get_now = function() {
	return new Date().getTime();
};
gryffin_Tools.get_win = function() {
	return window;
};
var gryffin_core_EventDispatcher = function() {
	this.__sigs = new haxe_ds_StringMap();
	this.__metaBind();
};
$hxClasses["gryffin.core.EventDispatcher"] = gryffin_core_EventDispatcher;
gryffin_core_EventDispatcher.__name__ = ["gryffin","core","EventDispatcher"];
gryffin_core_EventDispatcher.prototype = {
	sig: function(name) {
		if(!this.__sigs.exists(name)) {
			var value = new tannus_io_Signal();
			this.__sigs.set(name,value);
		}
		return this.__sigs.get(name);
	}
	,on: function(name,handler) {
		this.sig(name).on(handler,null);
	}
	,once: function(name,handler) {
		this.sig(name).once(handler);
	}
	,when: function(name,test,handler) {
		this.sig(name).when(test,handler);
	}
	,times: function(name,count,handler) {
		this.sig(name).times(count,handler);
	}
	,every: function(name,interval,handler) {
		this.sig(name).every(interval,handler);
	}
	,off: function(name,handler) {
		var s = this.sig(name);
		if(handler != null) s.ignore(handler); else s.handlers = [];
	}
	,ignore: function(name,handler) {
		this.off(name,handler);
	}
	,dispatch: function(name,data) {
		this.sig(name).call(data);
	}
	,call: function(name,data) {
		this.dispatch(name,data);
	}
	,forward: function(event,target) {
		this.on(event,(function(f,a1) {
			return function(a2) {
				f(a1,a2);
			};
		})($bind(target,target.call),event));
	}
	,forwardAll: function(events,target) {
		var _g = 0;
		while(_g < events.length) {
			var e = events[_g];
			++_g;
			this.forward(e,target);
		}
	}
	,__metaBind: function() {
		var klass = js_Boot.getClass(this);
		var meta;
		{
			var d = haxe_rtti_Meta.getStatics(klass);
			meta = tannus_ds_CObj.create(d);
		}
		var self = tannus_ds_CObj.create(klass);
		var _g = 0;
		var _g1 = meta.keys();
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			var metas;
			var d1 = meta.get(key);
			metas = tannus_ds_CObj.create(d1);
			if(metas.exists("on")) {
				var args = metas.get("on");
				var handler = self.get(key);
				var _g2 = 0;
				while(_g2 < args.length) {
					var name = args[_g2];
					++_g2;
					this.on(name,(function(f,a1) {
						return function(a2) {
							f(a1,a2);
						};
					})(handler,this));
				}
			}
		}
	}
	,__class__: gryffin_core_EventDispatcher
};
var gryffin_core_Entity = function() {
	gryffin_core_EventDispatcher.call(this);
	this.id = gryffin_Tools.makeUniqueIdentifier(8);
	this._cached = false;
	this._hidden = false;
	this.destroyed = false;
	this.set_parent(null);
	this.priority = 0;
	this.effects = [];
	this.once("activated",$bind(this,this.init));
};
$hxClasses["gryffin.core.Entity"] = gryffin_core_Entity;
gryffin_core_Entity.__name__ = ["gryffin","core","Entity"];
gryffin_core_Entity.__super__ = gryffin_core_EventDispatcher;
gryffin_core_Entity.prototype = $extend(gryffin_core_EventDispatcher.prototype,{
	'delete': function() {
		this.destroyed = true;
		gryffin_Tools.deleteUniqueIdentifier(this.id);
	}
	,restore: function() {
		this.destroyed = false;
		this.stage.addChild(this);
		gryffin_Tools.used_idents.push(this.id);
	}
	,hide: function() {
		this._hidden = true;
	}
	,show: function() {
		this._hidden = false;
	}
	,cache: function() {
		this._cached = true;
	}
	,uncache: function() {
		this._cached = false;
	}
	,toggleCache: function() {
		(this._cached?$bind(this,this.uncache):$bind(this,this.cache))();
	}
	,toggleHidden: function() {
		(this._hidden?$bind(this,this.show):$bind(this,this.hide))();
	}
	,isHidden: function() {
		return this._hidden;
	}
	,isCached: function() {
		return this._cached;
	}
	,init: function(s) {
		null;
	}
	,update: function(s) {
		var _g = 0;
		var _g1 = this.effects;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(e.active(this)) e.affect(this);
		}
	}
	,render: function(s,c) {
		null;
	}
	,addSibling: function(sibling) {
		var _g = this;
		if(this.stage == null) this.on("activated",function(s) {
			_g.addSibling(sibling);
		}); else if(this.parent != null) this.parent.addChild(sibling); else this.stage.addChild(sibling);
	}
	,containsPoint: function(p) {
		return false;
	}
	,'is': function(selector) {
		var sel = new tannus_nore_CSelector(selector);
		return sel.test(this);
	}
	,addEffect: function(e) {
		if(!Lambda.has(this.effects,e)) {
			e.attach(this);
			this.effects.push(e);
		}
	}
	,removeEffect: function(e) {
		HxOverrides.remove(this.effects,e);
	}
	,set_parent: function(p) {
		if(p != null && !js_Boot.__instanceof(p,gryffin_core_EntityContainer)) throw new js__$Boot_HaxeError("Not a container!");
		return this.parent = p;
	}
	,__class__: gryffin_core_Entity
	,__properties__: {set_parent:"set_parent"}
});
var gryffin_core_EntityContainer = function() {
	gryffin_core_Entity.call(this);
	this.children = [];
};
$hxClasses["gryffin.core.EntityContainer"] = gryffin_core_EntityContainer;
gryffin_core_EntityContainer.__name__ = ["gryffin","core","EntityContainer"];
gryffin_core_EntityContainer.__super__ = gryffin_core_Entity;
gryffin_core_EntityContainer.prototype = $extend(gryffin_core_Entity.prototype,{
	addChild: function(e) {
		if(!Lambda.has(this.children,e)) {
			this.children.push(e);
			e.set_parent(this);
			if(this.stage != null) {
				{
					this.stage.registry.set(e.id,e);
					e;
				}
				e.stage = this.stage;
				e.dispatch("activated",this.stage);
			} else this.on("activated",function(s) {
				{
					s.registry.set(e.id,e);
					e;
				}
				e.stage = s;
				e.dispatch("activated",s);
			});
		}
	}
	,getChildren: function() {
		return this.children;
	}
	,get: function(selector) {
		return new gryffin_core_Selection(new tannus_nore_CSelector(selector),$bind(this,this.getChildren));
	}
	,update: function(s) {
		gryffin_core_Entity.prototype.update.call(this,s);
		var filt = tannus_ds_ArrayTools.splitfilter(this.children,function(e) {
			return !e.destroyed;
		});
		var _g = 0;
		var _g1 = filt.fail;
		while(_g < _g1.length) {
			var e1 = _g1[_g];
			++_g;
			this.stage.registry.remove(e1.id);
		}
		this.children = filt.pass;
		haxe_ds_ArraySort.sort(this.children,function(a,b) {
			return a.priority - b.priority;
		});
		var _g2 = 0;
		var _g11 = this.getChildren();
		while(_g2 < _g11.length) {
			var e2 = _g11[_g2];
			++_g2;
			if(!e2._cached) e2.update(s);
		}
	}
	,render: function(s,c) {
		gryffin_core_Entity.prototype.render.call(this,s,c);
		var _g = 0;
		var _g1 = this.getChildren();
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(!e._hidden) e.render(s,c);
		}
	}
	,getEntitiesAtPoint: function(p) {
		var res = [];
		var _g = 0;
		var _g1 = this.getChildren();
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(e.containsPoint(p)) {
				res.push(e);
				if(js_Boot.__instanceof(e,gryffin_core_EntityContainer)) {
					var c = e;
					res = res.concat(c.getEntitiesAtPoint(p));
				}
			}
		}
		return res;
	}
	,getEntityAtPoint: function(p) {
		var target = null;
		var targets;
		var _this = this.getChildren();
		targets = _this.slice();
		targets.reverse();
		var _g = 0;
		while(_g < targets.length) {
			var e = targets[_g];
			++_g;
			if(e.containsPoint(p)) {
				target = e;
				if(js_Boot.__instanceof(e,gryffin_core_EntityContainer)) {
					var c = e;
					var etarget = c.getEntityAtPoint(p);
					if(etarget != null) target = etarget;
				}
				break;
			}
		}
		return target;
	}
	,getEntityAt: function(x,y) {
		return this.getEntityAtPoint(new tannus_geom_TPoint(x,y,0));
	}
	,__class__: gryffin_core_EntityContainer
});
var gryffin_core_Selection = function(sel,entities) {
	this.selector = sel;
	this.all = entities;
	this.update();
};
$hxClasses["gryffin.core.Selection"] = gryffin_core_Selection;
gryffin_core_Selection.__name__ = ["gryffin","core","Selection"];
gryffin_core_Selection.prototype = {
	update: function() {
		this.selected = this.selector.filter(this.all());
	}
	,at: function(index) {
		return this.selected[index];
	}
	,iterator: function() {
		return HxOverrides.iter(this.selected);
	}
	,filter: function(sel) {
		var _g = this;
		return new gryffin_core_Selection(sel,function() {
			return _g.selected;
		});
	}
	,containsPoint: function(p) {
		var _g = this;
		var gettr = function() {
			return _g.all().filter(function(item) {
				return item.containsPoint(p);
			});
		};
		return new gryffin_core_Selection(this.selector,gettr);
	}
	,call: function(method,args) {
		if(args == null) args = [];
		var _g = 0;
		var _g1 = this.selected;
		while(_g < _g1.length) {
			var ent = _g1[_g];
			++_g;
			var e = tannus_ds_CObj.create(ent);
			var f = e.get(method);
			f = (function(f1,o,a1) {
				return function(a2) {
					return f1(o,a1,a2);
				};
			})(Reflect.callMethod,ent,f);
			try {
				f(args);
			} catch( error ) {
				if (error instanceof js__$Boot_HaxeError) error = error.val;
				throw new js__$Boot_HaxeError(error);
			}
		}
	}
	,cache: function() {
		var _g = 0;
		var _g1 = this.selected;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			item.cache();
		}
	}
	,uncache: function() {
		var _g = 0;
		var _g1 = this.selected;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			item.uncache();
		}
	}
	,hide: function() {
		var _g = 0;
		var _g1 = this.selected;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			item.hide();
		}
	}
	,show: function() {
		var _g = 0;
		var _g1 = this.selected;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			item.show();
		}
	}
	,'delete': function() {
		var _g = 0;
		var _g1 = this.selected;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			item["delete"]();
		}
	}
	,children: function() {
		return new gryffin_core_Selection(new tannus_nore_CSelector("!String"),(function(f) {
			return function() {
				return f();
			};
		})($bind(this,this._selectedChildren)));
	}
	,_selectedChildren: function() {
		var results = [];
		var _g = 0;
		var _g1 = this.selected;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(js_Boot.__instanceof(e,gryffin_core_EntityContainer)) results = results.concat((js_Boot.__cast(e , gryffin_core_EntityContainer)).getChildren());
		}
		return results;
	}
	,get_length: function() {
		return this.selected.length;
	}
	,__class__: gryffin_core_Selection
	,__properties__: {get_length:"get_length"}
};
var gryffin_core_Stage = function(can) {
	gryffin_core_EventDispatcher.call(this);
	this.canvas = can;
	{
		var c = this.canvas.getContext("2d",null);
		this.ctx = new gryffin_display_Context(c);
	}
	this.children = [];
	this.registry = new haxe_ds_StringMap();
	this.manager = new gryffin_events_FrameManager();
	this.mouseManager = new gryffin_events_MouseListener(this);
	this.keyManager = new gryffin_events_KeyListener(this);
	this.mouseWatcher = new gryffin_events_MouseWatcher(this);
	this.eventTimes = new haxe_ds_StringMap();
	this._fill = false;
	var this1 = window;
	this.lastWindowSize = new tannus_geom_CRectangle(this1.scrollX,this1.scrollY,this1.innerWidth,this1.innerHeight);
	this.__init();
};
$hxClasses["gryffin.core.Stage"] = gryffin_core_Stage;
gryffin_core_Stage.__name__ = ["gryffin","core","Stage"];
gryffin_core_Stage.__properties__ = {get_window:"get_window"}
gryffin_core_Stage.get_window = function() {
	return window;
};
gryffin_core_Stage.__super__ = gryffin_core_EventDispatcher;
gryffin_core_Stage.prototype = $extend(gryffin_core_EventDispatcher.prototype,{
	resize: function(w,h) {
		var _w = this.canvas.width;
		var _h = this.canvas.height;
		this.canvas.width = w;
		this.canvas.height = h;
		{
			var c = this.canvas.getContext("2d",null);
			this.ctx = new gryffin_display_Context(c);
		}
		if(!(this.canvas.width == _w && this.canvas.height == _h)) {
			var o = [_w,_h];
			var n = [this.canvas.width,this.canvas.height];
			var event = new tannus_events_ResizeEvent(o,n);
			this.dispatch("resize",event);
		}
	}
	,addChild: function(child) {
		if(!Lambda.has(this.children,child)) {
			this.children.push(child);
			{
				this.registry.set(child.id,child);
				child;
			}
			child.stage = this;
			child.dispatch("activated",this);
		}
	}
	,fill: function() {
		this._fill = true;
	}
	,getMousePosition: function() {
		return this.mouseWatcher.getMousePosition();
	}
	,mostRecentOccurrenceTime: function(event) {
		return this.eventTimes.get(event);
	}
	,getEntitiesAtPoint: function(p,list) {
		var res = [];
		if(list == null) list = this.children;
		var _g = 0;
		while(_g < list.length) {
			var e = list[_g];
			++_g;
			if(e.containsPoint(p)) {
				res.push(e);
				if(js_Boot.__instanceof(e,gryffin_core_EntityContainer)) {
					var c = e;
					res = res.concat(c.getEntitiesAtPoint(p));
				}
			}
		}
		return res;
	}
	,getEntityAtPoint: function(p) {
		var target = null;
		this.children.reverse();
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(e.containsPoint(p)) {
				target = e;
				if(js_Boot.__instanceof(e,gryffin_core_EntityContainer)) {
					var c = e;
					var etarget = c.getEntityAtPoint(p);
					if(etarget != null) target = etarget;
				}
				break;
			}
		}
		this.children.reverse();
		return target;
	}
	,getEntityAt: function(x,y) {
		return this.getEntityAtPoint(new tannus_geom_TPoint(x,y,0));
	}
	,frame: function(delta) {
		if(this._fill) {
			var vp;
			var this1 = window;
			vp = new tannus_geom_CRectangle(this1.scrollX,this1.scrollY,this1.innerWidth,this1.innerHeight);
			if(vp != this.lastWindowSize) {
				gryffin_core_StageFiller.sheet();
				var cw = vp.width | 0;
				var ch = vp.height | 0;
				this.resize(cw,ch);
				this.lastWindowSize = vp;
			}
		}
		this.set_cursor("default");
		var filtr = tannus_ds_ArrayTools.splitfilter(this.children,function(e) {
			return !e.destroyed;
		});
		var _g = 0;
		var _g1 = filtr.fail;
		while(_g < _g1.length) {
			var ent = _g1[_g];
			++_g;
			this.registry.remove(ent.id);
		}
		this.children = filtr.pass;
		haxe_ds_ArraySort.sort(this.children,function(a,b) {
			return a.priority - b.priority;
		});
		this.ctx.erase();
		var _g2 = 0;
		var _g11 = this.children;
		while(_g2 < _g11.length) {
			var child = _g11[_g2];
			++_g2;
			if(!child._cached) child.update(this);
			if(!child._hidden) child.render(this,this.ctx);
		}
		if(gryffin_fx_Animations.manager == this) gryffin_fx_Animations.tick();
	}
	,walk: function(childList,ignore) {
		if(childList == null) childList = this.children;
		var results = childList;
		var _g = 0;
		while(_g < childList.length) {
			var child = childList[_g];
			++_g;
			if(ignore != null && ignore(child)) continue;
			if(js_Boot.__instanceof(child,gryffin_core_EntityContainer)) {
				var container = child;
				results = results.concat(this.walk(container.getChildren()));
			}
		}
		return results;
	}
	,get: function(sel) {
		var _g = this;
		return new gryffin_core_Selection(new tannus_nore_CSelector(sel),function() {
			return _g.walk();
		});
	}
	,mouseEvent: function(e) {
		this.dispatch(e.type,e);
		var target = this.getEntityAtPoint(e.position);
		if(target != null && !(target.isHidden() || target.isCached() || target.destroyed)) target.dispatch(e.type,e);
	}
	,__init: function() {
		this.__events();
		gryffin_fx_Animations.claim(this);
	}
	,__events: function() {
		this.manager.frame.listen($bind(this,this.frame),false);
		this.manager.start();
	}
	,dispatch: function(name,data) {
		gryffin_core_EventDispatcher.prototype.dispatch.call(this,name,data);
		var value = new Date().getTime();
		this.eventTimes.set(name,value);
	}
	,get_width: function() {
		return this.canvas.width;
	}
	,set_width: function(v) {
		this.resize(v,this.canvas.height);
		return this.canvas.width;
	}
	,get_height: function() {
		return this.canvas.height;
	}
	,set_height: function(v) {
		this.resize(this.canvas.width,v);
		return this.canvas.height;
	}
	,get_rect: function() {
		return new tannus_geom_CRectangle(0,0,this.canvas.width,this.canvas.height);
	}
	,set_rect: function(v) {
		this.resize(Math.round(v.width),Math.round(v.height));
		return new tannus_geom_CRectangle(0,0,this.canvas.width,this.canvas.height);
	}
	,get_cursor: function() {
		return this.canvas.style.cursor;
	}
	,set_cursor: function(v) {
		return this.canvas.style.cursor = v;
	}
	,__class__: gryffin_core_Stage
	,__properties__: {set_cursor:"set_cursor",get_cursor:"get_cursor",set_rect:"set_rect",get_rect:"get_rect",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width"}
});
var gryffin_core_StageFiller = function() { };
$hxClasses["gryffin.core.StageFiller"] = gryffin_core_StageFiller;
gryffin_core_StageFiller.__name__ = ["gryffin","core","StageFiller"];
gryffin_core_StageFiller.sheet = function() {
	if(!gryffin_core_StageFiller.addedStyleSheet) {
		var sheet = new tannus_css_StyleSheet();
		var all = sheet.rule("*",{ 'margin' : 0, 'padding' : 0});
		var bodyAndHtml = sheet.rule("body, html",{ 'height' : "100%"});
		var canvas = sheet.rule("canvas",{ 'position' : "absolute", 'width' : "100%", 'height' : "100%"});
		var element = gryffin_core_StageFiller.sheetElement(sheet);
		window.document.getElementsByTagName("head").item(0).appendChild(element);
		gryffin_core_StageFiller.addedStyleSheet = true;
	}
};
gryffin_core_StageFiller.sheetElement = function(sheet) {
	var el;
	var _this = window.document;
	el = _this.createElement("style");
	el.type = "text/css";
	el.textContent = sheet.toString();
	return el;
};
var gryffin_display_Paintable = function() { };
$hxClasses["gryffin.display.Paintable"] = gryffin_display_Paintable;
gryffin_display_Paintable.__name__ = ["gryffin","display","Paintable"];
gryffin_display_Paintable.prototype = {
	__class__: gryffin_display_Paintable
};
var gryffin_display_Canvas = function(c) {
	var _g = this;
	if(c != null) this.canvas = c; else {
		var _this = window.document;
		this.canvas = _this.createElement("canvas");
	}
	this._ctx = new tannus_ds_CRef(function() {
		var c1 = _g.canvas.getContext("2d",null);
		return new gryffin_display_Context(c1);
	});
};
$hxClasses["gryffin.display.Canvas"] = gryffin_display_Canvas;
gryffin_display_Canvas.__name__ = ["gryffin","display","Canvas"];
gryffin_display_Canvas.__interfaces__ = [gryffin_display_Paintable];
gryffin_display_Canvas.create = function(w,h) {
	var can = new gryffin_display_Canvas();
	can.resize(w,h);
	return can;
};
gryffin_display_Canvas.prototype = {
	resize: function(w,h) {
		var _g = this;
		this.canvas.width = w;
		this.canvas.height = h;
		this._ctx = new tannus_ds_CRef(function() {
			var c = _g.canvas.getContext("2d",null);
			return new gryffin_display_Context(c);
		});
	}
	,paint: function(c,src,dest) {
		c.drawImage(this.canvas,src.x,src.y,src.width,src.height,dest.x,dest.y,dest.width,dest.height);
	}
	,dataURI: function(type) {
		return this.canvas.toDataURL(type);
	}
	,getImage: function(cb) {
		return gryffin_display_Image.load(this.dataURI(),cb);
	}
	,get_width: function() {
		return this.canvas.width;
	}
	,set_width: function(v) {
		this.resize(v,this.canvas.height);
		return this.canvas.width;
	}
	,get_height: function() {
		return this.canvas.height;
	}
	,set_height: function(v) {
		this.resize(this.canvas.width,v);
		return this.canvas.height;
	}
	,get_context: function() {
		return this._ctx.get();
	}
	,__class__: gryffin_display_Canvas
	,__properties__: {get_context:"get_context",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width"}
};
var gryffin_display_Context = function(ctx) {
	this.ctx = ctx;
	this.states = new tannus_ds_Stack();
	this.matrix = new tannus_geom_Matrix();
};
$hxClasses["gryffin.display.Context"] = gryffin_display_Context;
gryffin_display_Context.__name__ = ["gryffin","display","Context"];
gryffin_display_Context.prototype = {
	erase: function() {
		this.ctx.clearRect(0,0,this.get_width(),this.get_height());
	}
	,paint: function(comp,src,dest) {
		comp.paint(new gryffin_display_Context(this.ctx),src,dest);
	}
	,drawComponent: function(comp,sx,sy,sw,sh,dx,dy,dw,dh) {
		var src = new tannus_geom_CRectangle(sx,sy,sw,sh);
		var dest = new tannus_geom_CRectangle(dx,dy,dw,dh);
		comp.paint(new gryffin_display_Context(this.ctx),src,dest);
	}
	,drawVertices: function(vertices) {
		gryffin_display_CtxTools.drawVertices(new gryffin_display_Context(this.ctx),vertices);
	}
	,applyMatrix: function(m) {
		if(m.a == 1 && m.b == 0 && m.c == 0 && m.d == 1) this.ctx.translate(m.tx,m.ty); else this.ctx.setTransform(m.a,m.b,m.c,m.d,m.tx,m.ty);
	}
	,obtainMatrix: function() {
		return this.matrix.clone();
	}
	,save: function() {
		this.ctx.save();
		this.states.add(gryffin_display__$Context_State.create(this));
	}
	,restore: function() {
		this.ctx.restore();
		if(!this.states.get_empty()) this.states.pop().apply(this);
	}
	,scale: function(x,y) {
		this.ctx.scale(x,y);
		this.matrix.scale(x,y);
	}
	,rotate: function(angle) {
		this.ctx.rotate(angle);
		this.matrix.rotate(angle);
	}
	,translate: function(x,y) {
		this.ctx.translate(x,y);
		this.matrix.translate(x,y);
	}
	,transform: function(a,b,c,d,e,f) {
		this.ctx.transform(a,b,c,d,e,f);
	}
	,setTransform: function(a,b,c,d,e,f) {
		this.ctx.setTransform(a,b,c,d,e,f);
		this.matrix.a = a;
		this.matrix.b = b;
		this.matrix.c = c;
		this.matrix.d = d;
		this.matrix.tx = e;
		this.matrix.ty = f;
	}
	,resetTransform: function() {
		this.ctx.resetTransform();
		this.matrix.identity();
	}
	,createLinearGradient: function(x0,y0,x1,y1) {
		return this.ctx.createLinearGradient(x0,y0,x1,y1);
	}
	,createRadialGradient: function(x0,y0,r0,x1,y1,r1) {
		return this.ctx.createRadialGradient(x0,y0,r0,x1,y1,r1);
	}
	,clearRect: function(x,y,w,h) {
		this.ctx.clearRect(x,y,w,h);
	}
	,fillRect: function(x,y,w,h) {
		this.ctx.fillRect(x,y,w,h);
	}
	,strokeRect: function(x,y,w,h) {
		this.ctx.strokeRect(x,y,w,h);
	}
	,beginPath: function() {
		this.ctx.beginPath();
	}
	,fill: function() {
		this.ctx.fill();
	}
	,stroke: function() {
		this.ctx.stroke();
	}
	,drawFocusIfNeeded: function(element) {
		this.ctx.drawFocusIfNeeded(element);
	}
	,drawCustomFocusRing: function(element) {
		return this.ctx.drawCustomFocusRing(element);
	}
	,clip: function() {
		this.ctx.clip();
	}
	,isPointInPath: function(path,x,y,winding) {
		return this.ctx.isPointInPath(path,x,y,winding);
	}
	,isPointInStroke: function(path,x,y) {
		return this.ctx.isPointInStroke(path,x,y);
	}
	,fillText: function(text,x,y,maxWidth) {
		if(maxWidth != null) this.ctx.fillText(text,x,y,maxWidth); else this.ctx.fillText(text,x,y);
	}
	,strokeText: function(text,x,y,maxWidth) {
		if(maxWidth != null) this.ctx.strokeText(text,x,y,maxWidth); else this.ctx.strokeText(text,x,y);
	}
	,measureText: function(text) {
		return gryffin_display_CtxTools.patchedMeasureText(this.ctx,text);
	}
	,drawImage: function(image,sx,sy,sw,sh,dx,dy,dw,dh) {
		this.ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh);
	}
	,addHitRegion: function(options) {
		this.ctx.addHitRegion(options);
	}
	,removeHitRegion: function(id) {
		this.ctx.removeHitRegion(id);
	}
	,clearHitRegions: function() {
		this.ctx.clearHitRegions();
	}
	,createImageData: function(imagedata) {
		return this.ctx.createImageData(imagedata);
	}
	,getImageData: function(sx,sy,sw,sh) {
		return this.ctx.getImageData(sx,sy,sw,sh);
	}
	,pixels: function(x,y,w,h) {
		var idata = this.getImageData(x,y,w,h);
		var pos = new tannus_geom_TPoint(x,y,0);
		return new gryffin_display_Pixels(this,pos,idata);
	}
	,putImageData: function(imagedata,dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight) {
		this.ctx.putImageData(imagedata,dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight);
	}
	,setLineDash: function(segments) {
		this.ctx.setLineDash(segments);
	}
	,getLineDash: function() {
		return this.ctx.getLineDash();
	}
	,closePath: function() {
		this.ctx.closePath();
	}
	,moveTo: function(x,y) {
		this.ctx.moveTo(x,y);
	}
	,lineTo: function(x,y) {
		this.ctx.lineTo(x,y);
	}
	,quadraticCurveTo: function(cpx,cpy,x,y) {
		this.ctx.quadraticCurveTo(cpx,cpy,x,y);
	}
	,bezierCurveTo: function(cp1x,cp1y,cp2x,cp2y,x,y) {
		this.ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
	}
	,arcTo: function(x1,y1,x2,y2,radius) {
		this.ctx.arcTo(x1,y1,x2,y2,radius);
	}
	,rect: function(x,y,w,h) {
		this.ctx.rect(x,y,w,h);
	}
	,roundRect: function(x,y,w,h,r) {
		this.ctx.moveTo(x + r,y);
		this.ctx.lineTo(x + w - r,y);
		this.ctx.quadraticCurveTo(x + w,y,x + w,y + r);
		this.ctx.lineTo(x + w,y + h - r);
		this.ctx.quadraticCurveTo(x + w,y + h,x + w - r,y + h);
		this.ctx.lineTo(x + r,y + h);
		this.ctx.quadraticCurveTo(x,y + h,x,y + h - r);
		this.ctx.lineTo(x,y + r);
		this.ctx.quadraticCurveTo(x,y,x + r,y);
	}
	,arc: function(x,y,radius,startAngle,endAngle,anticlockwise) {
		this.ctx.arc(x,y,radius,startAngle,endAngle,anticlockwise);
	}
	,get_canvas: function() {
		return this.ctx.canvas;
	}
	,get_globalAlpha: function() {
		return this.ctx.globalAlpha;
	}
	,set_globalAlpha: function(v) {
		return this.ctx.globalAlpha = v;
	}
	,get_globalCompositeOperation: function() {
		return this.ctx.globalCompositeOperation;
	}
	,set_globalCompositeOperation: function(v) {
		return this.ctx.globalCompositeOperation = v;
	}
	,get_strokeStyle: function() {
		return this.ctx.strokeStyle;
	}
	,set_strokeStyle: function(v) {
		return this.ctx.strokeStyle = v;
	}
	,get_fillStyle: function() {
		return this.ctx.fillStyle;
	}
	,set_fillStyle: function(v) {
		return this.ctx.fillStyle = v;
	}
	,get_shadowOffsetX: function() {
		return this.ctx.shadowOffsetX;
	}
	,set_shadowOffsetX: function(v) {
		return this.ctx.shadowOffsetX = v;
	}
	,get_shadowOffsetY: function() {
		return this.ctx.shadowOffsetY;
	}
	,set_shadowOffsetY: function(v) {
		return this.ctx.shadowOffsetY = v;
	}
	,get_shadowBlur: function() {
		return this.ctx.shadowBlur;
	}
	,set_shadowBlur: function(v) {
		return this.ctx.shadowBlur = v;
	}
	,get_shadowColor: function() {
		return this.ctx.shadowColor;
	}
	,set_shadowColor: function(v) {
		return this.ctx.shadowColor = v;
	}
	,get_filter: function() {
		return this.ctx.filter;
	}
	,set_filter: function(v) {
		return this.ctx.filter = v;
	}
	,get_imageSmoothingEnabled: function() {
		return this.ctx.imageSmoothingEnabled;
	}
	,set_imageSmoothingEnabled: function(v) {
		return this.ctx.imageSmoothingEnabled = v;
	}
	,get_lineWidth: function() {
		return this.ctx.lineWidth;
	}
	,set_lineWidth: function(v) {
		return this.ctx.lineWidth = v;
	}
	,get_lineCap: function() {
		return this.ctx.lineCap;
	}
	,set_lineCap: function(v) {
		return this.ctx.lineCap = v;
	}
	,get_lineJoin: function() {
		return this.ctx.lineJoin;
	}
	,set_lineJoin: function(v) {
		return this.ctx.lineJoin = v;
	}
	,get_miterLimit: function() {
		return this.ctx.miterLimit;
	}
	,set_miterLimit: function(v) {
		return this.ctx.miterLimit = v;
	}
	,get_lineDashOffset: function() {
		return this.ctx.lineDashOffset;
	}
	,set_lineDashOffset: function(v) {
		return this.ctx.lineDashOffset = v;
	}
	,get_font: function() {
		return this.ctx.font;
	}
	,set_font: function(v) {
		return this.ctx.font = v;
	}
	,get_textAlign: function() {
		return this.ctx.textAlign;
	}
	,set_textAlign: function(v) {
		return this.ctx.textAlign = v;
	}
	,get_textBaseline: function() {
		return this.ctx.textBaseline;
	}
	,set_textBaseline: function(v) {
		return this.ctx.textBaseline = v;
	}
	,get_width: function() {
		return this.get_canvas().width;
	}
	,get_height: function() {
		return this.get_canvas().height;
	}
	,__class__: gryffin_display_Context
	,__properties__: {get_height:"get_height",get_width:"get_width",set_textBaseline:"set_textBaseline",get_textBaseline:"get_textBaseline",set_textAlign:"set_textAlign",get_textAlign:"get_textAlign",set_font:"set_font",get_font:"get_font",set_lineDashOffset:"set_lineDashOffset",get_lineDashOffset:"get_lineDashOffset",set_miterLimit:"set_miterLimit",get_miterLimit:"get_miterLimit",set_lineJoin:"set_lineJoin",get_lineJoin:"get_lineJoin",set_lineCap:"set_lineCap",get_lineCap:"get_lineCap",set_lineWidth:"set_lineWidth",get_lineWidth:"get_lineWidth",set_imageSmoothingEnabled:"set_imageSmoothingEnabled",get_imageSmoothingEnabled:"get_imageSmoothingEnabled",set_filter:"set_filter",get_filter:"get_filter",set_shadowColor:"set_shadowColor",get_shadowColor:"get_shadowColor",set_shadowBlur:"set_shadowBlur",get_shadowBlur:"get_shadowBlur",set_shadowOffsetY:"set_shadowOffsetY",get_shadowOffsetY:"get_shadowOffsetY",set_shadowOffsetX:"set_shadowOffsetX",get_shadowOffsetX:"get_shadowOffsetX",set_fillStyle:"set_fillStyle",get_fillStyle:"get_fillStyle",set_strokeStyle:"set_strokeStyle",get_strokeStyle:"get_strokeStyle",set_globalCompositeOperation:"set_globalCompositeOperation",get_globalCompositeOperation:"get_globalCompositeOperation",set_globalAlpha:"set_globalAlpha",get_globalAlpha:"get_globalAlpha",get_canvas:"get_canvas"}
};
var gryffin_display__$Context_State = function() {
	this.matrix = new tannus_geom_Matrix();
};
$hxClasses["gryffin.display._Context.State"] = gryffin_display__$Context_State;
gryffin_display__$Context_State.__name__ = ["gryffin","display","_Context","State"];
gryffin_display__$Context_State.create = function(c) {
	var s = new gryffin_display__$Context_State();
	s.matrix = c.obtainMatrix();
	return s;
};
gryffin_display__$Context_State.prototype = {
	apply: function(c) {
		c.applyMatrix(this.matrix);
	}
	,__class__: gryffin_display__$Context_State
};
var gryffin_display__$Ctx_Ctx_$Impl_$ = {};
$hxClasses["gryffin.display._Ctx.Ctx_Impl_"] = gryffin_display__$Ctx_Ctx_$Impl_$;
gryffin_display__$Ctx_Ctx_$Impl_$.__name__ = ["gryffin","display","_Ctx","Ctx_Impl_"];
gryffin_display__$Ctx_Ctx_$Impl_$._new = function(c) {
	return new gryffin_display_Context(c);
};
gryffin_display__$Ctx_Ctx_$Impl_$.fromC2d = function(c) {
	return new gryffin_display_Context(c);
};
var gryffin_display_CtxTools = function() { };
$hxClasses["gryffin.display.CtxTools"] = gryffin_display_CtxTools;
gryffin_display_CtxTools.__name__ = ["gryffin","display","CtxTools"];
gryffin_display_CtxTools.patchedMeasureText = function(c,txt) {
	var font = c.font;
	var w = c.measureText(txt).width;
	var th = gryffin_display_CtxTools.getTextHeight(font);
	return { 'width' : w, 'height' : th.height, 'ascent' : th.ascent, 'descent' : th.descent};
};
gryffin_display_CtxTools.getTextHeight = function(font) {
	var doc = window.document;
	var span = doc.createElement("span");
	span.style.font = font;
	span.textContent = "Hg";
	var block = doc.createElement("div");
	block.style.display = "inline-block";
	block.style.width = "1px";
	block.style.height = "0px";
	var div = doc.createElement("div");
	div.appendChild(span);
	div.appendChild(block);
	var body = doc.body;
	body.appendChild(div);
	var result = { 'ascent' : 0.0, 'descent' : 0.0, 'height' : 0.0};
	try {
		var bo = (function(f,e) {
			return function() {
				return f(e);
			};
		})(gryffin_display_CtxTools.offset,block);
		var so = (function(f1,e1) {
			return function() {
				return f1(e1);
			};
		})(gryffin_display_CtxTools.offset,span);
		var align = new tannus_io__$Pointer_Ref(function() {
			return block.style.verticalAlign;
		},function(v) {
			return block.style.verticalAlign = v;
		});
		align.set("baseline");
		result.ascent = bo().top - so().top;
		align.set("bottom");
		result.height = bo().top - so().top;
		result.descent = result.height - result.ascent;
		div.remove();
		return result;
	} catch( err ) {
		if (err instanceof js__$Boot_HaxeError) err = err.val;
		console.log(err);
		div.remove();
	}
	return result;
};
gryffin_display_CtxTools.offset = function(e) {
	try {
		var rect = e.getBoundingClientRect();
		var win = window;
		var doc = win.document.documentElement;
		return { 'top' : rect.top + win.pageYOffset - doc.clientTop, 'left' : rect.left + win.pageXOffset - doc.clientLeft};
	} catch( error ) {
		if (error instanceof js__$Boot_HaxeError) error = error.val;
		console.log(error);
		return { 'top' : 0, 'left' : 0};
	}
};
gryffin_display_CtxTools.drawVertices = function(c,vertices) {
	var points;
	{
		var _g = [];
		var $it0 = vertices.iterator();
		while( $it0.hasNext() ) {
			var p = $it0.next();
			_g.push(p.clone());
		}
		points = _g;
	}
	var first = points.shift();
	c.moveTo(first.get_x(),first.get_y());
	var _g1 = 0;
	while(_g1 < points.length) {
		var p1 = points[_g1];
		++_g1;
		c.lineTo(p1.get_x(),p1.get_y());
	}
	c.lineTo(first.get_x(),first.get_y());
};
gryffin_display_CtxTools.applyMatrix = function(c,m) {
	if(m.a == 1 && m.b == 0 && m.c == 0 && m.d == 1) c.translate(m.tx,m.ty); else c.setTransform(m.a,m.b,m.c,m.d,m.tx,m.ty);
};
gryffin_display_CtxTools.obtainMatrix = function(c) {
	return new tannus_geom_Matrix();
};
var gryffin_display_Image = function(i) {
	if(i != null) this.img = i; else this.img = (function($this) {
		var $r;
		var _this = window.document;
		$r = _this.createElement("img");
		return $r;
	}(this));
	this.ready = new tannus_io_VoidSignal();
	this.targetWidth = this.targetHeight = 0;
	this.__init();
};
$hxClasses["gryffin.display.Image"] = gryffin_display_Image;
gryffin_display_Image.__name__ = ["gryffin","display","Image"];
gryffin_display_Image.__interfaces__ = [gryffin_display_Paintable];
gryffin_display_Image.load = function(src,cb) {
	if(!gryffin_display_Image.registry.exists(src)) {
		var img = new gryffin_display_Image();
		img.img.src = src;
		if(cb != null) img.ready.once((function(f,a1) {
			return function() {
				f(a1);
			};
		})(cb,img));
		{
			gryffin_display_Image.registry.set(src,img);
			img;
		}
		return img;
	} else {
		var img1 = gryffin_display_Image.registry.get(src);
		if(cb != null) (img1.img.complete?gryffin_Tools.defer:($_=img1.ready,$bind($_,$_.once)))((function(f1,a11) {
			return function() {
				f1(a11);
			};
		})(cb,img1));
		return img1;
	}
};
gryffin_display_Image.prototype = {
	__init: function() {
		this.img.onload = (function(f1,f) {
			return function() {
				f1(f);
			};
		})(gryffin_Tools.defer,($_=this.ready,$bind($_,$_.fire)));
		this.img.onerror = function(err) {
			window.console.error(err);
		};
		if(this.img.complete) gryffin_Tools.defer(($_=this.ready,$bind($_,$_.fire)));
	}
	,toCanvas: function() {
		var _g = this;
		var can = gryffin_display_Canvas.create(this.targetWidth,this.targetHeight);
		var c = can._ctx.get();
		if(this.img.complete) {
			can.resize(this.img.naturalWidth,this.img.naturalHeight);
			c = can._ctx.get();
			c.drawComponent(this,0,0,this.img.naturalWidth,this.img.naturalHeight,0,0,this.img.naturalWidth,this.img.naturalHeight);
			console.log("Image already loaded");
		} else {
			console.log("Image not loaded");
			c.save();
			c.set_fillStyle("#000000");
			c.fillRect(0,0,this.targetWidth,this.targetHeight);
			c.restore();
			this.ready.once(function() {
				console.log("Image now loaded");
				console.log([_g.img.naturalWidth,_g.img.naturalHeight]);
				can.resize(_g.img.naturalWidth,_g.img.naturalHeight);
				c = can._ctx.get();
				c.drawComponent(_g,0,0,_g.img.naturalWidth,_g.img.naturalHeight,0,0,_g.img.naturalWidth,_g.img.naturalHeight);
			});
		}
		return can;
	}
	,paint: function(c,s,d) {
		c.drawImage(this.img,s.x,s.y,s.width,s.height,d.x,d.y,d.width,d.height);
	}
	,get_src: function() {
		return this.img.src;
	}
	,set_src: function(v) {
		return this.img.src = v;
	}
	,get_width: function() {
		return this.img.naturalWidth;
	}
	,get_height: function() {
		return this.img.naturalHeight;
	}
	,get_rect: function() {
		return new tannus_geom_CRectangle(0,0,this.img.naturalWidth,this.img.naturalHeight);
	}
	,get_complete: function() {
		return this.img.complete;
	}
	,__class__: gryffin_display_Image
	,__properties__: {get_complete:"get_complete",get_rect:"get_rect",get_height:"get_height",get_width:"get_width",set_src:"set_src",get_src:"get_src"}
};
var gryffin_display_Pixels = function(owner,position,dat) {
	this.c = owner;
	this.idata = dat;
	this.data = this.idata.data;
	this.pos = position;
};
$hxClasses["gryffin.display.Pixels"] = gryffin_display_Pixels;
gryffin_display_Pixels.__name__ = ["gryffin","display","Pixels"];
gryffin_display_Pixels.prototype = {
	get: function(xi,y) {
		if(y == null) return this.getAtIndex(xi | 0); else return this.getAtIndex((xi | 0) + (y | 0) * this.idata.width);
	}
	,getAtPos: function(x,y) {
		return this.getAtIndex((x | 0) + (y | 0) * this.idata.width);
	}
	,getAtIndex: function(i) {
		i *= 4;
		var col = new tannus_graphics__$Color_TColor(this.data[i],this.data[i + 1],this.data[i + 2],this.data[i + 3]);
		return col;
	}
	,setAtIndex: function(i,color) {
		i *= 4;
		this.data[i] = color._red;
		this.data[i + 1] = color._green;
		this.data[i + 2] = color._blue;
		if(color._alpha != null) this.data[i + 3] = color._alpha; else this.data[i + 3] = 0;
		return color;
	}
	,setAtPos: function(x,y,color) {
		return this.setAtIndex((x | 0) + (y | 0) * this.idata.width,color);
	}
	,set: function(x,y,color) {
		return this.setAtIndex((x | 0) + (y | 0) * this.idata.width,color);
	}
	,index: function(x,y) {
		return (x | 0) + (y | 0) * this.idata.width;
	}
	,write: function(target,x,y,sx,sy,sw,sh) {
		if(sy == null) sy = 0;
		if(sx == null) sx = 0;
		target.putImageData(this.idata,x,y,sx,sy,sw != null?sw:this.idata.width,sh != null?sh:this.idata.height);
	}
	,save: function() {
		this.write(this.c,this.pos.get_x(),this.pos.get_y());
	}
	,get_width: function() {
		return this.idata.width;
	}
	,get_height: function() {
		return this.idata.height;
	}
	,get_length: function() {
		return this.data.length / 4 | 0;
	}
	,__class__: gryffin_display_Pixels
	,__properties__: {get_length:"get_length",get_height:"get_height",get_width:"get_width"}
};
var gryffin_display_TextBox = function() {
	this.txt = "";
	this.multiline = false;
	this.stateChanged = true;
	this.canvas = new gryffin_display_Canvas();
	this.set_padding(0);
	this.set_fontFamily("Arial");
	this.set_fontSize(12);
	this._color = new tannus_graphics__$Color_TColor(0,0,0,null);
	this._backgroundColor = null;
	this._align = "start";
	this._bold = false;
	this._italic = false;
};
$hxClasses["gryffin.display.TextBox"] = gryffin_display_TextBox;
gryffin_display_TextBox.__name__ = ["gryffin","display","TextBox"];
gryffin_display_TextBox.__interfaces__ = [gryffin_display_Paintable];
gryffin_display_TextBox.prototype = {
	paint: function(c,s,d) {
		c.paint(this.toCanvas(),s,d);
	}
	,getMetrics: function(s) {
		this.applyStyles(this.canvas._ctx.get());
		return this.canvas._ctx.get().measureText(s);
	}
	,autoScale: function(mw,mh) {
		if(mw == null && mh == null) return; else {
			this.set_fontSize(1);
			while(true) {
				this.measure();
				if(mw != null && this.get_width() > mw) break;
				if(mh != null && this.get_height() > mh) break;
				var _g = this;
				_g.set_fontSize(_g.get_fontSize() + 1);
			}
			var _g1 = this;
			_g1.set_fontSize(_g1.get_fontSize() - 1);
		}
	}
	,fit: function(w,h) {
		if(w == null && h == null) return; else while(true) {
			this.measure();
			if(w != null && this.get_width() > w) {
				var _g = this;
				var _g1 = _g.get_fontSize();
				_g.set_fontSize(_g1 - 1);
				_g1;
			} else if(h != null && this.get_height() > h) {
				var _g2 = this;
				var _g11 = _g2.get_fontSize();
				_g2.set_fontSize(_g11 - 1);
				_g11;
			} else break;
		}
	}
	,toCanvas: function() {
		if(this.stateChanged) {
			this.stateChanged = false;
			if(this.multiline) {
				this.measure();
				this.canvas.resize(Math.round(this.get_textWidth() + this.get_padding() * 2),Math.round(this.get_textHeight() + this.get_padding() * 2));
				var c = this.canvas._ctx.get();
				if(this.get_backgroundColor() != null) {
					c.set_fillStyle((function($this) {
						var $r;
						var this1 = $this.get_backgroundColor();
						$r = this1.toString();
						return $r;
					}(this)));
					c.fillRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height);
				}
				this.applyStyles(this.canvas._ctx.get());
				var p;
				var x = this.get_padding();
				var y = this.get_padding();
				p = new tannus_geom_TPoint(x,y,0);
				var _g = 0;
				var _g1 = this.lines();
				while(_g < _g1.length) {
					var line = _g1[_g];
					++_g;
					c.fillText(line.text,p.get_x(),p.get_y());
					var ny = p.get_y() + line.height;
					p.set_y(ny);
				}
			} else {
				this.measure();
				this.canvas.resize(Math.round(this.get_textWidth() + this.get_padding() * 2),Math.round(this.get_textHeight() + this.get_padding() * 2));
				var c1 = this.canvas._ctx.get();
				if(this.get_backgroundColor() != null) {
					c1.set_fillStyle((function($this) {
						var $r;
						var this2 = $this.get_backgroundColor();
						$r = this2.toString();
						return $r;
					}(this)));
					c1.fillRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height);
				}
				this.applyStyles(this.canvas._ctx.get());
				this.canvas._ctx.get().fillText(this.get_text(),this.get_padding(),this.get_padding());
			}
		}
		return this.canvas;
	}
	,applyStyles: function(c) {
		c.set_font(this.fontString());
		c.set_textAlign(this.get_align());
		c.set_fillStyle((function($this) {
			var $r;
			var this1 = $this.get_color();
			$r = this1.toString();
			return $r;
		}(this)));
		c.set_textBaseline("top");
	}
	,fontString: function() {
		var bits = [];
		if(this.get_bold()) bits.push("bold");
		if(this.get_italic()) bits.push("italic");
		bits.push("" + this.get_fontSize() + "pt");
		bits.push(this.get_fontFamily());
		return bits.join(" ");
	}
	,measure: function() {
		if(this.multiline) {
			this._textWidth = 0;
			this._textHeight = 0;
			var _g = 0;
			var _g1 = this.lines();
			while(_g < _g1.length) {
				var l = _g1[_g];
				++_g;
				this._textWidth = Math.max(this._textWidth,l.width);
				this._textHeight += l.height;
			}
		} else {
			this.applyStyles(this.canvas._ctx.get());
			var size = this.canvas._ctx.get().measureText(this.get_text());
			this._textWidth = size.width;
			this._textHeight = size.height;
		}
	}
	,lines: function() {
		this.multiline = false;
		var slines = this.get_text().split("\n");
		var lines = [];
		var _g = 0;
		while(_g < slines.length) {
			var s = slines[_g];
			++_g;
			var m = this.getMetrics(s);
			lines.push({ 'text' : s, 'width' : m.width, 'height' : m.height});
		}
		this.multiline = true;
		return lines;
	}
	,get_text: function() {
		return this.txt;
	}
	,set_text: function(v) {
		if(v != this.txt) this.stateChanged = true;
		return this.txt = v;
	}
	,get_padding: function() {
		return this._padding;
	}
	,set_padding: function(v) {
		if(v != this._padding) this.stateChanged = true;
		return this._padding = v;
	}
	,get_fontFamily: function() {
		return this._fontFamily;
	}
	,set_fontFamily: function(v) {
		if(v != this._fontFamily) this.stateChanged = true;
		if(tannus_ds_StringUtils.has(v," ")) v = tannus_ds_StringUtils.wrap(v,"\"");
		return this._fontFamily = v;
	}
	,get_fontSize: function() {
		return this._fontSize;
	}
	,set_fontSize: function(v) {
		if(v != this._fontSize) this.stateChanged = true;
		return this._fontSize = v;
	}
	,get_textWidth: function() {
		if(this.stateChanged) this.measure();
		return this._textWidth;
	}
	,get_textHeight: function() {
		if(this.stateChanged) this.measure();
		return this._textHeight;
	}
	,get_width: function() {
		return this.get_padding() * 2 + this.get_textWidth();
	}
	,get_height: function() {
		return this.get_padding() * 2 + this.get_textHeight();
	}
	,get_color: function() {
		return this._color;
	}
	,set_color: function(v) {
		if(v != this._color) this.stateChanged = true;
		return this._color = v;
	}
	,get_backgroundColor: function() {
		return this._backgroundColor;
	}
	,set_backgroundColor: function(v) {
		if(v != this._backgroundColor) this.stateChanged = true;
		return this._backgroundColor = v;
	}
	,get_align: function() {
		return this._align;
	}
	,set_align: function(v) {
		if(v != this._align) this.stateChanged = true;
		return this._align = v;
	}
	,get_bold: function() {
		return this._bold;
	}
	,set_bold: function(v) {
		if(v != this._bold) this.stateChanged = true;
		return this._bold = v;
	}
	,get_italic: function() {
		return this._italic;
	}
	,set_italic: function(v) {
		if(v != this._italic) this.stateChanged = true;
		return this._italic = v;
	}
	,__class__: gryffin_display_TextBox
	,__properties__: {set_italic:"set_italic",get_italic:"get_italic",set_bold:"set_bold",get_bold:"get_bold",set_align:"set_align",get_align:"get_align",set_backgroundColor:"set_backgroundColor",get_backgroundColor:"get_backgroundColor",set_color:"set_color",get_color:"get_color",get_height:"get_height",get_width:"get_width",get_textHeight:"get_textHeight",get_textWidth:"get_textWidth",set_fontSize:"set_fontSize",get_fontSize:"get_fontSize",set_fontFamily:"set_fontFamily",get_fontFamily:"get_fontFamily",set_padding:"set_padding",get_padding:"get_padding",set_text:"set_text",get_text:"get_text"}
};
var gryffin_events_FrameManager = function() {
	this.frame = new tannus_io_Signal();
};
$hxClasses["gryffin.events.FrameManager"] = gryffin_events_FrameManager;
gryffin_events_FrameManager.__name__ = ["gryffin","events","FrameManager"];
gryffin_events_FrameManager.prototype = {
	_frame: function(delta) {
		this.frame.broadcast(delta);
		this.queueNext();
	}
	,queueNext: function() {
		this.id = window.requestAnimationFrame($bind(this,this._frame));
	}
	,start: function() {
		this.queueNext();
	}
	,stop: function() {
		window.cancelAnimationFrame(this.id);
	}
	,__class__: gryffin_events_FrameManager
};
var tannus_events_EventCreator = function() { };
$hxClasses["tannus.events.EventCreator"] = tannus_events_EventCreator;
tannus_events_EventCreator.__name__ = ["tannus","events","EventCreator"];
var gryffin_events_KeyListener = function(s) {
	this.stage = s;
	this.listen();
};
$hxClasses["gryffin.events.KeyListener"] = gryffin_events_KeyListener;
gryffin_events_KeyListener.__name__ = ["gryffin","events","KeyListener"];
gryffin_events_KeyListener.__interfaces__ = [tannus_events_EventCreator];
gryffin_events_KeyListener.prototype = {
	listen: function() {
		var win = window;
		var events = ["keydown","keyup","keypress"];
		var _g = 0;
		while(_g < events.length) {
			var name = events[_g];
			++_g;
			win.addEventListener(name,$bind(this,this.handle));
		}
	}
	,collectMods: function(e) {
		var mods = [];
		if(e.altKey) mods.push("alt");
		if(e.shiftKey) mods.push("shift");
		if(e.ctrlKey) mods.push("ctrl");
		if(e.metaKey) mods.push("super");
		return mods;
	}
	,handle: function(e) {
		var event = new tannus_events_KeyboardEvent(e.type,e.keyCode,this.collectMods(e));
		event.onDefaultPrevented.once($bind(e,e.preventDefault));
		event.onPropogationStopped.once($bind(e,e.stopPropagation));
		this.stage.dispatch(e.type,event);
	}
	,__class__: gryffin_events_KeyListener
};
var gryffin_events_MouseListener = function(s) {
	this.stage = s;
	this.canvas = this.stage.canvas;
	this.bind();
};
$hxClasses["gryffin.events.MouseListener"] = gryffin_events_MouseListener;
gryffin_events_MouseListener.__name__ = ["gryffin","events","MouseListener"];
gryffin_events_MouseListener.__interfaces__ = [tannus_events_EventCreator];
gryffin_events_MouseListener.prototype = {
	bindMouse: function() {
		var _g = this;
		var relevant = ["click","mouseup","mousedown","mouseenter","mouseleave"];
		var _g1 = 0;
		while(_g1 < relevant.length) {
			var name = relevant[_g1];
			++_g1;
			this.canvas.addEventListener(name,$bind(this,this.handle));
		}
		this.canvas.addEventListener("mousemove",$bind(this,this.handleMove));
		this.canvas.addEventListener("contextmenu",function(e) {
			var event = new tannus_events_MouseEvent(e.type,_g.findPos(e),e.button,_g.findMods(e));
			var prevent = function() {
				e.preventDefault();
			};
			event.onCancelled.once(prevent);
			event.onDefaultPrevented.once(prevent);
			event.onPropogationStopped.once(prevent);
			_g.stage.mouseEvent(event);
		});
	}
	,bindWheel: function() {
		this.canvas.addEventListener("mousewheel",$bind(this,this.handleWheel));
	}
	,bind: function() {
		this.bindMouse();
		this.bindWheel();
	}
	,findPos: function(e) {
		var pos = new tannus_geom_TPoint(e.clientX,e.clientY,0);
		var crect = this.canvas.getBoundingClientRect();
		var nx = pos.get_x() - crect.left;
		pos.set_x(nx);
		var ny = pos.get_y() - crect.top;
		pos.set_y(ny);
		return pos;
	}
	,findMods: function(e) {
		var mods = [];
		if(e.altKey) mods.push("alt");
		if(e.ctrlKey) mods.push("ctrl");
		if(e.shiftKey) mods.push("shift");
		if(e.metaKey) mods.push("super");
		return mods;
	}
	,handle: function(e) {
		var pos = this.findPos(e);
		var mods = this.findMods(e);
		var event = new tannus_events_MouseEvent(e.type,pos,e.button,mods);
		event.onDefaultPrevented.once($bind(e,e.preventDefault));
		event.onPropogationStopped.once($bind(e,e.stopPropagation));
		this.stage.mouseEvent(event);
	}
	,handleMove: function() {
		var _g = this;
		var lastTarget = null;
		var _handle = function(e) {
			var pos = _g.findPos(e);
			var mods = _g.findMods(e);
			var event = new tannus_events_MouseEvent(e.type,pos,e.button,mods);
			event.onDefaultPrevented.once($bind(e,e.preventDefault));
			event.onPropogationStopped.once($bind(e,e.stopPropagation));
			var target = _g.getRootTarget(event);
			{
				var left = lastTarget;
				var left1 = lastTarget;
				if(lastTarget == null) {
					var entered = target;
					if(entered != null) entered.dispatch("mouseenter",e); else {
						var right = target;
						if(target == null) {
							if(left != null) left.dispatch("mouseleave",e); else if(left1 != null && right != null) {
								if(left1 == right) left1.dispatch("mousemove",e); else {
									left1.dispatch("mouseleave",e);
									right.dispatch("mouseenter",e);
								}
							}
						} else switch(target) {
						default:
							if(left1 != null && right != null) {
								if(left1 == right) left1.dispatch("mousemove",e); else {
									left1.dispatch("mouseleave",e);
									right.dispatch("mouseenter",e);
								}
							}
						}
					}
				} else switch(lastTarget) {
				default:
					var right = target;
					if(target == null) {
						if(left != null) left.dispatch("mouseleave",e); else if(left1 != null && right != null) {
							if(left1 == right) left1.dispatch("mousemove",e); else {
								left1.dispatch("mouseleave",e);
								right.dispatch("mouseenter",e);
							}
						}
					} else switch(target) {
					default:
						if(left1 != null && right != null) {
							if(left1 == right) left1.dispatch("mousemove",e); else {
								left1.dispatch("mouseleave",e);
								right.dispatch("mouseenter",e);
							}
						}
					}
				}
			}
			lastTarget = target;
			_g.stage.mouseEvent(event);
		};
		this.canvas.addEventListener("mousemove",_handle);
	}
	,getRootTarget: function(e) {
		var _g = 0;
		var _g1 = this.stage.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.containsPoint(e.position) && !(child._cached || child.destroyed)) return child;
		}
		return null;
	}
	,handleWheel: function(e) {
		var delta = Std["int"](Math.max(-1,Math.min(1,-e.deltaY)));
		var event = new tannus_events_ScrollEvent(delta);
		this.stage.dispatch("scroll",event);
	}
	,__class__: gryffin_events_MouseListener
};
var gryffin_events_MouseWatcher = function(s) {
	this.stage = s;
	this.lastMousePos = null;
	this.lastMove = -1;
	this._listen();
};
$hxClasses["gryffin.events.MouseWatcher"] = gryffin_events_MouseWatcher;
gryffin_events_MouseWatcher.__name__ = ["gryffin","events","MouseWatcher"];
gryffin_events_MouseWatcher.prototype = {
	getMousePosition: function() {
		if(this.lastMousePos == null) return null; else return this.lastMousePos.clone();
	}
	,getMoveTime: function() {
		if(this.lastMove != -1) return this.lastMove; else return null;
	}
	,_listen: function() {
		this.stage.on("mousemove",$bind(this,this.onmove));
		this.stage.on("mouseleave",$bind(this,this.onleave));
	}
	,onmove: function(e) {
		this.lastMousePos = e.position;
		this.lastMove = e.date;
	}
	,onleave: function(e) {
		this.lastMousePos = null;
	}
	,__class__: gryffin_events_MouseWatcher
};
var gryffin_fx_Actuator = function() {
};
$hxClasses["gryffin.fx.Actuator"] = gryffin_fx_Actuator;
gryffin_fx_Actuator.__name__ = ["gryffin","fx","Actuator"];
gryffin_fx_Actuator.prototype = {
	update: function(progress) {
		console.log("animation is " + ("" + progress + "%") + " complete");
	}
	,reverse: function() {
		return new gryffin_fx_Actuator();
	}
	,__class__: gryffin_fx_Actuator
};
var gryffin_fx_Animation = function() {
	this.start_time = null;
	this.complete = false;
	this.oncomplete = new tannus_io_VoidSignal();
	this.actuators = [];
};
$hxClasses["gryffin.fx.Animation"] = gryffin_fx_Animation;
gryffin_fx_Animation.__name__ = ["gryffin","fx","Animation"];
gryffin_fx_Animation.prototype = {
	start: function() {
		this.start_time = new Date().getTime();
		gryffin_fx_Animations.link(this);
	}
	,update: function() {
		if(!this.complete) {
			var progress;
			progress = (this.start_time != null?new Date().getTime() - this.start_time:null) / this.duration;
			if(progress > 1) progress = 1;
			var delt = this.delta(progress);
			this.step(delt * 100);
			if(progress == 1) {
				this.complete = true;
				this.oncomplete.call();
			}
		}
	}
	,delta: function(progress) {
		return progress;
	}
	,step: function(d) {
		var _g = 0;
		var _g1 = this.actuators;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			a.update(d);
		}
	}
	,actuate: function(a) {
		this.actuators.push(a);
	}
	,reverse: function() {
		var rev = new gryffin_fx_Animation();
		rev.duration = this.duration;
		rev.delta = $bind(this,this.delta);
		var _g = 0;
		var _g1 = this.actuators;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			rev.actuate(a.reverse());
		}
		return rev;
	}
	,get_now: function() {
		return new Date().getTime();
	}
	,get_passed: function() {
		if(this.start_time != null) return new Date().getTime() - this.start_time; else return null;
	}
	,__class__: gryffin_fx_Animation
	,__properties__: {get_passed:"get_passed",get_now:"get_now"}
};
var gryffin_fx_Animations = function() { };
$hxClasses["gryffin.fx.Animations"] = gryffin_fx_Animations;
gryffin_fx_Animations.__name__ = ["gryffin","fx","Animations"];
gryffin_fx_Animations.link = function(anim) {
	gryffin_fx_Animations.registry.push(anim);
};
gryffin_fx_Animations.tick = function() {
	var _g = 0;
	var _g1 = gryffin_fx_Animations.registry;
	while(_g < _g1.length) {
		var anim = _g1[_g];
		++_g;
		anim.update();
	}
	gryffin_fx_Animations.registry = gryffin_fx_Animations.registry.filter(function(item) {
		return !item.complete;
	});
};
gryffin_fx_Animations.claim = function(stage) {
	if(gryffin_fx_Animations.manager == null) gryffin_fx_Animations.manager = stage;
};
var gryffin_fx_Effect = function() {
};
$hxClasses["gryffin.fx.Effect"] = gryffin_fx_Effect;
gryffin_fx_Effect.__name__ = ["gryffin","fx","Effect"];
gryffin_fx_Effect.prototype = {
	active: function(e) {
		return true;
	}
	,affect: function(e) {
		null;
	}
	,attach: function(e) {
		null;
	}
	,__class__: gryffin_fx_Effect
};
var gryffin_fx_TimedEffect = function() {
	gryffin_fx_Effect.call(this);
	this.lifetime = -1;
	this.interval = 1000;
	this.last_affect = null;
	this.created_on = new Date().getTime();
};
$hxClasses["gryffin.fx.TimedEffect"] = gryffin_fx_TimedEffect;
gryffin_fx_TimedEffect.__name__ = ["gryffin","fx","TimedEffect"];
gryffin_fx_TimedEffect.__super__ = gryffin_fx_Effect;
gryffin_fx_TimedEffect.prototype = $extend(gryffin_fx_Effect.prototype,{
	active: function(e) {
		return this.last_affect == null || new Date().getTime() - this.last_affect >= this.interval;
	}
	,affect: function(e) {
		this.last_affect = new Date().getTime();
		if(this.lifetime > -1 && new Date().getTime() - this.created_on > this.lifetime) e.removeEffect(this);
	}
	,now: function() {
		return new Date().getTime();
	}
	,__class__: gryffin_fx_TimedEffect
});
var gryffin_ui_List = function() {
	gryffin_core_EntityContainer.call(this);
	this.items = [];
};
$hxClasses["gryffin.ui.List"] = gryffin_ui_List;
gryffin_ui_List.__name__ = ["gryffin","ui","List"];
gryffin_ui_List.__super__ = gryffin_core_EntityContainer;
gryffin_ui_List.prototype = $extend(gryffin_core_EntityContainer.prototype,{
	getChildren: function() {
		return this.items;
	}
	,addItem: function(item) {
		if(!Lambda.has(this.items,item)) {
			this.items.push(item);
			this.addChild(item);
			item.set_parent(this);
			if(this.stage != null) {
				{
					this.stage.registry.set(item.id,item);
					item;
				}
				item.stage = this.stage;
				item.dispatch("activated",this.stage);
			} else this.on("activated",function(stage) {
				{
					stage.registry.set(item.id,item);
					item;
				}
				item.stage = stage;
				item.dispatch("activated",stage);
			});
		}
	}
	,updateItem: function(stage,item) {
		null;
	}
	,removeItem: function(item) {
		return HxOverrides.remove(this.items,item);
	}
	,firstPos: function() {
		return new tannus_geom_TPoint(0,0,0);
	}
	,positionItems: function(stage) {
		var ip = this.firstPos();
		var _g = 0;
		var _g1 = this.items;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			this.updateItem(stage,item);
			this.positionItem(ip,item);
		}
	}
	,positionItem: function(p,item) {
		var ip = item.get_pos();
		ip.copyFrom(p);
		var ny = p.get_y() + item.get_h();
		p.set_y(ny);
	}
	,update: function(stage) {
		this.positionItems(stage);
		gryffin_core_EntityContainer.prototype.update.call(this,stage);
	}
	,__class__: gryffin_ui_List
});
var gryffin_ui_ContextMenu = function() {
	gryffin_ui_List.call(this);
	this.max_width = 0;
	this.target = new tannus_geom_TPoint(0,0,0);
	this.on("click",$bind(this,this.click));
};
$hxClasses["gryffin.ui.ContextMenu"] = gryffin_ui_ContextMenu;
gryffin_ui_ContextMenu.__name__ = ["gryffin","ui","ContextMenu"];
gryffin_ui_ContextMenu.__super__ = gryffin_ui_List;
gryffin_ui_ContextMenu.prototype = $extend(gryffin_ui_List.prototype,{
	firstPos: function() {
		return this.target.clone();
	}
	,positionItem: function(p,item) {
		item.set_y(p.get_y());
		item.set_x(p.get_x());
		var ny = p.get_y() + item.get_h();
		p.set_y(ny);
		this.max_width = tannus_math_TMath.max(this.max_width,item.get_w());
	}
	,contentHeight: function() {
		return tannus_math_TMath.sum_Float(this.items.map(function(item) {
			return item.get_h();
		}));
	}
	,render: function(s,c) {
		c.beginPath();
		c.set_fillStyle("#FFFFCC");
		c.set_shadowColor("#666666");
		c.set_shadowOffsetX(5);
		c.set_shadowOffsetY(5);
		c.set_shadowBlur(15);
		c.rect(this.target.get_x(),this.target.get_y(),this.max_width,this.contentHeight());
		c.closePath();
		c.fill();
		gryffin_ui_List.prototype.render.call(this,s,c);
	}
	,containsPoint: function(p) {
		var cr;
		var _x = this.target.get_x();
		var _y = this.target.get_y();
		var _height = this.contentHeight();
		cr = new tannus_geom_CRectangle(_x,_y,this.max_width,_height);
		return cr.contains(p.get_x(),p.get_y());
	}
	,click: function(e) {
		console.log(e);
	}
	,item: function(data) {
		var mitem = new gryffin_ui_ContextMenuItem(this,data);
		this.addItem(mitem);
		return mitem;
	}
	,button: function(text,cb) {
		return this.item({ 'label' : text, 'click' : cb});
	}
	,__class__: gryffin_ui_ContextMenu
});
var gryffin_ui_ListItem = function() {
	gryffin_core_Entity.call(this);
	this.set_x(0);
	this.set_y(0);
	this.set_w(0);
	this.set_h(0);
};
$hxClasses["gryffin.ui.ListItem"] = gryffin_ui_ListItem;
gryffin_ui_ListItem.__name__ = ["gryffin","ui","ListItem"];
gryffin_ui_ListItem.__super__ = gryffin_core_Entity;
gryffin_ui_ListItem.prototype = $extend(gryffin_core_Entity.prototype,{
	containsPoint: function(p) {
		return this.get_rect().containsPoint(p);
	}
	,get_x: function() {
		return this._x;
	}
	,set_x: function(v) {
		return this._x = v;
	}
	,get_y: function() {
		return this._y;
	}
	,set_y: function(v) {
		return this._y = v;
	}
	,get_w: function() {
		return this._w;
	}
	,set_w: function(v) {
		return this._w = v;
	}
	,get_h: function() {
		return this._h;
	}
	,set_h: function(v) {
		return this._h = v;
	}
	,get_pos: function() {
		var _g = this;
		var x = new tannus_io__$Pointer_Ref(function() {
			return _g.get_x();
		},function(v) {
			return _g.set_x(v);
		});
		var y = new tannus_io__$Pointer_Ref(function() {
			return _g.get_y();
		},function(v1) {
			return _g.set_y(v1);
		});
		return new tannus_geom_LinkedPoint(x,y,null);
	}
	,get_rect: function() {
		var _x = this.get_x();
		var _y = this.get_y();
		var _width = this.get_w();
		var _height = this.get_h();
		return new tannus_geom_CRectangle(_x,_y,_width,_height);
	}
	,__class__: gryffin_ui_ListItem
	,__properties__: $extend(gryffin_core_Entity.prototype.__properties__,{get_rect:"get_rect",get_pos:"get_pos",set_h:"set_h",get_h:"get_h",set_w:"set_w",get_w:"get_w",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"})
});
var gryffin_ui_ContextMenuItem = function(m,data) {
	gryffin_ui_ListItem.call(this);
	this.menu = m;
	this.hovered = false;
	this.padding = new gryffin_ui_Padding();
	this.box = new gryffin_display_TextBox();
	this.box.set_fontFamily("Ubuntu");
	this.box.set_fontSize(10);
	this.padding.set_vertical(8);
	this.padding.set_horizontal(6);
	this.yank(tannus_ds_CObj.create(data));
};
$hxClasses["gryffin.ui.ContextMenuItem"] = gryffin_ui_ContextMenuItem;
gryffin_ui_ContextMenuItem.__name__ = ["gryffin","ui","ContextMenuItem"];
gryffin_ui_ContextMenuItem.click = function(self,e) {
	self.menu["delete"]();
};
gryffin_ui_ContextMenuItem.__super__ = gryffin_ui_ListItem;
gryffin_ui_ContextMenuItem.prototype = $extend(gryffin_ui_ListItem.prototype,{
	update: function(s) {
		gryffin_ui_ListItem.prototype.update.call(this,s);
		var mp = s.getMousePosition();
		if(mp != null) {
			this.hovered = this.containsPoint(mp);
			if(this.hovered) s.set_cursor("point");
		} else this.hovered = false;
	}
	,render: function(s,c) {
		c.drawComponent(this.box,0,0,this.box.get_width(),this.box.get_height(),this.padding.left + this.get_x(),this.padding.top + this.get_y(),this.box.get_width(),this.box.get_height());
	}
	,yank: function(data) {
		if(data.exists("label")) this.set_text(data.get("label"));
		if(data.exists("click")) this.on("click",data.get("click"));
	}
	,get_text: function() {
		return this.box.get_text();
	}
	,set_text: function(v) {
		return this.box.set_text(v);
	}
	,get_w: function() {
		return this.padding.get_horizontal() + this.box.get_width();
	}
	,get_h: function() {
		return this.padding.get_vertical() + this.box.get_height();
	}
	,__class__: gryffin_ui_ContextMenuItem
	,__properties__: $extend(gryffin_ui_ListItem.prototype.__properties__,{set_text:"set_text",get_text:"get_text"})
});
var tannus_geom_Position = function(top,right,bottom,left) {
	if(left == null) left = 0;
	if(bottom == null) bottom = 0;
	if(right == null) right = 0;
	if(top == null) top = 0;
	this.top = top;
	this.right = right;
	this.bottom = bottom;
	this.left = left;
};
$hxClasses["tannus.geom.Position"] = tannus_geom_Position;
tannus_geom_Position.__name__ = ["tannus","geom","Position"];
tannus_geom_Position.prototype = {
	clone: function() {
		return new tannus_geom_Position(this.top,this.right,this.bottom,this.left);
	}
	,__class__: tannus_geom_Position
};
var gryffin_ui_Padding = function(top,right,bottom,left) {
	tannus_geom_Position.call(this,top,right,bottom,left);
};
$hxClasses["gryffin.ui.Padding"] = gryffin_ui_Padding;
gryffin_ui_Padding.__name__ = ["gryffin","ui","Padding"];
gryffin_ui_Padding.__super__ = tannus_geom_Position;
gryffin_ui_Padding.prototype = $extend(tannus_geom_Position.prototype,{
	copyFrom: function(other) {
		this.left = other.left;
		this.right = other.right;
		this.bottom = other.bottom;
		this.top = other.top;
	}
	,get_horizontal: function() {
		return this.left + this.right;
	}
	,set_horizontal: function(v) {
		this.left = v;
		this.right = v;
		return v;
	}
	,get_vertical: function() {
		return this.top + this.bottom;
	}
	,set_vertical: function(v) {
		this.top = v;
		this.bottom = v;
		return v;
	}
	,__class__: gryffin_ui_Padding
	,__properties__: {set_vertical:"set_vertical",get_vertical:"get_vertical",set_horizontal:"set_horizontal",get_horizontal:"get_horizontal"}
});
var gryffin_ui_Page = function() {
	gryffin_core_EntityContainer.call(this);
	this._opened = false;
	this.prev_page = null;
	this.scrollY = 0;
	this.viewport = new tannus_geom_CRectangle(0,0,0,0);
	this.on("scroll",$bind(this,this.scroll));
};
$hxClasses["gryffin.ui.Page"] = gryffin_ui_Page;
gryffin_ui_Page.__name__ = ["gryffin","ui","Page"];
gryffin_ui_Page.__super__ = gryffin_core_EntityContainer;
gryffin_ui_Page.prototype = $extend(gryffin_core_EntityContainer.prototype,{
	open: function() {
		if(this.stage != null) {
			var pages = this.stage.get("~gryffin.ui.Page:_opened");
			if(pages.selected.length > 0) {
				this.prev_page = pages.at(0);
				this.prev_page.close();
			}
			this._opened = true;
			this.dispatch("open",null);
		} else throw new js__$Boot_HaxeError("PageError: Cannot open Page before it is activated!");
	}
	,close: function() {
		this._opened = false;
		this.dispatch("close",null);
	}
	,isOpen: function() {
		return this._opened;
	}
	,update: function(s) {
		if(this.isOpen()) {
			gryffin_core_EntityContainer.prototype.update.call(this,s);
			this.viewport = new tannus_geom_CRectangle(0,0,s.canvas.width,s.canvas.height);
		}
	}
	,render: function(s,c) {
		if(this.isOpen()) gryffin_core_EntityContainer.prototype.render.call(this,s,c);
	}
	,scroll: function(e) {
		this.scrollY += e.delta;
	}
	,getEntitiesAtPoint: function(p) {
		if(this.isOpen()) return gryffin_core_EntityContainer.prototype.getEntitiesAtPoint.call(this,p); else return [];
	}
	,containsPoint: function(p) {
		return this.get_contentRect().containsPoint(p);
	}
	,get_contentRect: function() {
		if(this.stage == null) return new tannus_geom_CRectangle(0,0,0,0); else return new tannus_geom_CRectangle(0,0,this.stage.canvas.width,this.stage.canvas.height);
	}
	,__class__: gryffin_ui_Page
	,__properties__: $extend(gryffin_core_EntityContainer.prototype.__properties__,{get_contentRect:"get_contentRect"})
});
var gryffin_ui_Tooltip = function() {
	gryffin_core_Entity.call(this);
	this.target = new tannus_geom_CRectangle(0,0,0,0);
	this.box = new gryffin_display_TextBox();
	this.padding = new gryffin_ui_Padding();
	this.margin = 0;
	this.direction = 3;
	this.set_textColor(tannus_graphics__$Color_TColor.fromString("#000"));
	this.backgroundColor = tannus_graphics__$Color_TColor.fromString("#FFF");
	this.borderColor = tannus_graphics__$Color_TColor.fromString("#676767");
	this.borderWidth = 1;
	this.borderRadius = 0;
};
$hxClasses["gryffin.ui.Tooltip"] = gryffin_ui_Tooltip;
gryffin_ui_Tooltip.__name__ = ["gryffin","ui","Tooltip"];
gryffin_ui_Tooltip.__super__ = gryffin_core_Entity;
gryffin_ui_Tooltip.prototype = $extend(gryffin_core_Entity.prototype,{
	init: function(s) {
		gryffin_core_Entity.prototype.init.call(this,s);
		this.padding.set_vertical(2);
		this.padding.set_horizontal(2);
		this.box.set_fontFamily("Ubuntu");
		this.box.set_fontSize(10);
	}
	,render: function(s,c) {
		var r = this.get_rect();
		c.save();
		c.beginPath();
		c.set_strokeStyle(this.borderColor.toString());
		c.set_lineWidth(this.borderWidth);
		c.set_fillStyle(this.backgroundColor.toString());
		c.roundRect(r.x,r.y,r.width,r.height,this.borderRadius);
		c.closePath();
		c.fill();
		c.stroke();
		this.drawTail(r,s,c);
		c.restore();
		var tr;
		var _width = this.box.get_width();
		var _height = this.box.get_height();
		tr = new tannus_geom_CRectangle(0,0,_width,_height);
		tr.set_center(new tannus_geom_TPoint(r.x + r.width / 2,r.y + r.height / 2,0));
		c.drawComponent(this.box,0,0,tr.width,tr.height,tr.x,tr.y,tr.width,tr.height);
	}
	,drawTail: function(r,s,c) {
		var tw = 0;
		var mp = new tannus_geom_TPoint(0,0,0);
		var tri = new tannus_geom_Triangle();
		var _g = this.direction;
		switch(_g) {
		case 3:
			tw = 0.45 * r.height;
			mp.copyFrom(new tannus_geom_TPoint(r.x + r.width,r.y + r.height / 2,0));
			var _g1 = 0;
			var _g2 = [tri.one,tri.two,tri.three];
			while(_g1 < _g2.length) {
				var item = _g2[_g1];
				++_g1;
				item.copyFrom(mp);
			}
			var _g11 = tri.one;
			var ny = _g11.get_y() - tw / 2;
			_g11.set_y(ny);
			var _g12 = tri.two;
			var ny1 = _g12.get_y() + tw / 2;
			_g12.set_y(ny1);
			var _g13 = tri.three;
			var nx = _g13.get_x() + tw;
			_g13.set_x(nx);
			break;
		case 1:
			tw = 0.45 * r.height;
			mp.copyFrom(new tannus_geom_TPoint(r.x,r.y + r.height / 2,0));
			var _g14 = 0;
			var _g21 = [tri.one,tri.two,tri.three];
			while(_g14 < _g21.length) {
				var item1 = _g21[_g14];
				++_g14;
				item1.copyFrom(mp);
			}
			var _g15 = tri.one;
			var ny2 = _g15.get_y() - tw / 2;
			_g15.set_y(ny2);
			var _g16 = tri.two;
			var ny3 = _g16.get_y() + tw / 2;
			_g16.set_y(ny3);
			var _g17 = tri.three;
			var nx1 = _g17.get_x() - tw;
			_g17.set_x(nx1);
			break;
		case 0:
			tw = 0.55 * r.height;
			mp.copyFrom(new tannus_geom_TPoint(r.x + r.width / 2,r.y,0));
			var _g18 = 0;
			var _g22 = [tri.one,tri.two,tri.three];
			while(_g18 < _g22.length) {
				var item2 = _g22[_g18];
				++_g18;
				item2.copyFrom(mp);
			}
			var _g19 = tri.two;
			var nx2 = _g19.get_x() - tw / 2;
			_g19.set_x(nx2);
			var _g110 = tri.three;
			var nx3 = _g110.get_x() + tw / 2;
			_g110.set_x(nx3);
			var _g111 = tri.one;
			var ny4 = _g111.get_y() - tw;
			_g111.set_y(ny4);
			break;
		case 2:
			tw = 0.55 * r.height;
			mp.copyFrom(new tannus_geom_TPoint(r.x + r.width / 2,r.y + r.height,0));
			var _g112 = 0;
			var _g23 = [tri.one,tri.two,tri.three];
			while(_g112 < _g23.length) {
				var item3 = _g23[_g112];
				++_g112;
				item3.copyFrom(mp);
			}
			var _g113 = tri.two;
			var nx4 = _g113.get_x() - tw / 2;
			_g113.set_x(nx4);
			var _g114 = tri.three;
			var nx5 = _g114.get_x() + tw / 2;
			_g114.set_x(nx5);
			var _g115 = tri.one;
			var ny5 = _g115.get_y() + tw;
			_g115.set_y(ny5);
			break;
		default:
			throw new js__$Boot_HaxeError("fuck you");
		}
		c.set_strokeStyle(this.borderColor.toString());
		c.set_lineWidth(this.borderWidth);
		c.set_fillStyle(this.backgroundColor.toString());
		c.beginPath();
		c.moveTo(tri.one.get_x(),tri.one.get_y());
		c.lineTo(tri.three.get_x(),tri.three.get_y());
		c.lineTo(tri.two.get_x(),tri.two.get_y());
		c.closePath();
		c.fill();
		c.stroke();
		var _g3 = this.direction;
		switch(_g3) {
		case 3:case 1:
			c.fillRect(tri.one.get_x() - 1,tri.one.get_y(),c.get_lineWidth() + 1,tri.two.get_y() - tri.one.get_y() - 1);
			break;
		case 0:case 2:
			c.fillRect(tri.two.get_x(),tri.two.get_y() - 1,tri.three.get_x() - tri.two.get_x() - 1,c.get_lineWidth() + 1);
			break;
		}
	}
	,get_x: function() {
		return this.target.x;
	}
	,set_x: function(v) {
		return this.target.x = v;
	}
	,get_y: function() {
		return this.target.y;
	}
	,set_y: function(v) {
		return this.target.y = v;
	}
	,get_text: function() {
		return this.box.get_text();
	}
	,set_text: function(v) {
		return this.box.set_text(v);
	}
	,get_rect: function() {
		var r = new tannus_geom_CRectangle(0,0,0,0);
		r.set_w(this.box.get_width() + this.padding.get_horizontal());
		r.set_h(this.box.get_height() + this.padding.get_vertical());
		var _g = this.direction;
		switch(_g) {
		case 3:
			r.x = this.target.x - r.width - this.margin - this.get_tailSize();
			r.set_centerY(this.target.get_centerY());
			break;
		case 1:
			r.x = this.target.x + this.target.width + this.margin + this.get_tailSize();
			r.set_centerY(this.target.get_centerY());
			break;
		case 0:
			r.set_centerX(this.target.get_centerX());
			r.y = this.target.y + this.target.height + this.margin + this.get_tailSize();
			break;
		case 2:
			r.set_centerX(this.target.get_centerX());
			r.y = this.target.y - r.height - this.margin - this.get_tailSize();
			break;
		}
		return r;
	}
	,get_tailSize: function() {
		return (function($this) {
			var $r;
			var _g = $this.direction;
			$r = (function($this) {
				var $r;
				switch(_g) {
				case 3:case 1:
					$r = 0.45;
					break;
				case 2:case 0:
					$r = 0.55;
					break;
				}
				return $r;
			}($this));
			return $r;
		}(this)) * (this.box.get_height() + this.padding.get_vertical());
	}
	,get_textColor: function() {
		return this.box.get_color();
	}
	,set_textColor: function(v) {
		return this.box.set_color(v);
	}
	,__class__: gryffin_ui_Tooltip
	,__properties__: $extend(gryffin_core_Entity.prototype.__properties__,{set_textColor:"set_textColor",get_textColor:"get_textColor",get_tailSize:"get_tailSize",get_rect:"get_rect",set_text:"set_text",get_text:"get_text",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"})
});
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
var haxe_Serializer = function() {
	this.buf = new StringBuf();
	this.cache = [];
	this.useCache = haxe_Serializer.USE_CACHE;
	this.useEnumIndex = haxe_Serializer.USE_ENUM_INDEX;
	this.shash = new haxe_ds_StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe_Serializer;
haxe_Serializer.__name__ = ["haxe","Serializer"];
haxe_Serializer.run = function(v) {
	var s = new haxe_Serializer();
	s.serialize(v);
	return s.toString();
};
haxe_Serializer.prototype = {
	toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			if(x == null) this.buf.b += "null"; else this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = encodeURIComponent(s);
		if(s.length == null) this.buf.b += "null"; else this.buf.b += "" + s.length;
		this.buf.b += ":";
		if(s == null) this.buf.b += "null"; else this.buf.b += "" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				if(i == null) this.buf.b += "null"; else this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				if(v1 == null) this.buf.b += "null"; else this.buf.b += "" + v1;
				break;
			case 2:
				var v2 = v;
				if(isNaN(v2)) this.buf.b += "k"; else if(!isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
					this.buf.b += "d";
					if(v2 == null) this.buf.b += "null"; else this.buf.b += "" + v2;
				}
				break;
			case 3:
				if(v) this.buf.b += "t"; else this.buf.b += "f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var _g1_head = v3.h;
					var _g1_val = null;
					while(_g1_head != null) {
						var i1;
						_g1_val = _g1_head[0];
						_g1_head = _g1_head[1];
						i1 = _g1_val;
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(d.getTime());
					break;
				case haxe_ds_StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it0 = v4.keys();
					while( $it0.hasNext() ) {
						var k = $it0.next();
						this.serializeString(k);
						this.serialize(__map_reserved[k] != null?v4.getReserved(k):v4.h[k]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it1 = v5.keys();
					while( $it1.hasNext() ) {
						var k1 = $it1.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.h[k1]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it2 = v6.keys();
					while( $it2.hasNext() ) {
						var k2 = $it2.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe_io_Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe_Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					if(chars.length == null) this.buf.b += "null"; else this.buf.b += "" + chars.length;
					this.buf.b += ":";
					if(chars == null) this.buf.b += "null"; else this.buf.b += "" + chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(js_Boot.__instanceof(v,Class)) {
					var className = Type.getClassName(v);
					this.buf.b += "A";
					this.serializeString(className);
				} else if(js_Boot.__instanceof(v,Enum)) {
					this.buf.b += "B";
					this.serializeString(Type.getEnumName(v));
				} else {
					if(this.useCache && this.serializeRef(v)) return;
					this.buf.b += "o";
					this.serializeFields(v);
				}
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				if(this.useEnumIndex) this.buf.b += "j"; else this.buf.b += "w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += Std.string(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw new js__$Boot_HaxeError("Cannot serialize function");
				break;
			default:
				throw new js__$Boot_HaxeError("Cannot serialize " + Std.string(v));
			}
		}
	}
	,__class__: haxe_Serializer
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = ["haxe","Unserializer"];
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
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
var haxe_crypto_Crc32 = function() { };
$hxClasses["haxe.crypto.Crc32"] = haxe_crypto_Crc32;
haxe_crypto_Crc32.__name__ = ["haxe","crypto","Crc32"];
haxe_crypto_Crc32.make = function(data) {
	var init = -1;
	var crc = init;
	var b = data.b.buffer;
	var _g1 = 0;
	var _g = data.length;
	while(_g1 < _g) {
		var i = _g1++;
		var tmp = (crc ^ b.bytes[i]) & 255;
		var _g2 = 0;
		while(_g2 < 8) {
			var j = _g2++;
			if((tmp & 1) == 1) tmp = tmp >>> 1 ^ -306674912; else tmp >>>= 1;
		}
		crc = crc >>> 8 ^ tmp;
	}
	return crc ^ init;
};
var haxe_ds_ArraySort = function() { };
$hxClasses["haxe.ds.ArraySort"] = haxe_ds_ArraySort;
haxe_ds_ArraySort.__name__ = ["haxe","ds","ArraySort"];
haxe_ds_ArraySort.sort = function(a,cmp) {
	haxe_ds_ArraySort.rec(a,cmp,0,a.length);
};
haxe_ds_ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) return;
		var _g = from + 1;
		while(_g < to) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) haxe_ds_ArraySort.swap(a,j - 1,j); else break;
				j--;
			}
		}
		return;
	}
	haxe_ds_ArraySort.rec(a,cmp,from,middle);
	haxe_ds_ArraySort.rec(a,cmp,middle,to);
	haxe_ds_ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe_ds_ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	var new_mid;
	if(len1 == 0 || len2 == 0) return;
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) haxe_ds_ArraySort.swap(a,pivot,from);
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe_ds_ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe_ds_ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe_ds_ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	new_mid = first_cut + len22;
	haxe_ds_ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe_ds_ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe_ds_ArraySort.rotate = function(a,cmp,from,mid,to) {
	var n;
	if(from == mid || mid == to) return;
	n = haxe_ds_ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) p2 += shift; else p2 = from + (shift - (to - p2));
		}
		a[p1] = val;
	}
};
haxe_ds_ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe_ds_ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) len = half; else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe_ds_ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else len = half;
	}
	return from;
};
haxe_ds_ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_ObjectMap
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
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
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
var haxe_io_BytesBuffer = function() {
	this.b = [];
};
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
haxe_io_BytesBuffer.prototype = {
	addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,getBytes: function() {
		var bytes = new haxe_io_Bytes(new Uint8Array(this.b).buffer);
		this.b = null;
		return bytes;
	}
	,__class__: haxe_io_BytesBuffer
};
var haxe_io_Input = function() { };
$hxClasses["haxe.io.Input"] = haxe_io_Input;
haxe_io_Input.__name__ = ["haxe","io","Input"];
var haxe_io_BytesInput = function(b,pos,len) {
	if(pos == null) pos = 0;
	if(len == null) len = b.length - pos;
	if(pos < 0 || len < 0 || pos + len > b.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe_io_BytesInput;
haxe_io_BytesInput.__name__ = ["haxe","io","BytesInput"];
haxe_io_BytesInput.__super__ = haxe_io_Input;
haxe_io_BytesInput.prototype = $extend(haxe_io_Input.prototype,{
	__class__: haxe_io_BytesInput
});
var haxe_io_Output = function() { };
$hxClasses["haxe.io.Output"] = haxe_io_Output;
haxe_io_Output.__name__ = ["haxe","io","Output"];
haxe_io_Output.prototype = {
	writeByte: function(c) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,writeBytes: function(s,pos,len) {
		var k = len;
		var b = s.b.buffer;
		if(pos < 0 || len < 0 || pos + len > s.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		while(k > 0) {
			this.writeByte(b[pos]);
			pos++;
			k--;
		}
		return len;
	}
	,write: function(s) {
		var l = s.length;
		var p = 0;
		while(l > 0) {
			var k = this.writeBytes(s,p,l);
			if(k == 0) throw new js__$Boot_HaxeError(haxe_io_Error.Blocked);
			p += k;
			l -= k;
		}
	}
	,writeFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.writeBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,writeUInt16: function(x) {
		if(x < 0 || x >= 65536) throw new js__$Boot_HaxeError(haxe_io_Error.Overflow);
		if(this.bigEndian) {
			this.writeByte(x >> 8);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8);
		}
	}
	,writeInt32: function(x) {
		if(this.bigEndian) {
			this.writeByte(x >>> 24);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >>> 24);
		}
	}
	,writeString: function(s) {
		var b = haxe_io_Bytes.ofString(s);
		this.writeFullBytes(b,0,b.length);
	}
	,__class__: haxe_io_Output
};
var haxe_io_BytesOutput = function() {
	this.b = new haxe_io_BytesBuffer();
};
$hxClasses["haxe.io.BytesOutput"] = haxe_io_BytesOutput;
haxe_io_BytesOutput.__name__ = ["haxe","io","BytesOutput"];
haxe_io_BytesOutput.__super__ = haxe_io_Output;
haxe_io_BytesOutput.prototype = $extend(haxe_io_Output.prototype,{
	writeByte: function(c) {
		this.b.b.push(c);
	}
	,writeBytes: function(buf,pos,len) {
		this.b.addBytes(buf,pos,len);
		return len;
	}
	,getBytes: function() {
		return this.b.getBytes();
	}
	,__class__: haxe_io_BytesOutput
});
var haxe_io_Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = ["haxe","io","Eof"];
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
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
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else this.dir = null;
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe_io_Path;
haxe_io_Path.__name__ = ["haxe","io","Path"];
haxe_io_Path.withoutExtension = function(path) {
	var s = new haxe_io_Path(path);
	s.ext = null;
	return s.toString();
};
haxe_io_Path.withoutDirectory = function(path) {
	var s = new haxe_io_Path(path);
	s.dir = null;
	return s.toString();
};
haxe_io_Path.directory = function(path) {
	var s = new haxe_io_Path(path);
	if(s.dir == null) return "";
	return s.dir;
};
haxe_io_Path.extension = function(path) {
	var s = new haxe_io_Path(path);
	if(s.ext == null) return "";
	return s.ext;
};
haxe_io_Path.join = function(paths) {
	var paths1 = paths.filter(function(s) {
		return s != null && s != "";
	});
	if(paths1.length == 0) return "";
	var path = paths1[0];
	var _g1 = 1;
	var _g = paths1.length;
	while(_g1 < _g) {
		var i = _g1++;
		path = haxe_io_Path.addTrailingSlash(path);
		path += paths1[i];
	}
	return haxe_io_Path.normalize(path);
};
haxe_io_Path.normalize = function(path) {
	var slash = "/";
	path = path.split("\\").join("/");
	if(path == null || path == slash) return slash;
	var target = [];
	var _g = 0;
	var _g1 = path.split(slash);
	while(_g < _g1.length) {
		var token = _g1[_g];
		++_g;
		if(token == ".." && target.length > 0 && target[target.length - 1] != "..") target.pop(); else if(token != ".") target.push(token);
	}
	var tmp = target.join(slash);
	var regex = new EReg("([^:])/+","g");
	var result = regex.replace(tmp,"$1" + slash);
	var acc = new StringBuf();
	var colon = false;
	var slashes = false;
	var _g11 = 0;
	var _g2 = tmp.length;
	while(_g11 < _g2) {
		var i = _g11++;
		var _g21 = HxOverrides.cca(tmp,i);
		var i1 = _g21;
		if(_g21 != null) switch(_g21) {
		case 58:
			acc.b += ":";
			colon = true;
			break;
		case 47:
			if(colon == false) slashes = true; else {
				colon = false;
				if(slashes) {
					acc.b += "/";
					slashes = false;
				}
				acc.add(String.fromCharCode(i1));
			}
			break;
		default:
			colon = false;
			if(slashes) {
				acc.b += "/";
				slashes = false;
			}
			acc.add(String.fromCharCode(i1));
		} else {
			colon = false;
			if(slashes) {
				acc.b += "/";
				slashes = false;
			}
			acc.add(String.fromCharCode(i1));
		}
	}
	var result1 = acc.b;
	return result1;
};
haxe_io_Path.addTrailingSlash = function(path) {
	if(path.length == 0) return "/";
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) return path + "\\"; else return path;
	} else if(c1 != path.length - 1) return path + "/"; else return path;
};
haxe_io_Path.isAbsolute = function(path) {
	if(StringTools.startsWith(path,"/")) return true;
	if(path.charAt(1) == ":") return true;
	return false;
};
haxe_io_Path.prototype = {
	toString: function() {
		return (this.dir == null?"":this.dir + (this.backslash?"\\":"/")) + this.file + (this.ext == null?"":"." + this.ext);
	}
	,__class__: haxe_io_Path
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe_rtti_Meta.getStatics = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.statics == null) return { }; else return meta.statics;
};
haxe_rtti_Meta.getFields = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
var haxe_zip_ExtraField = $hxClasses["haxe.zip.ExtraField"] = { __ename__ : ["haxe","zip","ExtraField"], __constructs__ : ["FUnknown","FInfoZipUnicodePath","FUtf8"] };
haxe_zip_ExtraField.FUnknown = function(tag,bytes) { var $x = ["FUnknown",0,tag,bytes]; $x.__enum__ = haxe_zip_ExtraField; $x.toString = $estr; return $x; };
haxe_zip_ExtraField.FInfoZipUnicodePath = function(name,crc) { var $x = ["FInfoZipUnicodePath",1,name,crc]; $x.__enum__ = haxe_zip_ExtraField; $x.toString = $estr; return $x; };
haxe_zip_ExtraField.FUtf8 = ["FUtf8",2];
haxe_zip_ExtraField.FUtf8.toString = $estr;
haxe_zip_ExtraField.FUtf8.__enum__ = haxe_zip_ExtraField;
var haxe_zip_Writer = function(o) {
	this.o = o;
	this.files = new List();
};
$hxClasses["haxe.zip.Writer"] = haxe_zip_Writer;
haxe_zip_Writer.__name__ = ["haxe","zip","Writer"];
haxe_zip_Writer.prototype = {
	writeZipDate: function(date) {
		var hour = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds() >> 1;
		this.o.writeUInt16(hour << 11 | min << 5 | sec);
		var year = date.getFullYear() - 1980;
		var month = date.getMonth() + 1;
		var day = date.getDate();
		this.o.writeUInt16(year << 9 | month << 5 | day);
	}
	,writeEntryHeader: function(f) {
		var o = this.o;
		var flags = 0;
		if(f.extraFields != null) {
			var _g_head = f.extraFields.h;
			var _g_val = null;
			while(_g_head != null) {
				var e1;
				e1 = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				switch(e1[1]) {
				case 2:
					flags |= 2048;
					break;
				default:
				}
			}
		}
		o.writeInt32(67324752);
		o.writeUInt16(20);
		o.writeUInt16(flags);
		if(f.data == null) {
			f.fileSize = 0;
			f.dataSize = 0;
			f.crc32 = 0;
			f.compressed = false;
			f.data = haxe_io_Bytes.alloc(0);
		} else {
			if(f.crc32 == null) {
				if(f.compressed) throw new js__$Boot_HaxeError("CRC32 must be processed before compression");
				f.crc32 = haxe_crypto_Crc32.make(f.data);
			}
			if(!f.compressed) f.fileSize = f.data.length;
			f.dataSize = f.data.length;
		}
		o.writeUInt16(f.compressed?8:0);
		this.writeZipDate(f.fileTime);
		o.writeInt32(f.crc32);
		o.writeInt32(f.dataSize);
		o.writeInt32(f.fileSize);
		o.writeUInt16(f.fileName.length);
		var e = new haxe_io_BytesOutput();
		if(f.extraFields != null) {
			var _g_head1 = f.extraFields.h;
			var _g_val1 = null;
			while(_g_head1 != null) {
				var f1;
				f1 = (function($this) {
					var $r;
					_g_val1 = _g_head1[0];
					_g_head1 = _g_head1[1];
					$r = _g_val1;
					return $r;
				}(this));
				switch(f1[1]) {
				case 1:
					var crc = f1[3];
					var name = f1[2];
					var namebytes = haxe_io_Bytes.ofString(name);
					e.writeUInt16(28789);
					e.writeUInt16(namebytes.length + 5);
					e.writeByte(1);
					e.writeInt32(crc);
					e.write(namebytes);
					break;
				case 0:
					var bytes = f1[3];
					var tag = f1[2];
					e.writeUInt16(tag);
					e.writeUInt16(bytes.length);
					e.write(bytes);
					break;
				case 2:
					break;
				}
			}
		}
		var ebytes = e.getBytes();
		o.writeUInt16(ebytes.length);
		o.writeString(f.fileName);
		o.write(ebytes);
		this.files.add({ name : f.fileName, compressed : f.compressed, clen : f.data.length, size : f.fileSize, crc : f.crc32, date : f.fileTime, fields : ebytes});
	}
	,write: function(files) {
		var _g_head = files.h;
		var _g_val = null;
		while(_g_head != null) {
			var f;
			f = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			this.writeEntryHeader(f);
			this.o.writeFullBytes(f.data,0,f.data.length);
		}
		this.writeCDR();
	}
	,writeCDR: function() {
		var cdr_size = 0;
		var cdr_offset = 0;
		var _g_head = this.files.h;
		var _g_val = null;
		while(_g_head != null) {
			var f;
			f = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			var namelen = f.name.length;
			var extraFieldsLength = f.fields.length;
			this.o.writeInt32(33639248);
			this.o.writeUInt16(20);
			this.o.writeUInt16(20);
			this.o.writeUInt16(0);
			this.o.writeUInt16(f.compressed?8:0);
			this.writeZipDate(f.date);
			this.o.writeInt32(f.crc);
			this.o.writeInt32(f.clen);
			this.o.writeInt32(f.size);
			this.o.writeUInt16(namelen);
			this.o.writeUInt16(extraFieldsLength);
			this.o.writeUInt16(0);
			this.o.writeUInt16(0);
			this.o.writeUInt16(0);
			this.o.writeInt32(0);
			this.o.writeInt32(cdr_offset);
			this.o.writeString(f.name);
			this.o.write(f.fields);
			cdr_size += 46 + namelen + extraFieldsLength;
			cdr_offset += 30 + namelen + extraFieldsLength + f.clen;
		}
		this.o.writeInt32(101010256);
		this.o.writeUInt16(0);
		this.o.writeUInt16(0);
		this.o.writeUInt16(this.files.length);
		this.o.writeUInt16(this.files.length);
		this.o.writeInt32(cdr_size);
		this.o.writeInt32(cdr_offset);
		this.o.writeUInt16(0);
	}
	,__class__: haxe_zip_Writer
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
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = ["js","Browser"];
js_Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
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
var tannus_chrome_FileSystem = function() { };
$hxClasses["tannus.chrome.FileSystem"] = tannus_chrome_FileSystem;
tannus_chrome_FileSystem.__name__ = ["tannus","chrome","FileSystem"];
tannus_chrome_FileSystem.__properties__ = {get_lib:"get_lib"}
tannus_chrome_FileSystem.requestFileSystem = function(volume,cb) {
	chrome.fileSystem.requestFileSystem({ 'volumeId' : volume, 'writable' : true},cb);
};
tannus_chrome_FileSystem.getVolumeList = function(cb) {
	chrome.fileSystem.getVolumeList(cb);
};
tannus_chrome_FileSystem.chooseEntry = function(options,cb) {
	chrome.fileSystem.chooseEntry(options,function(entry) {
		var all = [];
		var tn = tannus_internal_TypeTools.typename(entry);
		if(entry != null) {
			if(tn == "Array") all = all.concat(entry); else all.push(entry);
		}
		console.log(all);
		cb(all);
	});
};
tannus_chrome_FileSystem.retainEntry = function(entry) {
	return chrome.fileSystem.retainEntry(entry);
};
tannus_chrome_FileSystem.restoreEntry = function(id,cb) {
	chrome.fileSystem.restoreEntry(id,cb);
};
tannus_chrome_FileSystem.isRestorable = function(id,cb) {
	chrome.fileSystem.isRestorable(id,cb);
};
tannus_chrome_FileSystem.canRestore = function(id) {
	return new tannus_ds_Promise(function(accept,reject) {
		chrome.fileSystem.isRestorable(id,function(status) {
			accept(status);
		});
	},null).bool();
};
tannus_chrome_FileSystem.chooseDirectory = function() {
	return new tannus_ds_Promise(function(accept,reject) {
		tannus_chrome_FileSystem.chooseEntry({ type : "openDirectory"},function(entries) {
			var e = entries.shift();
			if(e == null || !e.isDirectory) reject("Not a Directory!"); else accept(e);
		});
	},null);
};
tannus_chrome_FileSystem.chooseFile = function(writable,mustExist) {
	if(mustExist == null) mustExist = true;
	if(writable == null) writable = false;
	return new tannus_html_fs_FilePromise(function(provide) {
		var options = { };
		switch(writable) {
		case true:
			switch(mustExist) {
			case true:
				options.type = "openWritableFile";
				break;
			case false:
				options.type = "saveFile";
				break;
			}
			break;
		default:
			switch(mustExist) {
			case false:
				options.type = "saveFile";
				break;
			default:
				options.type = "openFile";
			}
		}
		tannus_chrome_FileSystem.chooseEntry(options,function(entries) {
			provide(entries[0]);
		});
	});
};
tannus_chrome_FileSystem.getDisplayPath = function(entry,cb) {
	chrome.fileSystem.getDisplayPath(entry,cb);
};
tannus_chrome_FileSystem.get_lib = function() {
	return chrome.fileSystem;
};
var tannus_chrome_Storage = function() { };
$hxClasses["tannus.chrome.Storage"] = tannus_chrome_Storage;
tannus_chrome_Storage.__name__ = ["tannus","chrome","Storage"];
tannus_chrome_Storage.__properties__ = {get_sync:"get_sync",get_local:"get_local",get_lib:"get_lib"}
tannus_chrome_Storage.get_lib = function() {
	return chrome.storage;
};
tannus_chrome_Storage.get_local = function() {
	return chrome.storage.local;
};
tannus_chrome_Storage.get_sync = function() {
	return chrome.storage.sync;
};
tannus_chrome_Storage.onChange = function(listener) {
	chrome.storage.onChanged.addListener(function(changes,area) {
		var change = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = Reflect.fields(changes);
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			var c = Reflect.getProperty(changes,key);
			change.set(key,(function($this) {
				var $r;
				var cur = c.newValue;
				var prev = c.oldValue;
				$r = [cur,prev];
				return $r;
			}(this)));
		}
		listener(area,change);
	});
};
var tannus_chrome__$StorageArea_StorageArea_$Impl_$ = {};
$hxClasses["tannus.chrome._StorageArea.StorageArea_Impl_"] = tannus_chrome__$StorageArea_StorageArea_$Impl_$;
tannus_chrome__$StorageArea_StorageArea_$Impl_$.__name__ = ["tannus","chrome","_StorageArea","StorageArea_Impl_"];
tannus_chrome__$StorageArea_StorageArea_$Impl_$._new = function(a) {
	return a;
};
tannus_chrome__$StorageArea_StorageArea_$Impl_$.onChange = function(this1,cb) {
	tannus_chrome_Storage.onChange(function(area,changes) {
		switch(area) {
		case "local":
			if(this1 == chrome.storage.local) cb(changes); else null;
			break;
		case "sync":
			if(this1 == chrome.storage.sync) cb(changes); else null;
			break;
		default:
			null;
		}
	});
};
tannus_chrome__$StorageArea_StorageArea_$Impl_$.onChangeField = function(this1,key,cb) {
	var this2 = this1;
	var cb1 = function(changes) {
		if(__map_reserved[key] != null?changes.existsReserved(key):changes.h.hasOwnProperty(key)) {
			var d;
			d = __map_reserved[key] != null?changes.getReserved(key):changes.h[key];
			cb(d);
		}
	};
	tannus_chrome_Storage.onChange(function(area,changes1) {
		switch(area) {
		case "local":
			if(this2 == chrome.storage.local) cb1(changes1); else null;
			break;
		case "sync":
			if(this2 == chrome.storage.sync) cb1(changes1); else null;
			break;
		default:
			null;
		}
	});
};
tannus_chrome__$StorageArea_StorageArea_$Impl_$.watch = function(this1,key,cb) {
	var key1 = key;
	var cb1 = function(change) {
		console.log(tannus_ds__$Delta_Delta_$Impl_$.toString(change));
	};
	var this2 = this1;
	var cb2 = function(changes) {
		if(__map_reserved[key1] != null?changes.existsReserved(key1):changes.h.hasOwnProperty(key1)) {
			var d;
			d = __map_reserved[key1] != null?changes.getReserved(key1):changes.h[key1];
			cb1(d);
		}
	};
	tannus_chrome_Storage.onChange(function(area,changes1) {
		switch(area) {
		case "local":
			if(this2 == chrome.storage.local) cb2(changes1); else null;
			break;
		case "sync":
			if(this2 == chrome.storage.sync) cb2(changes1); else null;
			break;
		default:
			null;
		}
	});
};
tannus_chrome__$StorageArea_StorageArea_$Impl_$.watchAll = function(this1,cb) {
	var this2 = this1;
	var cb1 = cb;
	tannus_chrome_Storage.onChange(function(area,changes) {
		switch(area) {
		case "local":
			if(this2 == chrome.storage.local) cb1(changes); else null;
			break;
		case "sync":
			if(this2 == chrome.storage.sync) cb1(changes); else null;
			break;
		default:
			null;
		}
	});
};
var tannus_css_Property = function(key,val) {
	this.name = key;
	this.value = val;
};
$hxClasses["tannus.css.Property"] = tannus_css_Property;
tannus_css_Property.__name__ = ["tannus","css","Property"];
tannus_css_Property.prototype = {
	get_values: function() {
		return new tannus_css_vals_Lexer().parse(tannus_io_impl_JavaScriptBinary.ofString(this.value));
	}
	,__class__: tannus_css_Property
	,__properties__: {get_values:"get_values"}
};
var tannus_css_Rule = function(par,sel,props) {
	this.sheet = par;
	this.selector = sel;
	if(props != null) this.properties = props; else this.properties = [];
};
$hxClasses["tannus.css.Rule"] = tannus_css_Rule;
tannus_css_Rule.__name__ = ["tannus","css","Rule"];
tannus_css_Rule.prototype = {
	child: function(childSel,props) {
		var sel = [this.selector," ",childSel].join("");
		return this.sheet.rule(sel,props);
	}
	,set: function(name,value) {
		if(this.exists(name)) {
			var p = this.getProp(name);
			p.value = Std.string(value);
		} else {
			var p1 = new tannus_css_Property(name,Std.string(value));
			this.properties.push(p1);
		}
		this.sheet._update.call();
	}
	,exists: function(name) {
		return this.getProp(name) != null;
	}
	,get: function(name) {
		if(this.exists(name)) return this.getProp(name).value; else return null;
	}
	,getProp: function(name) {
		var _g = 0;
		var _g1 = this.properties;
		while(_g < _g1.length) {
			var prop = _g1[_g];
			++_g;
			if(prop.name == name) return prop;
		}
		return null;
	}
	,changed: function() {
		this.sheet._update.call();
	}
	,__class__: tannus_css_Rule
};
var tannus_css_StyleSheet = function() {
	this.rules = [];
	this._update = new tannus_io_VoidSignal();
};
$hxClasses["tannus.css.StyleSheet"] = tannus_css_StyleSheet;
tannus_css_StyleSheet.__name__ = ["tannus","css","StyleSheet"];
tannus_css_StyleSheet.prototype = {
	rule: function(selector,props) {
		var r;
		if(this.hasRule(selector)) r = this.getRule(selector); else {
			r = new tannus_css_Rule(this,selector);
			this.rules.push(r);
			this._update.call();
		}
		if(props != null) {
			var _g = 0;
			var _g1;
			var this1 = props;
			_g1 = Reflect.fields(this1).map(function(k) {
				return { 'name' : k, 'value' : Reflect.getProperty(this1,k)};
			});
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				r.set(p.name,p.value);
			}
			this._update.call();
		}
		return r;
	}
	,hasRule: function(sel) {
		return this.getRule(sel) != null;
	}
	,getRule: function(sel) {
		var _g = 0;
		var _g1 = this.rules;
		while(_g < _g1.length) {
			var rule = _g1[_g];
			++_g;
			if(rule.selector == sel) return rule;
		}
		return null;
	}
	,toString: function() {
		var w = new tannus_css_Writer();
		{
			var this1 = w.generate(this);
			return this1.toString();
		}
	}
	,toByteArray: function() {
		var w = new tannus_css_Writer();
		return w.generate(this);
	}
	,changed: function() {
		this._update.call();
	}
	,onchange: function(cb) {
		this._update.on(cb);
	}
	,__class__: tannus_css_StyleSheet
};
var tannus_css_Value = $hxClasses["tannus.css.Value"] = { __ename__ : ["tannus","css","Value"], __constructs__ : ["VIdent","VString","VNumber","VColor","VRef","VCall","VTuple"] };
tannus_css_Value.VIdent = function(id) { var $x = ["VIdent",0,id]; $x.__enum__ = tannus_css_Value; $x.toString = $estr; return $x; };
tannus_css_Value.VString = function(str) { var $x = ["VString",1,str]; $x.__enum__ = tannus_css_Value; $x.toString = $estr; return $x; };
tannus_css_Value.VNumber = function(num,unit) { var $x = ["VNumber",2,num,unit]; $x.__enum__ = tannus_css_Value; $x.toString = $estr; return $x; };
tannus_css_Value.VColor = function(col) { var $x = ["VColor",3,col]; $x.__enum__ = tannus_css_Value; $x.toString = $estr; return $x; };
tannus_css_Value.VRef = function(name) { var $x = ["VRef",4,name]; $x.__enum__ = tannus_css_Value; $x.toString = $estr; return $x; };
tannus_css_Value.VCall = function(func,args) { var $x = ["VCall",5,func,args]; $x.__enum__ = tannus_css_Value; $x.toString = $estr; return $x; };
tannus_css_Value.VTuple = function(vals) { var $x = ["VTuple",6,vals]; $x.__enum__ = tannus_css_Value; $x.toString = $estr; return $x; };
var tannus_css_Writer = function() {
};
$hxClasses["tannus.css.Writer"] = tannus_css_Writer;
tannus_css_Writer.__name__ = ["tannus","css","Writer"];
tannus_css_Writer.prototype = {
	generate: function(sheet) {
		this.reset();
		var _g = 0;
		var _g1 = sheet.rules;
		while(_g < _g1.length) {
			var rule = _g1[_g];
			++_g;
			this.writeRule(rule);
		}
		return this.buffer;
	}
	,writeRule: function(rule) {
		var tab = "    ";
		this.writeln(tannus_io_impl_JavaScriptBinary.ofString(rule.selector + " {"));
		var _g = 0;
		var _g1 = rule.properties;
		while(_g < _g1.length) {
			var prop = _g1[_g];
			++_g;
			this.writeln(tannus_io_impl_JavaScriptBinary.ofString("" + tab + prop.name + ": " + prop.value + ";"));
		}
		this.writeln(tannus_io_impl_JavaScriptBinary.ofString("}"));
	}
	,reset: function() {
		var this1;
		this1 = tannus_io_impl_JavaScriptBinary.alloc(0);
		this.buffer = this1;
	}
	,write: function(what) {
		this.buffer.append(what);
	}
	,writeln: function(data) {
		data.push((function($this) {
			var $r;
			var n = HxOverrides.cca("\n",0);
			var this1;
			if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
			this1 = n;
			$r = this1;
			return $r;
		}(this)));
		this.buffer.append(data);
	}
	,__class__: tannus_css_Writer
};
var tannus_css_vals_Lexer = function() {
	this.buffer = tannus_io_impl_JavaScriptBinary.ofString("");
	this.cursor = 0;
	this.tree = [];
};
$hxClasses["tannus.css.vals.Lexer"] = tannus_css_vals_Lexer;
tannus_css_vals_Lexer.__name__ = ["tannus","css","vals","Lexer"];
tannus_css_vals_Lexer.eof = function() {
	throw new js__$Boot_HaxeError(tannus_css_vals__$Lexer_Err.Eof);
};
tannus_css_vals_Lexer.unex = function(c) {
	throw new js__$Boot_HaxeError(tannus_css_vals__$Lexer_Err.Unexpected(c));
};
tannus_css_vals_Lexer.isUnit = function(c) {
	return c >= 65 && c <= 90 || c >= 97 && c <= 122 || Lambda.has([37],c);
};
tannus_css_vals_Lexer.parseString = function(s) {
	return new tannus_css_vals_Lexer().parse(tannus_io_impl_JavaScriptBinary.ofString(s));
};
tannus_css_vals_Lexer.prototype = {
	parse: function(snip) {
		this.buffer = tannus_io_impl_JavaScriptBinary.ofString("");
		this.cursor = 0;
		this.tree = [];
		this.buffer = snip;
		var other = tannus_io_impl_JavaScriptBinary.ofString(" ");
		this.buffer.append(other);
		try {
			while(true) try {
				var v = this.parseNext();
				this.tree.push(v);
			} catch( err ) {
				if (err instanceof js__$Boot_HaxeError) err = err.val;
				if( js_Boot.__instanceof(err,tannus_css_vals__$Lexer_Err) ) {
					switch(err[1]) {
					case 1:
						throw "__break__";
						break;
					case 0:
						var c = err[2];
						var e = "CSSValueError: Unexpected " + String.fromCharCode(c) + "!";
						console.log(e);
						throw new js__$Boot_HaxeError(e);
						break;
					}
				} else throw(err);
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		return this.tree;
	}
	,parseNext: function() {
		if(this.cursor == this.buffer._length - 1) {
			throw new js__$Boot_HaxeError(tannus_css_vals__$Lexer_Err.Eof);
			return tannus_css_Value.VNumber(0);
		} else if((function($this) {
			var $r;
			var this1 = $this.buffer.get($this.cursor);
			$r = Lambda.has([9,10,11,12,13,32],this1);
			return $r;
		}(this))) {
			this.advance();
			return this.parseNext();
		} else if((function($this) {
			var $r;
			var this2 = $this.buffer.get($this.cursor);
			$r = this2 >= 65 && this2 <= 90 || this2 >= 97 && this2 <= 122;
			return $r;
		}(this)) || (function($this) {
			var $r;
			var this3 = $this.buffer.get($this.cursor);
			$r = this3 == 95;
			return $r;
		}(this)) || (function($this) {
			var $r;
			var this4 = $this.buffer.get($this.cursor);
			$r = this4 == 64;
			return $r;
		}(this))) {
			var ident = tannus_io_impl_JavaScriptBinary.ofString("");
			ident.push(this.buffer.get(this.cursor));
			this.advance();
			while(!(this.cursor == this.buffer._length - 1) && ((function($this) {
				var $r;
				var this5 = $this.buffer.get($this.cursor);
				$r = this5 >= 65 && this5 <= 90 || this5 >= 97 && this5 <= 122;
				return $r;
			}(this)) || (function($this) {
				var $r;
				var this6 = $this.buffer.get($this.cursor);
				$r = this6 >= 48 && this6 <= 57;
				return $r;
			}(this)) || (function($this) {
				var $r;
				var this7 = $this.buffer.get($this.cursor);
				$r = this7 == 95;
				return $r;
			}(this)))) {
				ident.push(this.buffer.get(this.cursor));
				this.advance();
			}
			if((function($this) {
				var $r;
				var this8 = ident.get(0);
				$r = this8 == 64;
				return $r;
			}(this))) {
				ident.shift();
				return tannus_css_Value.VRef(ident.toString());
			} else try {
				var c = this.cursor;
				var next = this.parseNext();
				switch(next[1]) {
				case 6:
					var args = next[2];
					return tannus_css_Value.VCall(ident.toString(),args);
				default:
					this.cursor = c;
					return tannus_css_Value.VIdent(ident.toString());
				}
			} catch( err ) {
				if (err instanceof js__$Boot_HaxeError) err = err.val;
				if( js_Boot.__instanceof(err,tannus_css_vals__$Lexer_Err) ) {
					switch(err[1]) {
					case 1:
						return tannus_css_Value.VIdent(ident.toString());
					default:
						throw new js__$Boot_HaxeError(err);
					}
				} else throw(err);
			}
		} else if((function($this) {
			var $r;
			var this9 = $this.buffer.get($this.cursor);
			$r = this9 >= 48 && this9 <= 57;
			return $r;
		}(this))) {
			var snum;
			var this10 = this.buffer.get(this.cursor);
			snum = String.fromCharCode(this10);
			this.advance();
			while(!(this.cursor == this.buffer._length - 1) && ((function($this) {
				var $r;
				var this11 = $this.buffer.get($this.cursor);
				$r = this11 >= 48 && this11 <= 57;
				return $r;
			}(this)) || (function($this) {
				var $r;
				var this12 = $this.buffer.get($this.cursor);
				$r = this12 == 46;
				return $r;
			}(this)))) {
				var this13 = this.buffer.get(this.cursor);
				snum += String.fromCharCode(this13);
				this.advance();
			}
			var num = parseFloat(snum);
			var unit = null;
			if(tannus_css_vals_Lexer.isUnit(this.buffer.get(this.cursor))) {
				var su;
				var this14 = this.buffer.get(this.cursor);
				su = String.fromCharCode(this14);
				this.advance();
				while(!(this.cursor == this.buffer._length - 1) && tannus_css_vals_Lexer.isUnit(this.buffer.get(this.cursor))) {
					var this15 = this.buffer.get(this.cursor);
					su += String.fromCharCode(this15);
					this.advance();
				}
				if(Lambda.has(["em","ex","ch","rem","vw","vh","%","cm","mm","in","px","pt","pc"],su)) unit = su; else {
					var e = "CSSUnitError: " + su + " is not a valid unit!";
					console.log(e);
					throw new js__$Boot_HaxeError(e);
				}
			}
			return tannus_css_Value.VNumber(num,unit);
		} else if((function($this) {
			var $r;
			var this16 = $this.buffer.get($this.cursor);
			$r = this16 == 35;
			return $r;
		}(this))) {
			var scol = "#";
			this.advance();
			while(!(this.cursor == this.buffer._length - 1) && new EReg("[0-9A-F]","i").match((function($this) {
				var $r;
				var this17 = $this.buffer.get($this.cursor);
				$r = String.fromCharCode(this17);
				return $r;
			}(this)))) {
				var this18 = this.buffer.get(this.cursor);
				scol += String.fromCharCode(this18);
				this.advance();
			}
			var color = tannus_graphics__$Color_TColor.fromString(scol);
			return tannus_css_Value.VColor(color);
		} else if((function($this) {
			var $r;
			var this19 = $this.buffer.get($this.cursor);
			$r = this19 == 34;
			return $r;
		}(this)) || (function($this) {
			var $r;
			var this20 = $this.buffer.get($this.cursor);
			$r = this20 == 39;
			return $r;
		}(this))) {
			var del = this.buffer.get(this.cursor);
			var str = "";
			this.advance();
			while(!(this.cursor == this.buffer._length - 1)) if((function($this) {
				var $r;
				var this21 = $this.buffer.get($this.cursor);
				$r = this21 == 92;
				return $r;
			}(this)) && (function($this) {
				var $r;
				var this22 = $this.buffer.get($this.cursor + 1);
				$r = this22 == del;
				return $r;
			}(this))) {
				this.advance();
				var this23 = this.advance();
				str += String.fromCharCode(this23);
			} else if((function($this) {
				var $r;
				var this24 = $this.buffer.get($this.cursor);
				$r = this24 == del;
				return $r;
			}(this))) {
				this.advance();
				break;
			} else {
				var this25 = this.buffer.get(this.cursor);
				str += String.fromCharCode(this25);
				this.advance();
			}
			return tannus_css_Value.VString(str);
		} else if((function($this) {
			var $r;
			var this26 = $this.buffer.get($this.cursor);
			$r = this26 == 40;
			return $r;
		}(this))) {
			var stup = tannus_io_impl_JavaScriptBinary.ofString("");
			var l = 1;
			this.advance();
			while(!(this.cursor == this.buffer._length - 1) && l > 0) {
				var _g = this.buffer.get(this.cursor);
				switch(_g) {
				case 40:
					l++;
					break;
				case 41:
					l--;
					break;
				default:
					null;
				}
				if(l > 0) stup.push(this.buffer.get(this.cursor));
				this.advance();
			}
			var other = tannus_io_impl_JavaScriptBinary.ofString(" ");
			stup.append(other);
			var tup = [];
			if(!(stup._length <= 0)) {
				var old_buffer = this.buffer.copy();
				var old_tree = this.tree.slice();
				var old_cursor = this.cursor;
				this.buffer = stup;
				this.cursor = 0;
				this.tree = [];
				while(!(this.cursor == this.buffer._length - 1)) {
					var v = this.parseNext();
					tup.push(v);
					if((function($this) {
						var $r;
						var this27 = $this.buffer.get($this.cursor);
						$r = this27 == 44;
						return $r;
					}(this))) this.advance(); else if(!(this.cursor == this.buffer._length - 1)) {
						var e1 = "CSSValueError: Missing \",\"!";
						throw new js__$Boot_HaxeError(e1);
					}
				}
				this.buffer = old_buffer.copy();
				this.tree = old_tree.slice();
				this.cursor = old_cursor;
			}
			return tannus_css_Value.VTuple(tup);
		} else {
			tannus_css_vals_Lexer.unex(this.buffer.get(this.cursor));
			return tannus_css_Value.VNumber(0);
		}
	}
	,reset: function() {
		this.buffer = tannus_io_impl_JavaScriptBinary.ofString("");
		this.cursor = 0;
		this.tree = [];
	}
	,saveState: function() {
		return { 'buffer' : this.buffer.copy(), 'tree' : this.tree.slice(), 'cursor' : this.cursor};
	}
	,loadState: function(state) {
		this.buffer = state.buffer.copy();
		this.tree = state.tree.slice();
		this.cursor = state.cursor;
	}
	,atend: function(d) {
		if(d == null) d = 0;
		return this.cursor + d == this.buffer._length - 1;
	}
	,advance: function(d) {
		if(d == null) d = 1;
		this.cursor += d;
		return this.buffer.get(this.cursor);
	}
	,next: function(d) {
		if(d == null) d = 1;
		return this.buffer.get(this.cursor + d);
	}
	,push: function(v) {
		this.tree.push(v);
	}
	,get_end: function() {
		return this.cursor == this.buffer._length - 1;
	}
	,get_cur: function() {
		return this.buffer.get(this.cursor);
	}
	,__class__: tannus_css_vals_Lexer
	,__properties__: {get_cur:"get_cur",get_end:"get_end"}
};
var tannus_css_vals__$Lexer_Err = $hxClasses["tannus.css.vals._Lexer.Err"] = { __ename__ : ["tannus","css","vals","_Lexer","Err"], __constructs__ : ["Unexpected","Eof"] };
tannus_css_vals__$Lexer_Err.Unexpected = function(c) { var $x = ["Unexpected",0,c]; $x.__enum__ = tannus_css_vals__$Lexer_Err; $x.toString = $estr; return $x; };
tannus_css_vals__$Lexer_Err.Eof = ["Eof",1];
tannus_css_vals__$Lexer_Err.Eof.toString = $estr;
tannus_css_vals__$Lexer_Err.Eof.__enum__ = tannus_css_vals__$Lexer_Err;
var tannus_css_vals__$Unit_Unit_$Impl_$ = {};
$hxClasses["tannus.css.vals._Unit.Unit_Impl_"] = tannus_css_vals__$Unit_Unit_$Impl_$;
tannus_css_vals__$Unit_Unit_$Impl_$.__name__ = ["tannus","css","vals","_Unit","Unit_Impl_"];
tannus_css_vals__$Unit_Unit_$Impl_$.__properties__ = {get_all:"get_all"}
tannus_css_vals__$Unit_Unit_$Impl_$.get_all = function() {
	return ["em","ex","ch","rem","vw","vh","%","cm","mm","in","px","pt","pc"];
};
tannus_css_vals__$Unit_Unit_$Impl_$.isValidUnit = function(s) {
	return Lambda.has(["em","ex","ch","rem","vw","vh","%","cm","mm","in","px","pt","pc"],s);
};
var tannus_dom__$Attributes_Attributes_$Impl_$ = {};
$hxClasses["tannus.dom._Attributes.Attributes_Impl_"] = tannus_dom__$Attributes_Attributes_$Impl_$;
tannus_dom__$Attributes_Attributes_$Impl_$.__name__ = ["tannus","dom","_Attributes","Attributes_Impl_"];
tannus_dom__$Attributes_Attributes_$Impl_$._new = function(e) {
	return new tannus_dom_CAttributes(e);
};
tannus_dom__$Attributes_Attributes_$Impl_$.get = function(this1,k) {
	return this1.get(k);
};
tannus_dom__$Attributes_Attributes_$Impl_$.set = function(this1,k,v) {
	return this1.set(k,v);
};
var tannus_dom_CAttributes = function(e) {
	this.element = e;
};
$hxClasses["tannus.dom.CAttributes"] = tannus_dom_CAttributes;
tannus_dom_CAttributes.__name__ = ["tannus","dom","CAttributes"];
tannus_dom_CAttributes.prototype = {
	exists: function(name) {
		return this.element.els[0].hasAttribute(name);
	}
	,get: function(name) {
		return this.element.els[0].getAttribute(name);
	}
	,set: function(name,value) {
		var _g = 0;
		var _g1 = this.element.els;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			e.setAttribute(name,Std.string(value));
		}
		return Std.string(value);
	}
	,remove: function(name) {
		var _g = 0;
		var _g1 = this.element.els;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			e.removeAttribute(name);
		}
	}
	,__class__: tannus_dom_CAttributes
};
var tannus_dom__$Data_Data_$Impl_$ = {};
$hxClasses["tannus.dom._Data.Data_Impl_"] = tannus_dom__$Data_Data_$Impl_$;
tannus_dom__$Data_Data_$Impl_$.__name__ = ["tannus","dom","_Data","Data_Impl_"];
tannus_dom__$Data_Data_$Impl_$._new = function(e) {
	return new tannus_dom_CData(e);
};
tannus_dom__$Data_Data_$Impl_$.get = function(this1,k) {
	return this1.get(k);
};
tannus_dom__$Data_Data_$Impl_$.set = function(this1,k,v) {
	this1.set(k,v);
};
var tannus_dom_CData = function(e) {
	this.el = e;
};
$hxClasses["tannus.dom.CData"] = tannus_dom_CData;
tannus_dom_CData.__name__ = ["tannus","dom","CData"];
tannus_dom_CData.prototype = {
	get: function(name) {
		if(!(this.el.els.length <= 0)) {
			var this1 = Reflect.getProperty(this.el.els[0],"__tandata").pub;
			return this1.get(name);
		} else return null;
	}
	,set: function(name,value) {
		var _g = 0;
		var _g1 = this.el.els;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			var this1 = Reflect.getProperty(e,"__tandata").pub;
			this1.set(name,value);
		}
	}
	,exists: function(name) {
		if(!(this.el.els.length <= 0)) return Reflect.getProperty(this.el.els[0],"__tandata").pub.exists(name); else return false;
	}
	,keys: function() {
		if(!(this.el.els.length <= 0)) return Reflect.getProperty(this.el.els[0],"__tandata").pub.keys(); else return [];
	}
	,ref: function(name) {
		return Reflect.getProperty(this.el.els[0],"__tandata").pub.field(name);
	}
	,nd: function(e) {
		return Reflect.getProperty(e,"__tandata");
	}
	,__class__: tannus_dom_CData
};
var tannus_dom_ElIter = function(e) {
	this.owner = e;
	this.index = 0;
};
$hxClasses["tannus.dom.ElIter"] = tannus_dom_ElIter;
tannus_dom_ElIter.__name__ = ["tannus","dom","ElIter"];
tannus_dom_ElIter.prototype = {
	hasNext: function() {
		return this.index < this.owner.els.length;
	}
	,next: function() {
		return this.owner.at(this.index++);
	}
	,__class__: tannus_dom_ElIter
};
var tannus_dom__$Element_Element_$Impl_$ = {};
$hxClasses["tannus.dom._Element.Element_Impl_"] = tannus_dom__$Element_Element_$Impl_$;
tannus_dom__$Element_Element_$Impl_$.__name__ = ["tannus","dom","_Element","Element_Impl_"];
tannus_dom__$Element_Element_$Impl_$._new = function(ctx) {
	return new tannus_dom_CElement(ctx);
};
tannus_dom__$Element_Element_$Impl_$.getAttribute = function(this1,k) {
	return this1.getAttribute(k);
};
tannus_dom__$Element_Element_$Impl_$.setAttribute = function(this1,k,v) {
	return this1.setAttribute(k,v);
};
tannus_dom__$Element_Element_$Impl_$.fromAny = function(o) {
	return new tannus_dom_CElement(o);
};
var tannus_dom_CElement = function(ctx) {
	this.els = [];
	this._style = new tannus_dom_CStyles(this);
	this._attr = new tannus_dom_CAttributes(this);
	this._data = new tannus_dom_CData(this);
	this.determineContext(ctx);
	this.initializeData();
};
$hxClasses["tannus.dom.CElement"] = tannus_dom_CElement;
tannus_dom_CElement.__name__ = ["tannus","dom","CElement"];
tannus_dom_CElement.parseDocument = function(code) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(code,"text/html");
	var nl = doc.querySelectorAll("body *, head *");
	var results = [];
	var _g1 = 0;
	var _g = nl.length;
	while(_g1 < _g) {
		var i = _g1++;
		var item = nl.item(i);
		if(js_Boot.__instanceof(item,HTMLElement)) results.push(item);
	}
	return tannus_ds_ArrayTools.unique(results);
};
tannus_dom_CElement.prototype = {
	remove: function() {
		var _g = 0;
		var _g1 = this.els;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			e.remove();
		}
	}
	,clone: function(deep) {
		if(deep == null) deep = false;
		var copy = new tannus_dom_CElement(null);
		copy.els = this.els.map(function(item) {
			return item.cloneNode(deep);
		});
		return copy;
	}
	,find: function(sel) {
		var res = new tannus_dom_CElement(null);
		var _g = 0;
		var _g1 = this.els;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			var nl = e.querySelectorAll(sel);
			var _g3 = 0;
			var _g2 = nl.length;
			while(_g3 < _g2) {
				var i = _g3++;
				var item = nl.item(i);
				if(js_Boot.__instanceof(item,HTMLElement)) res.els.push(item);
			}
		}
		return res;
	}
	,at: function(n) {
		return new tannus_dom_CElement(this.els[n]);
	}
	,contains: function(sel) {
		var sub = this.find(sel);
		return !(sub.els.length <= 0);
	}
	,'is': function(sel) {
		return this.els[0].matches(sel);
	}
	,children: function() {
		var rels = tannus_ds_ArrayTools.flatten(this.els.map(function(item) {
			var _g = [];
			var _g2 = 0;
			var _g1 = item.children.length;
			while(_g2 < _g1) {
				var i = _g2++;
				_g.push(item.children.item(i));
			}
			return _g;
		}));
		var res = new tannus_dom_CElement(null);
		res.els = rels;
		return res;
	}
	,append: function(child) {
		if(!(this.els.length <= 0)) {
			var _g = 0;
			var _g1 = child.els;
			while(_g < _g1.length) {
				var e = _g1[_g];
				++_g;
				this.els[0].appendChild(e);
			}
		}
	}
	,appendTo: function(par) {
		par.append(this);
	}
	,prepend: function(child) {
		if(!(this.els.length <= 0)) {
			var _g = 0;
			var _g1 = child.els;
			while(_g < _g1.length) {
				var e = _g1[_g];
				++_g;
				this.els[0].insertBefore(e,this.els[0].firstElementChild);
			}
		}
	}
	,prependTo: function(par) {
		par.prepend(this);
	}
	,add: function(item) {
		this.els = this.els.concat(item.els);
	}
	,after: function(content) {
		var _g = 0;
		var _g1 = this.els;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			var cont = content.clone(true);
			var _g2 = 0;
			var _g3 = cont.els;
			while(_g2 < _g3.length) {
				var c = _g3[_g2];
				++_g2;
				e.parentElement.insertBefore(c,e.nextSibling);
			}
		}
	}
	,before: function(content) {
		var _g = 0;
		var _g1 = this.els;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			var cont = content.clone(true);
			var _g2 = 0;
			var _g3 = cont.els;
			while(_g2 < _g3.length) {
				var c = _g3[_g2];
				++_g2;
				e.parentElement.insertBefore(c,e);
			}
		}
	}
	,getAttribute: function(name) {
		return this._attr.get(name);
	}
	,setAttribute: function(name,value) {
		return this._attr.set(name,value);
	}
	,hasAttribute: function(name) {
		return this._attr.exists(name);
	}
	,removeAttribute: function(name) {
		this._attr.remove(name);
	}
	,hasClass: function(name) {
		if(!(this.els.length <= 0)) return this.els[0].classList.contains(name); else return false;
	}
	,addClass: function(name) {
		var _g = 0;
		var _g1 = this.els;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(!e.classList.contains(name)) e.classList.add(name);
		}
	}
	,removeClass: function(name) {
		var _g = 0;
		var _g1 = this.els;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			e.classList.remove(name);
		}
	}
	,toggleClass: function(name) {
		var _g = 0;
		var _g1 = this.els;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			e.classList.toggle(name);
		}
	}
	,field: function(name,value) {
		if(this.els.length <= 0) return null;
		if(value == null) return Reflect.getProperty(this.els[0],name); else {
			Reflect.setProperty(this.els[0],name,value);
			return Reflect.getProperty(this.els[0],name);
		}
	}
	,on: function(name,handler) {
		var _g = 0;
		var _g1 = this.els;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			var nd = this.nodeData(e);
			e.addEventListener(name,handler);
			if(!nd.pri.exists("events")) {
				var val = tannus_ds_CObj.create({ });
				nd.pri.set("events",val);
			}
			var events = nd.pri.get("events");
			if(!events.exists(name)) {
				var val1 = [];
				events.set(name,val1);
			}
			events.get(name).push(handler);
		}
	}
	,off: function(name,handler) {
		var _g = 0;
		var _g1 = this.els;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(handler != null) e.removeEventListener(name,handler); else {
				var nd = this.nodeData(e);
				if(!nd.pri.exists("events")) {
					var val = tannus_ds_CObj.create({ });
					nd.pri.set("events",val);
				}
				var events = nd.pri.get("events");
				if(events.exists(name)) {
					var handlers = events.get(name);
					var _g2 = 0;
					while(_g2 < handlers.length) {
						var f = handlers[_g2];
						++_g2;
						e.removeEventListener(name,f);
					}
				}
			}
		}
	}
	,value: function() {
		var _g = this.get_tagname();
		switch(_g) {
		case "input":
			return this.field("value");
		default:
			return null;
		}
	}
	,iterator: function() {
		return new tannus_dom_ElIter(this);
	}
	,rect: function() {
		if(!(this.els.length <= 0)) {
			var cr = this.els[0].getBoundingClientRect();
			return new tannus_geom_CRectangle(cr.x,cr.y,cr.width,cr.height);
		} else return new tannus_geom_CRectangle(0,0,0,0);
	}
	,determineContext: function(ctx) {
		if(ctx == null) return; else if(typeof(ctx) == "string") this.determineStringContext(Std.string(ctx)); else if(js_Boot.__instanceof(ctx,HTMLElement)) this.els.push(ctx); else if(js_Boot.__instanceof(ctx,tannus_dom_CElement)) {
			var el = ctx;
			this.els = el.els;
		} else throw new js__$Boot_HaxeError("DOMError: Invalid Element context");
	}
	,determineStringContext: function(s) {
		s = StringTools.trim(s);
		if(StringTools.startsWith(s,"<")) this.els = tannus_dom_CElement.parseDocument(s); else {
			var nl = window.document.querySelectorAll(s);
			var _g1 = 0;
			var _g = nl.length;
			while(_g1 < _g) {
				var i = _g1++;
				var item = nl.item(i);
				if(js_Boot.__instanceof(item,HTMLElement)) this.els.push(item);
			}
		}
	}
	,initializeData: function() {
		var _g = 0;
		var _g1 = this.els;
		while(_g < _g1.length) {
			var el = _g1[_g];
			++_g;
			var e = el;
			if(!Object.prototype.hasOwnProperty.call(e,"__tandata")) {
				var value = { 'pri' : tannus_ds_CObj.create({ }), 'pub' : tannus_ds_CObj.create({ })};
				Reflect.setProperty(e,"__tandata",value);
				Reflect.getProperty(e,"__tandata");
			}
		}
	}
	,nodeData: function(e) {
		return Reflect.getProperty(e,"__tandata");
	}
	,get_length: function() {
		return this.els.length;
	}
	,get_empty: function() {
		return this.els.length <= 0;
	}
	,get_exists: function() {
		return !(this.els.length <= 0);
	}
	,get_first: function() {
		return this.els[0];
	}
	,get_css: function() {
		return this._style;
	}
	,get_attributes: function() {
		return this._attr;
	}
	,get_data: function() {
		return this._data;
	}
	,get_elements: function() {
		return this.els.map(function(item) {
			return new tannus_dom_CElement(item);
		});
	}
	,get_html: function() {
		if(!(this.els.length <= 0)) return this.els[0].innerHTML; else return "";
	}
	,set_html: function(v) {
		var _g = 0;
		var _g1 = this.els;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			e.innerHTML = v;
		}
		return v;
	}
	,get_text: function() {
		if(!(this.els.length <= 0)) {
			var result = "";
			var _g = 0;
			var _g1 = this.els;
			while(_g < _g1.length) {
				var e = _g1[_g];
				++_g;
				result += e.textContent;
			}
			return result;
		} else return "";
	}
	,set_text: function(v) {
		var _g = 0;
		var _g1 = this.els;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			e.textContent = v;
		}
		return v;
	}
	,get_tagname: function() {
		if(this.els.length <= 0) return ""; else return this.els[0].tagName.toLowerCase();
	}
	,__class__: tannus_dom_CElement
	,__properties__: {get_tagname:"get_tagname",set_text:"set_text",get_text:"get_text",set_html:"set_html",get_html:"get_html",get_elements:"get_elements",get_data:"get_data",get_attributes:"get_attributes",get_css:"get_css",get_first:"get_first",get_exists:"get_exists",get_empty:"get_empty",get_length:"get_length"}
};
var tannus_dom__$Styles_Styles_$Impl_$ = {};
$hxClasses["tannus.dom._Styles.Styles_Impl_"] = tannus_dom__$Styles_Styles_$Impl_$;
tannus_dom__$Styles_Styles_$Impl_$.__name__ = ["tannus","dom","_Styles","Styles_Impl_"];
tannus_dom__$Styles_Styles_$Impl_$._new = function(e) {
	return new tannus_dom_CStyles(e);
};
tannus_dom__$Styles_Styles_$Impl_$.get = function(this1,name) {
	return this1.get(name);
};
tannus_dom__$Styles_Styles_$Impl_$.set = function(this1,name,value) {
	return this1.set(name,value);
};
tannus_dom__$Styles_Styles_$Impl_$.toObject = function(this1) {
	return this1.toObject();
};
tannus_dom__$Styles_Styles_$Impl_$.write = function(this1,o) {
	this1.write(o);
};
var tannus_dom_CStyles = function(e) {
	this.element = e;
};
$hxClasses["tannus.dom.CStyles"] = tannus_dom_CStyles;
tannus_dom_CStyles.__name__ = ["tannus","dom","CStyles"];
tannus_dom_CStyles.prototype = {
	get: function(name) {
		if(this.element.els.length <= 0) return ""; else return this.first().getPropertyValue(name);
	}
	,set: function(name,value) {
		var _g = 0;
		var _g1 = this.all();
		while(_g < _g1.length) {
			var css = _g1[_g];
			++_g;
			css.setProperty(name,Std.string(value));
		}
		return Std.string(value);
	}
	,remove: function(name) {
		var _g = 0;
		var _g1 = this.all();
		while(_g < _g1.length) {
			var css = _g1[_g];
			++_g;
			css.removeProperty(name);
		}
	}
	,toObject: function() {
		var o = { };
		var css = this.first();
		if(css != null) {
			var _g1 = 0;
			var _g = css.length;
			while(_g1 < _g) {
				var i = _g1++;
				var name = css.item(i);
				var value = css.getPropertyValue(name);
				{
					Reflect.setProperty(o,name,value);
					Reflect.getProperty(o,name);
				}
			}
		}
		return o;
	}
	,write: function(o) {
		var _g = 0;
		var _g1 = this.all();
		while(_g < _g1.length) {
			var css = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = Reflect.fields(o);
			while(_g2 < _g3.length) {
				var name = _g3[_g2];
				++_g2;
				css.setProperty(name,Std.string(Reflect.getProperty(o,name)));
			}
		}
	}
	,first: function() {
		if(!(this.element.els.length <= 0)) return window.getComputedStyle(this.element.els[0]); else return null;
	}
	,all: function() {
		var _g = [];
		var _g1 = 0;
		var _g2 = this.element.els;
		while(_g1 < _g2.length) {
			var e = _g2[_g1];
			++_g1;
			_g.push(e.style);
		}
		return _g;
	}
	,__class__: tannus_dom_CStyles
};
var tannus_ds__$ActionStack_ActionStack_$Impl_$ = {};
$hxClasses["tannus.ds._ActionStack.ActionStack_Impl_"] = tannus_ds__$ActionStack_ActionStack_$Impl_$;
tannus_ds__$ActionStack_ActionStack_$Impl_$.__name__ = ["tannus","ds","_ActionStack","ActionStack_Impl_"];
tannus_ds__$ActionStack_ActionStack_$Impl_$._new = function() {
	return [];
};
tannus_ds__$ActionStack_ActionStack_$Impl_$.call = function(this1) {
	var _g = 0;
	while(_g < this1.length) {
		var action = this1[_g];
		++_g;
		action();
	}
};
tannus_ds__$ActionStack_ActionStack_$Impl_$.clone = function(this1) {
	return this1.slice();
};
var tannus_ds__$ActionStack_ParametricStack_$Impl_$ = {};
$hxClasses["tannus.ds._ActionStack.ParametricStack_Impl_"] = tannus_ds__$ActionStack_ParametricStack_$Impl_$;
tannus_ds__$ActionStack_ParametricStack_$Impl_$.__name__ = ["tannus","ds","_ActionStack","ParametricStack_Impl_"];
tannus_ds__$ActionStack_ParametricStack_$Impl_$._new = function() {
	return [];
};
tannus_ds__$ActionStack_ParametricStack_$Impl_$.call = function(this1,context) {
	var _g = 0;
	while(_g < this1.length) {
		var a = this1[_g];
		++_g;
		a(context);
	}
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
var tannus_ds_Either = $hxClasses["tannus.ds.Either"] = { __ename__ : ["tannus","ds","Either"], __constructs__ : ["Left","Right"] };
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
var tannus_ds_Grid = function(w,h) {
	this.w = w;
	this.h = h;
	var this1;
	this1 = new Array(w * h);
	this.data = this1;
};
$hxClasses["tannus.ds.Grid"] = tannus_ds_Grid;
tannus_ds_Grid.__name__ = ["tannus","ds","Grid"];
tannus_ds_Grid.prototype = {
	set: function(x,y,value) {
		if(!(x >= this.w || x < 0 || (y >= this.h || y < 0))) return this.data[x + y * this.w] = value; else return value;
	}
	,get: function(x,y) {
		if(x >= this.w || x < 0 || (y >= this.h || y < 0)) return null;
		return this.data[x + y * this.w];
	}
	,at: function(pos) {
		var _g = this;
		var ref;
		var g = (function(f,x,y) {
			return function() {
				return f(x,y);
			};
		})($bind(this,this.get),pos._x,pos._y);
		var s = (function(f1,x1,y1) {
			return function(a1) {
				return f1(x1,y1,a1);
			};
		})($bind(this,this.set),pos._x,pos._y);
		ref = new tannus_io__$Pointer_Ref(g,s);
		ref.deleter = function() {
			_g.remove(pos._x,pos._y);
		};
		return ref;
	}
	,valueAt: function(pos) {
		return this.get(pos._x,pos._y);
	}
	,remove: function(x,y) {
		var v = this.get(x,y);
		this.data[x + y * this.w] = null;
		return v != null;
	}
	,iterator: function() {
		return new tannus_ds__$Grid_GridValueIterator(this);
	}
	,positions: function() {
		return new tannus_ds__$Grid_GridPosIterator(this);
	}
	,index: function(x,y) {
		return x + y * this.w;
	}
	,get_length: function() {
		return this.data.length;
	}
	,__class__: tannus_ds_Grid
	,__properties__: {get_length:"get_length"}
};
var tannus_ds__$Grid_GridValueIterator = function(g) {
	this.grid = g;
	this.x = 0;
	this.y = 0;
};
$hxClasses["tannus.ds._Grid.GridValueIterator"] = tannus_ds__$Grid_GridValueIterator;
tannus_ds__$Grid_GridValueIterator.__name__ = ["tannus","ds","_Grid","GridValueIterator"];
tannus_ds__$Grid_GridValueIterator.prototype = {
	hasNext: function() {
		return !(this.x == this.grid.w - 1 && this.y == this.grid.h - 1);
	}
	,next: function() {
		var value = this.grid.get(this.x,this.y);
		if(this.x >= this.grid.w - 1) {
			this.x = 0;
			this.y++;
		} else this.x++;
		return value;
	}
	,__class__: tannus_ds__$Grid_GridValueIterator
};
var tannus_ds__$Grid_GridPosIterator = function(g) {
	this.grid = g;
	this.x = 0;
	this.y = 0;
};
$hxClasses["tannus.ds._Grid.GridPosIterator"] = tannus_ds__$Grid_GridPosIterator;
tannus_ds__$Grid_GridPosIterator.__name__ = ["tannus","ds","_Grid","GridPosIterator"];
tannus_ds__$Grid_GridPosIterator.prototype = {
	hasNext: function() {
		return !(this.x == this.grid.w && this.y == this.grid.h);
	}
	,next: function() {
		var pos = new tannus_ds_GridPos(this.x,this.y);
		if(this.x == this.grid.w) {
			this.x = 0;
			this.y++;
		} else this.x++;
		return pos;
	}
	,__class__: tannus_ds__$Grid_GridPosIterator
};
var tannus_ds_GridPos = function(x,y) {
	this._x = x;
	this._y = y;
};
$hxClasses["tannus.ds.GridPos"] = tannus_ds_GridPos;
tannus_ds_GridPos.__name__ = ["tannus","ds","GridPos"];
tannus_ds_GridPos.prototype = {
	left: function() {
		return new tannus_ds_GridPos(this._x - 1,this._y);
	}
	,right: function() {
		return new tannus_ds_GridPos(this._x + 1,this._y);
	}
	,top: function() {
		return new tannus_ds_GridPos(this._x,this._y - 1);
	}
	,bottom: function() {
		return new tannus_ds_GridPos(this._x,this._y + 1);
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,__class__: tannus_ds_GridPos
	,__properties__: {get_y:"get_y",get_x:"get_x"}
};
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
var tannus_ds_Memory = function() { };
$hxClasses["tannus.ds.Memory"] = tannus_ds_Memory;
tannus_ds_Memory.__name__ = ["tannus","ds","Memory"];
tannus_ds_Memory.uniqueIdInt = function() {
	var id = tannus_ds_Memory.state;
	tannus_ds_Memory.state++;
	return id;
};
tannus_ds_Memory.uniqueIdString = function(prefix) {
	if(prefix == null) prefix = "";
	return prefix + tannus_ds_Memory.uniqueIdInt();
};
tannus_ds_Memory.allocRandomId = function(digits) {
	var id = "";
	var r = new tannus_math_Random();
	var _g = 0;
	while(_g < digits) {
		var i = _g++;
		var range = [0,0];
		var letter = r.randbool();
		if(letter) {
			var upper = r.randbool();
			if(upper) range = [65,90]; else range = [97,122];
		} else range = [48,57];
		var c;
		var n = r.randint(range[0],range[1]);
		var this1;
		if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
		this1 = n;
		c = this1;
		id += String.fromCharCode(c);
	}
	if(Lambda.has(tannus_ds_Memory.used,id)) return tannus_ds_Memory.allocRandomId(digits); else {
		tannus_ds_Memory.used.push(id);
		return id;
	}
};
tannus_ds_Memory.freeRandomId = function(id) {
	return HxOverrides.remove(tannus_ds_Memory.used,id);
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
var tannus_ds__$Obj_Obj_$Impl_$ = {};
$hxClasses["tannus.ds._Obj.Obj_Impl_"] = tannus_ds__$Obj_Obj_$Impl_$;
tannus_ds__$Obj_Obj_$Impl_$.__name__ = ["tannus","ds","_Obj","Obj_Impl_"];
tannus_ds__$Obj_Obj_$Impl_$._new = function(o) {
	var this1;
	this1 = tannus_ds_CObj.create(o);
	return this1;
};
tannus_ds__$Obj_Obj_$Impl_$.toDyn = function(this1) {
	return this1.o;
};
tannus_ds__$Obj_Obj_$Impl_$.get = function(this1,key) {
	return this1.get(key);
};
tannus_ds__$Obj_Obj_$Impl_$.set = function(this1,key,val) {
	return this1.set(key,val);
};
tannus_ds__$Obj_Obj_$Impl_$.fromDynamic = function(d) {
	return tannus_ds_CObj.create(d);
};
var tannus_ds_CObj = function(obj) {
	this.o = obj;
	this.refCache = new haxe_ds_StringMap();
};
$hxClasses["tannus.ds.CObj"] = tannus_ds_CObj;
tannus_ds_CObj.__name__ = ["tannus","ds","CObj"];
tannus_ds_CObj.create = function(o) {
	if(js_Boot.__instanceof(o,tannus_ds_CObj)) return o; else return new tannus_ds_CObj(o);
};
tannus_ds_CObj.prototype = {
	keys: function() {
		return Reflect.fields(this.o);
	}
	,exists: function(key) {
		return Object.prototype.hasOwnProperty.call(this.o,key);
	}
	,get: function(key) {
		return Reflect.getProperty(this.o,key);
	}
	,set: function(key,val) {
		Reflect.setProperty(this.o,key,val);
		return this.get(key);
	}
	,field: function(key) {
		var _g = this;
		if(this.refCache.exists(key)) return this.refCache.get(key); else {
			var ref;
			var g = (function(f,a1) {
				return function() {
					return f(a1);
				};
			})($bind(this,this.get),key);
			var s = (function(f1,a11) {
				return function(a2) {
					return f1(a11,a2);
				};
			})($bind(this,this.set),key);
			ref = new tannus_io__$Pointer_Ref(g,s);
			this.refCache.set(key,ref);
			return ref;
		}
	}
	,remove: function(key) {
		return Reflect.deleteField(this.o,key);
	}
	,clone: function() {
		var klass = Type.getClass(this.o);
		if(klass != null) {
			var copi = Type.createEmptyInstance(klass);
			var ocopy = tannus_ds_CObj.create(copi);
			var _g = 0;
			var _g1 = this.keys();
			while(_g < _g1.length) {
				var k = _g1[_g];
				++_g;
				var val = this.get(k);
				ocopy.set(k,val);
			}
			return ocopy;
		} else return Reflect.copy(this.o);
	}
	,__class__: tannus_ds_CObj
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
var tannus_ds__$Ref_Ref_$Impl_$ = {};
$hxClasses["tannus.ds._Ref.Ref_Impl_"] = tannus_ds__$Ref_Ref_$Impl_$;
tannus_ds__$Ref_Ref_$Impl_$.__name__ = ["tannus","ds","_Ref","Ref_Impl_"];
tannus_ds__$Ref_Ref_$Impl_$._new = function(r) {
	return new tannus_ds_CRef(r);
};
tannus_ds__$Ref_Ref_$Impl_$.get = function(this1) {
	return this1.get();
};
tannus_ds__$Ref_Ref_$Impl_$.toString = function(this1) {
	return Std.string(this1.get());
};
var tannus_ds_CRef = function(g) {
	this.getter = g;
	this._value = null;
};
$hxClasses["tannus.ds.CRef"] = tannus_ds_CRef;
tannus_ds_CRef.__name__ = ["tannus","ds","CRef"];
tannus_ds_CRef.prototype = {
	get: function() {
		if(this._value == null) return this._value = this.getter(); else return this._value;
	}
	,__class__: tannus_ds_CRef
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
var tannus_ds__$Value_Value_$Impl_$ = {};
$hxClasses["tannus.ds._Value.Value_Impl_"] = tannus_ds__$Value_Value_$Impl_$;
tannus_ds__$Value_Value_$Impl_$.__name__ = ["tannus","ds","_Value","Value_Impl_"];
tannus_ds__$Value_Value_$Impl_$._new = function(g) {
	return new tannus_ds__$Value_CVal(g);
};
tannus_ds__$Value_Value_$Impl_$.get = function(this1) {
	return this1.get();
};
tannus_ds__$Value_Value_$Impl_$.toString = function(this1) {
	return Std.string(this1.get());
};
var tannus_ds__$Value_CVal = function(b) {
	this.base = b;
	this.mods = [];
};
$hxClasses["tannus.ds._Value.CVal"] = tannus_ds__$Value_CVal;
tannus_ds__$Value_CVal.__name__ = ["tannus","ds","_Value","CVal"];
tannus_ds__$Value_CVal.prototype = {
	modify: function(m) {
		this.mods.push(m);
	}
	,transform: function(t) {
		return new tannus_ds__$Value_CVal(tannus_io__$Getter_Getter_$Impl_$.transform($bind(this,this.get),t));
	}
	,get: function() {
		var result = this.base();
		var _g = 0;
		var _g1 = this.mods;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			result = m(result);
		}
		return result;
	}
	,__class__: tannus_ds__$Value_CVal
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
var tannus_ds_tuples__$Tup4_Tup4_$Impl_$ = {};
$hxClasses["tannus.ds.tuples._Tup4.Tup4_Impl_"] = tannus_ds_tuples__$Tup4_Tup4_$Impl_$;
tannus_ds_tuples__$Tup4_Tup4_$Impl_$.__name__ = ["tannus","ds","tuples","_Tup4","Tup4_Impl_"];
tannus_ds_tuples__$Tup4_Tup4_$Impl_$.__properties__ = {set__3:"set__3",get__3:"get__3",set__2:"set__2",get__2:"get__2",set__1:"set__1",get__1:"get__1",set__0:"set__0",get__0:"get__0"}
tannus_ds_tuples__$Tup4_Tup4_$Impl_$._new = function(a,b,c,d) {
	return [a,b,c,d];
};
tannus_ds_tuples__$Tup4_Tup4_$Impl_$.get__0 = function(this1) {
	return this1[0];
};
tannus_ds_tuples__$Tup4_Tup4_$Impl_$.set__0 = function(this1,v) {
	return this1[0] = v;
};
tannus_ds_tuples__$Tup4_Tup4_$Impl_$.get__1 = function(this1) {
	return this1[1];
};
tannus_ds_tuples__$Tup4_Tup4_$Impl_$.set__1 = function(this1,v) {
	return this1[1] = v;
};
tannus_ds_tuples__$Tup4_Tup4_$Impl_$.get__2 = function(this1) {
	return this1[2];
};
tannus_ds_tuples__$Tup4_Tup4_$Impl_$.set__2 = function(this1,v) {
	return this1[2] = v;
};
tannus_ds_tuples__$Tup4_Tup4_$Impl_$.get__3 = function(this1) {
	return this1[3];
};
tannus_ds_tuples__$Tup4_Tup4_$Impl_$.set__3 = function(this1,v) {
	return this1[3] = v;
};
var tannus_events_Event = function(variety,bubbls) {
	if(bubbls == null) bubbls = false;
	this.type = variety;
	this.date = new Date().getTime();
	this._bubbles = bubbls;
	this._defaultPrevented = false;
	this._cancelled = false;
	this.onCancelled = new tannus_io_VoidSignal();
	this.onDefaultPrevented = new tannus_io_VoidSignal();
	this.onPropogationStopped = new tannus_io_VoidSignal();
};
$hxClasses["tannus.events.Event"] = tannus_events_Event;
tannus_events_Event.__name__ = ["tannus","events","Event"];
tannus_events_Event.prototype = {
	cancel: function() {
		this._cancelled = true;
		this.onCancelled.call();
	}
	,preventDefault: function() {
		this._defaultPrevented = true;
		this.onDefaultPrevented.call();
	}
	,stopPropogation: function() {
		this.onPropogationStopped.call();
	}
	,get_bubbles: function() {
		return this._bubbles;
	}
	,get_cancelled: function() {
		return this._cancelled;
	}
	,get_defaultPrevented: function() {
		return this._defaultPrevented;
	}
	,__class__: tannus_events_Event
	,__properties__: {get_defaultPrevented:"get_defaultPrevented",get_cancelled:"get_cancelled",get_bubbles:"get_bubbles"}
};
var tannus_events__$Key_Key_$Impl_$ = {};
$hxClasses["tannus.events._Key.Key_Impl_"] = tannus_events__$Key_Key_$Impl_$;
tannus_events__$Key_Key_$Impl_$.__name__ = ["tannus","events","_Key","Key_Impl_"];
tannus_events__$Key_Key_$Impl_$.__properties__ = {get_name:"get_name"}
tannus_events__$Key_Key_$Impl_$.get_name = function(this1) {
	return tannus_events__$Key_Key_$Impl_$.nameof(this1);
};
tannus_events__$Key_Key_$Impl_$.nameof = function(key) {
	var _g = 0;
	var _g1;
	var this1 = tannus_events__$Key_Key_$Impl_$.raw;
	_g1 = Reflect.fields(this1).map(function(k) {
		return { 'name' : k, 'value' : Reflect.getProperty(this1,k)};
	});
	while(_g < _g1.length) {
		var pair = _g1[_g];
		++_g;
		if(pair.value == key) return pair.name;
	}
	return null;
};
var tannus_events_KeyboardEvent = function(type,code,emods) {
	tannus_events_Event.call(this,type);
	this.keyCode = code;
	this.key = this.keyCode;
	if(emods != null) this.mods = emods; else this.mods = [];
	this.altKey = Lambda.has(this.mods,"alt");
	this.ctrlKey = Lambda.has(this.mods,"ctrl");
	this.shiftKey = Lambda.has(this.mods,"shift");
	this.metaKey = Lambda.has(this.mods,"super");
};
$hxClasses["tannus.events.KeyboardEvent"] = tannus_events_KeyboardEvent;
tannus_events_KeyboardEvent.__name__ = ["tannus","events","KeyboardEvent"];
tannus_events_KeyboardEvent.fromJqEvent = function(e) {
	var mods = [];
	if(e.altKey) mods.push("alt");
	if(e.ctrlKey) mods.push("ctrl");
	if(e.shiftKey) mods.push("shift");
	if(e.metaKey) mods.push("super");
	var res = new tannus_events_KeyboardEvent(e.type,e.keyCode,mods);
	res.onDefaultPrevented.once($bind(e,e.preventDefault));
	res.onPropogationStopped.once($bind(e,e.stopPropagation));
	return res;
};
tannus_events_KeyboardEvent.__super__ = tannus_events_Event;
tannus_events_KeyboardEvent.prototype = $extend(tannus_events_Event.prototype,{
	__class__: tannus_events_KeyboardEvent
});
var tannus_events_MouseEvent = function(type,pos,btn,mods) {
	if(btn == null) btn = -1;
	tannus_events_Event.call(this,type);
	this.position = pos;
	this.button = btn;
	this.emods = mods != null?mods:[];
};
$hxClasses["tannus.events.MouseEvent"] = tannus_events_MouseEvent;
tannus_events_MouseEvent.__name__ = ["tannus","events","MouseEvent"];
tannus_events_MouseEvent.fromJqEvent = function(event) {
	var mods = [];
	if(event.shiftKey) mods.push("shift");
	if(event.altKey) mods.push("alt");
	if(event.ctrlKey) mods.push("ctrl");
	if(event.metaKey) mods.push("super");
	var pos = new tannus_geom_TPoint(event.pageX,event.pageY,0);
	var result = new tannus_events_MouseEvent(event.type,pos,event.which,mods);
	result.onDefaultPrevented.once($bind(event,event.preventDefault));
	result.onPropogationStopped.once($bind(event,event.stopPropagation));
	return result;
};
tannus_events_MouseEvent.fromJsEvent = function(event) {
	var mods = [];
	if(event.shiftKey) mods.push("shift");
	if(event.altKey) mods.push("alt");
	if(event.ctrlKey) mods.push("ctrl");
	if(event.metaKey) mods.push("super");
	var pos = new tannus_geom_TPoint(event.pageX,event.pageY,0);
	var e = new tannus_events_MouseEvent(event.type,pos,event.which,mods);
	e.onCancelled.once($bind(event,event.preventDefault));
	e.onDefaultPrevented.once($bind(event,event.preventDefault));
	e.onPropogationStopped.once($bind(event,event.stopPropagation));
	return e;
};
tannus_events_MouseEvent.__super__ = tannus_events_Event;
tannus_events_MouseEvent.prototype = $extend(tannus_events_Event.prototype,{
	get_shiftKey: function() {
		return Lambda.has(this.emods,"shift");
	}
	,get_altKey: function() {
		return Lambda.has(this.emods,"alt");
	}
	,get_ctrlKey: function() {
		return Lambda.has(this.emods,"ctrl");
	}
	,get_metaKey: function() {
		return Lambda.has(this.emods,"super");
	}
	,__class__: tannus_events_MouseEvent
	,__properties__: $extend(tannus_events_Event.prototype.__properties__,{get_metaKey:"get_metaKey",get_ctrlKey:"get_ctrlKey",get_altKey:"get_altKey",get_shiftKey:"get_shiftKey"})
});
var tannus_events_ResizeEvent = function(old_area,new_area) {
	tannus_events_Event.call(this,"resize");
	this.delta = [new_area,old_area];
};
$hxClasses["tannus.events.ResizeEvent"] = tannus_events_ResizeEvent;
tannus_events_ResizeEvent.__name__ = ["tannus","events","ResizeEvent"];
tannus_events_ResizeEvent.__super__ = tannus_events_Event;
tannus_events_ResizeEvent.prototype = $extend(tannus_events_Event.prototype,{
	__class__: tannus_events_ResizeEvent
});
var tannus_events_ScrollEvent = function(delt) {
	tannus_events_Event.call(this,"scroll");
	this.delta = delt;
};
$hxClasses["tannus.events.ScrollEvent"] = tannus_events_ScrollEvent;
tannus_events_ScrollEvent.__name__ = ["tannus","events","ScrollEvent"];
tannus_events_ScrollEvent.__super__ = tannus_events_Event;
tannus_events_ScrollEvent.prototype = $extend(tannus_events_Event.prototype,{
	__class__: tannus_events_ScrollEvent
});
var tannus_geom__$Angle_Angle_$Impl_$ = {};
$hxClasses["tannus.geom._Angle.Angle_Impl_"] = tannus_geom__$Angle_Angle_$Impl_$;
tannus_geom__$Angle_Angle_$Impl_$.__name__ = ["tannus","geom","_Angle","Angle_Impl_"];
tannus_geom__$Angle_Angle_$Impl_$._new = function(v) {
	return new tannus_geom_CAngle(v);
};
tannus_geom__$Angle_Angle_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_geom__$Angle_Angle_$Impl_$.toFloat = function(this1) {
	return this1.toFloat();
};
tannus_geom__$Angle_Angle_$Impl_$.fromFloat = function(v) {
	return new tannus_geom_CAngle(v);
};
var tannus_geom_CAngle = function(_v) {
	this.v = _v;
};
$hxClasses["tannus.geom.CAngle"] = tannus_geom_CAngle;
tannus_geom_CAngle.__name__ = ["tannus","geom","CAngle"];
tannus_geom_CAngle.prototype = {
	toString: function() {
		return this.v + "°";
	}
	,toFloat: function() {
		return this.v;
	}
	,get_degrees: function() {
		return this.v;
	}
	,set_degrees: function(_v) {
		return this.v = _v;
	}
	,get_radians: function() {
		return this.v * Math.PI / 180;
	}
	,set_radians: function(_v) {
		this.v = _v * (Math.PI / 180);
		return this.v * Math.PI / 180;
	}
	,get_x: function() {
		return Math.cos(this.v * Math.PI / 180);
	}
	,get_y: function() {
		return Math.sin(this.v * Math.PI / 180);
	}
	,__class__: tannus_geom_CAngle
	,__properties__: {get_y:"get_y",get_x:"get_x",set_radians:"set_radians",get_radians:"get_radians",set_degrees:"set_degrees",get_degrees:"get_degrees"}
};
var tannus_geom__$Area_Area_$Impl_$ = {};
$hxClasses["tannus.geom._Area.Area_Impl_"] = tannus_geom__$Area_Area_$Impl_$;
tannus_geom__$Area_Area_$Impl_$.__name__ = ["tannus","geom","_Area","Area_Impl_"];
tannus_geom__$Area_Area_$Impl_$.__properties__ = {set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width"}
tannus_geom__$Area_Area_$Impl_$._new = function(w,h) {
	if(h == null) h = 0;
	if(w == null) w = 0;
	return [w,h];
};
tannus_geom__$Area_Area_$Impl_$.get_width = function(this1) {
	return this1[0];
};
tannus_geom__$Area_Area_$Impl_$.set_width = function(this1,nw) {
	return this1[0] = nw;
};
tannus_geom__$Area_Area_$Impl_$.get_height = function(this1) {
	return this1[1];
};
tannus_geom__$Area_Area_$Impl_$.set_height = function(this1,nh) {
	return this1[1] = nh;
};
tannus_geom__$Area_Area_$Impl_$.clone = function(this1) {
	return [this1[0],this1[1]];
};
tannus_geom__$Area_Area_$Impl_$.resize = function(this1,nw,nh,mr) {
	if(mr == null) mr = false;
	if(mr) {
		var w = this1[0];
		var h = this1[1];
		if(nw != null) {
			var rat = h / w;
			w = nw;
			h = w * rat;
			return [w,h];
		} else if(nh != null) {
			var rat1 = w / h;
			h = nh;
			w = h * rat1;
			return [w,h];
		} else throw new js__$Boot_HaxeError("GeometryError: Cannot maintain ration if both [width] and [height] are assigned!");
	} else {
		var w1;
		if(nw != null) w1 = nw; else w1 = this1[0];
		var h1;
		if(nh != null) h1 = nh; else h1 = this1[1];
		return [w1,h1];
	}
};
tannus_geom__$Area_Area_$Impl_$.toFloatTuple = function(this1) {
	return this1;
};
tannus_geom__$Area_Area_$Impl_$.toIntTuple = function(this1) {
	var a = Math.round(this1[0]);
	var b = Math.round(this1[1]);
	return [a,b];
};
tannus_geom__$Area_Area_$Impl_$.fromTwoTuple = function(t) {
	return [t[0],t[1]];
};
tannus_geom__$Area_Area_$Impl_$.toRectangle = function(this1) {
	return new tannus_geom_CRectangle(0,0,this1[0],this1[1]);
};
tannus_geom__$Area_Area_$Impl_$.fromRectangle = function(r) {
	return [r.width,r.height];
};
tannus_geom__$Area_Area_$Impl_$.toString = function(this1) {
	return "Area<" + this1[0] + "x" + this1[1] + ">";
};
tannus_geom__$Area_Area_$Impl_$.fromString = function(s) {
	var w;
	var h;
	s = StringTools.replace(StringTools.replace(StringTools.replace(s,"Area",""),"<",""),">","");
	var a = s.split("x").map((function(f) {
		return function(x) {
			return f(x);
		};
	})(Std.parseFloat));
	return [a[0],a[1]];
};
tannus_geom__$Area_Area_$Impl_$.toFloatArray = function(this1) {
	return [this1[0],this1[1]];
};
tannus_geom__$Area_Area_$Impl_$.toIntArray = function(this1) {
	return [this1[0],this1[1]].map(Math.round);
};
tannus_geom__$Area_Area_$Impl_$.fromFloatArray = function(a) {
	return [a[0],a[1]];
};
tannus_geom__$Area_Area_$Impl_$.fromIntArray = function(a) {
	return [a[0],a[1]];
};
tannus_geom__$Area_Area_$Impl_$.i = function(f) {
	return Math.round(f);
};
var tannus_geom_OldArea = function(w,h) {
	if(h == null) h = 0;
	if(w == null) w = 0;
	this.width = w;
	this.height = h;
};
$hxClasses["tannus.geom.OldArea"] = tannus_geom_OldArea;
tannus_geom_OldArea.__name__ = ["tannus","geom","OldArea"];
tannus_geom_OldArea.prototype = {
	__class__: tannus_geom_OldArea
};
var tannus_geom_Line = function(o,t) {
	this.one = o;
	this.two = t;
};
$hxClasses["tannus.geom.Line"] = tannus_geom_Line;
tannus_geom_Line.__name__ = ["tannus","geom","Line"];
tannus_geom_Line.prototype = {
	intersects: function(other) {
		var sl = new tannus_geom_Line(this.two.minusPoint(this.one),other.two.minusPoint(other.one));
		var s = (-sl.one.get_y() * (this.one.get_x() - other.one.get_x()) + sl.one.get_x() * (this.one.get_y() - other.one.get_y())) / (-sl.two.get_x() * sl.one.get_y() + sl.one.get_x() * sl.two.get_y());
		var t = (sl.two.get_x() * (this.one.get_y() - other.one.get_y()) - sl.two.get_y() * (this.one.get_x() - other.one.get_x())) / (-sl.two.get_x() * sl.one.get_y() + sl.one.get_x() * sl.two.get_y());
		return s >= 0 && s <= 1 && (t >= 0 && t <= 1);
	}
	,toString: function() {
		return "Line<(" + this.one.get_x() + ", " + this.one.get_y() + ") => (" + this.two.get_x() + ", " + this.two.get_y() + ")>";
	}
	,getPoint: function(d) {
		var dist = d;
		var vel;
		var angle = this.one.angleTo(this.two);
		vel = new tannus_geom_CVelocity(dist,angle);
		var res = vel.get_vector();
		res.moveByPoint(this.one);
		res.clamp();
		return res;
	}
	,getVertices: function() {
		var pts = [];
		this.one.clamp();
		this.two.clamp();
		var _g1 = 0;
		var _g = Math.round(this.one.distanceFrom(this.two));
		while(_g1 < _g) {
			var i = _g1++;
			pts.push(this.getPoint(i));
		}
		return new tannus_geom_VertexArray(pts);
	}
	,get_length: function() {
		return this.one.distanceFrom(this.two);
	}
	,get_start: function() {
		return this.one;
	}
	,set_start: function(ns) {
		return this.one = ns;
	}
	,get_end: function() {
		return this.two;
	}
	,set_end: function(ne) {
		return this.two = ne;
	}
	,get_angle: function() {
		return this.one.angleTo(this.two);
	}
	,get_rectangle: function() {
		var min;
		if(this.one.distanceFrom(new tannus_geom_TPoint(0,0,0)) > this.two.distanceFrom(new tannus_geom_TPoint(0,0,0))) min = this.two; else min = this.one;
		var max;
		if(this.one.distanceFrom(new tannus_geom_TPoint(0,0,0)) > this.two.distanceFrom(new tannus_geom_TPoint(0,0,0))) max = this.one; else max = this.two;
		var _x = min.get_x();
		var _y = min.get_y();
		var _width = max.get_x() - min.get_x();
		var _height = max.get_y() - min.get_y();
		return new tannus_geom_CRectangle(_x,_y,_width,_height);
	}
	,get_sx: function() {
		return this.one.get_x();
	}
	,set_sx: function(v) {
		return this.one.set_x(v);
	}
	,get_sy: function() {
		return this.one.get_y();
	}
	,set_sy: function(v) {
		return this.one.set_y(v);
	}
	,get_ex: function() {
		return this.two.get_x();
	}
	,set_ex: function(v) {
		return this.two.set_x(v);
	}
	,get_ey: function() {
		return this.two.get_y();
	}
	,set_ey: function(v) {
		return this.two.set_y(v);
	}
	,__class__: tannus_geom_Line
	,__properties__: {set_ey:"set_ey",get_ey:"get_ey",set_ex:"set_ex",get_ex:"get_ex",set_sy:"set_sy",get_sy:"get_sy",set_sx:"set_sx",get_sx:"get_sx",get_rectangle:"get_rectangle",get_angle:"get_angle",set_end:"set_end",get_end:"get_end",set_start:"set_start",get_start:"get_start",get_length:"get_length"}
};
var tannus_geom_Matrix = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
};
$hxClasses["tannus.geom.Matrix"] = tannus_geom_Matrix;
tannus_geom_Matrix.__name__ = ["tannus","geom","Matrix"];
tannus_geom_Matrix.prototype = {
	clone: function() {
		return new tannus_geom_Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	,copyFrom: function(sourceMatrix) {
		this.a = sourceMatrix.a;
		this.b = sourceMatrix.b;
		this.c = sourceMatrix.c;
		this.d = sourceMatrix.d;
		this.tx = sourceMatrix.tx;
		this.ty = sourceMatrix.ty;
	}
	,createBox: function(scaleX,scaleY,rotation,tx,ty) {
		if(ty == null) ty = 0;
		if(tx == null) tx = 0;
		if(rotation == null) rotation = 0;
		this.a = scaleX;
		this.d = scaleY;
		this.b = rotation;
		this.tx = tx;
		this.ty = ty;
	}
	,createGradientBox: function(width,height,rotation,tx,ty) {
		if(ty == null) ty = 0;
		if(tx == null) tx = 0;
		if(rotation == null) rotation = 0;
		this.a = width / 1638.4;
		this.d = height / 1638.4;
		if(rotation != 0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = 0;
			this.c = 0;
		}
		this.tx = tx + width / 2;
		this.ty = ty + height / 2;
	}
	,equals: function(matrix) {
		return matrix != null && this.tx == matrix.tx && this.ty == matrix.ty && this.a == matrix.a && this.b == matrix.b && this.c == matrix.c && this.d == matrix.d;
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,mult: function(m) {
		var result = new tannus_geom_Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
		result.concat(m);
		return result;
	}
	,rotate: function(theta) {
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	,scale: function(sx,sy) {
		this.a *= sx;
		this.b *= sy;
		this.c *= sx;
		this.d *= sy;
		this.tx *= sx;
		this.ty *= sy;
	}
	,setRotation: function(theta,scale) {
		if(scale == null) scale = 1;
		this.a = Math.cos(theta) * scale;
		this.c = Math.sin(theta) * scale;
		this.b = -this.c;
		this.d = this.a;
	}
	,setTo: function(a,b,c,d,tx,ty) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;
	}
	,toString: function() {
		return "Matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,transformPoint: function(pos) {
		var x = pos.get_x() * this.a + pos.get_y() * this.c + this.tx;
		var y = pos.get_x() * this.b + pos.get_y() * this.d + this.ty;
		return new tannus_geom_TPoint(x,y,0);
	}
	,__transformX: function(pos) {
		return pos.get_x() * this.a + pos.get_y() * this.c + this.tx;
	}
	,__transformY: function(pos) {
		return pos.get_x() * this.b + pos.get_y() * this.d + this.ty;
	}
	,translate: function(dx,dy) {
		var m = new tannus_geom_Matrix();
		m.tx = dx;
		m.ty = dy;
		this.concat(m);
	}
	,__cleanValues: function() {
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.tx = Math.round(this.tx * 10) / 10;
		this.ty = Math.round(this.ty * 10) / 10;
	}
	,__translateTransformed: function(pos) {
		this.tx = pos.get_x() * this.a + pos.get_y() * this.c + this.tx;
		this.ty = pos.get_x() * this.b + pos.get_y() * this.d + this.ty;
	}
	,__class__: tannus_geom_Matrix
};
var tannus_geom__$Point_Point_$Impl_$ = {};
$hxClasses["tannus.geom._Point.Point_Impl_"] = tannus_geom__$Point_Point_$Impl_$;
tannus_geom__$Point_Point_$Impl_$.__name__ = ["tannus","geom","_Point","Point_Impl_"];
tannus_geom__$Point_Point_$Impl_$.__properties__ = {get_d:"get_d",set_iz:"set_iz",get_iz:"get_iz",set_iy:"set_iy",get_iy:"get_iy",set_ix:"set_ix",get_ix:"get_ix",set_z:"set_z",get_z:"get_z",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"}
tannus_geom__$Point_Point_$Impl_$._new = function(x,y,z) {
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	return new tannus_geom_TPoint(x,y,z);
};
tannus_geom__$Point_Point_$Impl_$.get_x = function(this1) {
	return this1.get_x();
};
tannus_geom__$Point_Point_$Impl_$.set_x = function(this1,nx) {
	return this1.set_x(nx);
};
tannus_geom__$Point_Point_$Impl_$.get_y = function(this1) {
	return this1.get_y();
};
tannus_geom__$Point_Point_$Impl_$.set_y = function(this1,ny) {
	return this1.set_y(ny);
};
tannus_geom__$Point_Point_$Impl_$.get_z = function(this1) {
	return this1.get_z();
};
tannus_geom__$Point_Point_$Impl_$.set_z = function(this1,nz) {
	return this1.set_z(nz);
};
tannus_geom__$Point_Point_$Impl_$.get_ix = function(this1) {
	return tannus_math_TMath.i(this1.get_x());
};
tannus_geom__$Point_Point_$Impl_$.set_ix = function(this1,nix) {
	return tannus_math_TMath.i(this1.set_x(nix));
};
tannus_geom__$Point_Point_$Impl_$.get_iy = function(this1) {
	return tannus_math_TMath.i(this1.get_y());
};
tannus_geom__$Point_Point_$Impl_$.set_iy = function(this1,niy) {
	return tannus_math_TMath.i(this1.set_y(niy));
};
tannus_geom__$Point_Point_$Impl_$.get_iz = function(this1) {
	return tannus_math_TMath.i(this1.get_z());
};
tannus_geom__$Point_Point_$Impl_$.set_iz = function(this1,niz) {
	return tannus_math_TMath.i(this1.set_z(niz));
};
tannus_geom__$Point_Point_$Impl_$.get_d = function(this1) {
	return this1.distanceFrom(new tannus_geom_TPoint(0,0,0));
};
tannus_geom__$Point_Point_$Impl_$.transform = function(this1,m) {
	return m.transformPoint(this1.clone());
};
tannus_geom__$Point_Point_$Impl_$.moveByPoint = function(this1,p) {
	return this1.moveByPoint(p);
};
tannus_geom__$Point_Point_$Impl_$.moveByFloat = function(this1,n) {
	return this1.moveByFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.moveByInt = function(this1,n) {
	return this1.moveByFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.plusPoint = function(this1,other) {
	return this1.plusPoint(other);
};
tannus_geom__$Point_Point_$Impl_$.plusFloat = function(this1,n) {
	return this1.plusFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.plusInt = function(this1,n) {
	return this1.plusFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.iminusPoint = function(this1,p) {
	return this1.iminusPoint(p);
};
tannus_geom__$Point_Point_$Impl_$.iminusFloat = function(this1,n) {
	return this1.iminusFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.minusPoint = function(this1,p) {
	return this1.minusPoint(p);
};
tannus_geom__$Point_Point_$Impl_$.minusFloat = function(this1,n) {
	return this1.minusFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.minusInt = function(this1,n) {
	return this1.minusFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.dividePoint = function(this1,p) {
	return this1.dividePoint(p);
};
tannus_geom__$Point_Point_$Impl_$.divideFloat = function(this1,d) {
	return this1.divideFloat(d);
};
tannus_geom__$Point_Point_$Impl_$.multPoint = function(this1,p) {
	return this1.multPoint(p);
};
tannus_geom__$Point_Point_$Impl_$.multFloat = function(this1,n) {
	return this1.multFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.negate = function(this1) {
	return this1.negate();
};
tannus_geom__$Point_Point_$Impl_$.greaterThan = function(this1,other) {
	return this1.distanceFrom(new tannus_geom_TPoint(0,0,0)) > other.distanceFrom(new tannus_geom_TPoint(0,0,0));
};
tannus_geom__$Point_Point_$Impl_$.lessThan = function(this1,other) {
	return !(this1.distanceFrom(new tannus_geom_TPoint(0,0,0)) > other.distanceFrom(new tannus_geom_TPoint(0,0,0)));
};
tannus_geom__$Point_Point_$Impl_$.equals = function(this1,p) {
	return this1.equals(p);
};
tannus_geom__$Point_Point_$Impl_$.nequals = function(this1,p) {
	return this1.nequals(p);
};
tannus_geom__$Point_Point_$Impl_$.vectorize = function(this1,r) {
	var x;
	var what = this1.get_x();
	x = tannus_math__$Percent_Percent_$Impl_$.percent(what,r.width);
	var y;
	var what1 = this1.get_y();
	y = tannus_math__$Percent_Percent_$Impl_$.percent(what1,r.height);
	return new tannus_geom_TPoint(x,y,0);
};
tannus_geom__$Point_Point_$Impl_$.devectorize = function(this1,r) {
	var px;
	var f = this1.get_x();
	px = f;
	var py;
	var f1 = this1.get_y();
	py = f1;
	return new tannus_geom_TPoint(r.width * (px / 100),r.height * (py / 100),0);
};
tannus_geom__$Point_Point_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_geom__$Point_Point_$Impl_$.toArray = function(this1) {
	return this1.toArray();
};
tannus_geom__$Point_Point_$Impl_$.fromFloatArray = function(a) {
	return tannus_geom_TPoint.fromFloatArray(a);
};
tannus_geom__$Point_Point_$Impl_$.fromIntArray = function(a) {
	return tannus_geom_TPoint.fromFloatArray(a);
};
tannus_geom__$Point_Point_$Impl_$.perc = function(what,of) {
	return tannus_math__$Percent_Percent_$Impl_$.percent(what,of);
};
tannus_geom__$Point_Point_$Impl_$.createLinked = function(x,y,z) {
	return new tannus_geom_LinkedPoint(x,y,z);
};
var tannus_geom_TPoint = function(x,y,z) {
	this._x = x;
	this._y = y;
	this._z = z;
};
$hxClasses["tannus.geom.TPoint"] = tannus_geom_TPoint;
tannus_geom_TPoint.__name__ = ["tannus","geom","TPoint"];
tannus_geom_TPoint.fromFloatArray = function(a) {
	var ma = a;
	return new tannus_geom_TPoint((function($this) {
		var $r;
		var this1 = ma[0];
		$r = this1 != null?this1:0;
		return $r;
	}(this)),(function($this) {
		var $r;
		var this2 = ma[1];
		$r = this2 != null?this2:0;
		return $r;
	}(this)),(function($this) {
		var $r;
		var this3 = ma[2];
		$r = this3 != null?this3:0;
		return $r;
	}(this)));
};
tannus_geom_TPoint.prototype = {
	angleTo: function(other) {
		var v = tannus_math_TMath.angleBetween(this.get_x(),this.get_y(),other.get_x(),other.get_y());
		return new tannus_geom_CAngle(v);
	}
	,distanceFrom: function(other) {
		return Math.sqrt(Math.pow(Math.abs(this.get_x() - other.get_x()),2) + Math.pow(Math.abs(this.get_y() - other.get_y()),2));
	}
	,copyFrom: function(p) {
		this.set_x(p.get_x());
		this.set_y(p.get_y());
		this.set_z(p.get_z());
	}
	,plusPoint: function(other) {
		var x = this.get_x() + other.get_x();
		var y = this.get_y() + other.get_y();
		var z = this.get_z() + other.get_z();
		return new tannus_geom_TPoint(x,y,z);
	}
	,plusFloat: function(n) {
		var x = this.get_x() + n;
		var y = this.get_y() + n;
		var z = this.get_z() + n;
		return new tannus_geom_TPoint(x,y,z);
	}
	,moveByPoint: function(other) {
		var _g = this;
		_g.set_x(_g.get_x() + other.get_x());
		var _g1 = this;
		_g1.set_y(_g1.get_y() + other.get_y());
		var _g2 = this;
		_g2.set_z(_g2.get_z() + other.get_z());
		return this;
	}
	,moveByFloat: function(n) {
		var _g = this;
		_g.set_x(_g.get_x() + n);
		var _g1 = this;
		_g1.set_y(_g1.get_y() + n);
		var _g2 = this;
		_g2.set_z(_g2.get_z() + n);
		return this;
	}
	,minusPoint: function(other) {
		var x = this.get_x() - other.get_x();
		var y = this.get_y() - other.get_y();
		var z = this.get_z() - other.get_z();
		return new tannus_geom_TPoint(x,y,z);
	}
	,minusFloat: function(n) {
		var x = this.get_x() - n;
		var y = this.get_y() - n;
		var z = this.get_z() - n;
		return new tannus_geom_TPoint(x,y,z);
	}
	,iminusPoint: function(other) {
		this.moveByPoint(other.negate());
		return this;
	}
	,iminusFloat: function(n) {
		this.moveByFloat(-n);
		return this;
	}
	,dividePoint: function(d) {
		var x = this.get_x() / d.get_x();
		var y = this.get_y() / d.get_y();
		var z;
		if(this.get_z() != 0) z = this.get_z() / d.get_z(); else z = 0;
		return new tannus_geom_TPoint(x,y,z);
	}
	,divideFloat: function(f) {
		var x = this.get_x() / f;
		var y = this.get_y() / f;
		var z;
		if(this.get_z() != 0) z = this.get_z() / f; else z = 0;
		return new tannus_geom_TPoint(x,y,z);
	}
	,multPoint: function(p) {
		var x = this.get_x() * p.get_x();
		var y = this.get_y() * p.get_y();
		var z = this.get_z() * p.get_z();
		return new tannus_geom_TPoint(x,y,z);
	}
	,multFloat: function(n) {
		var x = this.get_x() * n;
		var y = this.get_y() * n;
		var z = this.get_z() * n;
		return new tannus_geom_TPoint(x,y,z);
	}
	,negate: function() {
		return this.multFloat(-1);
	}
	,clone: function() {
		var x = this.get_x();
		var y = this.get_y();
		var z = this.get_z();
		return new tannus_geom_TPoint(x,y,z);
	}
	,clamp: function() {
		this.set_x(tannus_math_TMath.i(this.get_x()));
		this.set_y(tannus_math_TMath.i(this.get_y()));
		this.set_z(tannus_math_TMath.i(this.get_z()));
	}
	,clamped: function() {
		var x = tannus_math_TMath.i(this.get_x());
		var y = tannus_math_TMath.i(this.get_y());
		var z = tannus_math_TMath.i(this.get_z());
		return new tannus_geom_TPoint(x,y,z);
	}
	,lerp: function(other,weight) {
		var x = tannus_math_TMath.lerp(this.get_x(),other.get_x(),weight);
		var y = tannus_math_TMath.lerp(this.get_y(),other.get_y(),weight);
		var z = tannus_math_TMath.lerp(this.get_z(),other.get_z(),weight);
		return new tannus_geom_TPoint(x,y,z);
	}
	,mutate: function(f) {
		var x = f(this.get_x());
		var y = f(this.get_y());
		var z = f(this.get_z());
		return new tannus_geom_TPoint(x,y,z);
	}
	,imutate: function(f) {
		this.set_x(f(this.get_x()));
		this.set_y(f(this.get_y()));
		this.set_z(f(this.get_z()));
		return this;
	}
	,equals: function(other) {
		return this.get_x() == other.get_x() && this.get_y() == other.get_y() && this.get_z() == other.get_z();
	}
	,nequals: function(other) {
		return !this.equals(other);
	}
	,toString: function() {
		return "Point(" + this.get_x() + ", " + this.get_y() + ", " + this.get_z() + ")";
	}
	,toArray: function() {
		return [this.get_x(),this.get_y(),this.get_z()];
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,get_z: function() {
		return this._z;
	}
	,set_x: function(v) {
		return this._x = v;
	}
	,set_y: function(v) {
		return this._y = v;
	}
	,set_z: function(v) {
		return this._z = v;
	}
	,__class__: tannus_geom_TPoint
	,__properties__: {set_z:"set_z",get_z:"get_z",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"}
};
var tannus_geom_LinkedPoint = function(x,y,z) {
	var _g = this;
	tannus_geom_TPoint.call(this,0,0,0);
	this.rx = x;
	this.ry = y;
	if(z != null) this.rz = z; else this.rz = new tannus_io__$Pointer_Ref(function() {
		return _g._z;
	},function(v) {
		return _g._z = v;
	});
};
$hxClasses["tannus.geom.LinkedPoint"] = tannus_geom_LinkedPoint;
tannus_geom_LinkedPoint.__name__ = ["tannus","geom","LinkedPoint"];
tannus_geom_LinkedPoint.__super__ = tannus_geom_TPoint;
tannus_geom_LinkedPoint.prototype = $extend(tannus_geom_TPoint.prototype,{
	get_x: function() {
		return this.rx.get();
	}
	,get_y: function() {
		return this.ry.get();
	}
	,get_z: function() {
		return this.rz.get();
	}
	,set_x: function(v) {
		return this.rx.set(v);
	}
	,set_y: function(v) {
		return this.ry.set(v);
	}
	,set_z: function(v) {
		return this.rz.set(v);
	}
	,__class__: tannus_geom_LinkedPoint
});
var tannus_geom__$Rectangle_Rectangle_$Impl_$ = {};
$hxClasses["tannus.geom._Rectangle.Rectangle_Impl_"] = tannus_geom__$Rectangle_Rectangle_$Impl_$;
tannus_geom__$Rectangle_Rectangle_$Impl_$.__name__ = ["tannus","geom","_Rectangle","Rectangle_Impl_"];
tannus_geom__$Rectangle_Rectangle_$Impl_$._new = function(_x,_y,_width,_height) {
	if(_height == null) _height = 0;
	if(_width == null) _width = 0;
	if(_y == null) _y = 0;
	if(_x == null) _x = 0;
	return new tannus_geom_CRectangle(_x,_y,_width,_height);
};
tannus_geom__$Rectangle_Rectangle_$Impl_$.eq = function(this1,o) {
	return this1.equals(o);
};
tannus_geom__$Rectangle_Rectangle_$Impl_$.floatDiv = function(this1,o) {
	return this1.divide(tannus_ds__$EitherType_EitherType_$Impl_$.fromL(o));
};
tannus_geom__$Rectangle_Rectangle_$Impl_$.rectDiv = function(this1,r) {
	return this1.divide((function($this) {
		var $r;
		var e = tannus_ds_Either.Right(r);
		$r = e;
		return $r;
	}(this)));
};
tannus_geom__$Rectangle_Rectangle_$Impl_$.fromArray = function(a) {
	return new tannus_geom_CRectangle(a[0],a[1],a[2],a[3]);
};
var tannus_geom_Shape = function() { };
$hxClasses["tannus.geom.Shape"] = tannus_geom_Shape;
tannus_geom_Shape.__name__ = ["tannus","geom","Shape"];
tannus_geom_Shape.prototype = {
	__class__: tannus_geom_Shape
};
var tannus_geom_CRectangle = function(_x,_y,_width,_height) {
	if(_height == null) _height = 0;
	if(_width == null) _width = 0;
	if(_y == null) _y = 0;
	if(_x == null) _x = 0;
	this.x = _x;
	this.y = _y;
	this.z = 0;
	this.width = _width;
	this.height = _height;
	this.depth = 0;
};
$hxClasses["tannus.geom.CRectangle"] = tannus_geom_CRectangle;
tannus_geom_CRectangle.__name__ = ["tannus","geom","CRectangle"];
tannus_geom_CRectangle.__interfaces__ = [tannus_geom_Shape];
tannus_geom_CRectangle.perc = function(what,of) {
	return tannus_math__$Percent_Percent_$Impl_$.percent(what,of);
};
tannus_geom_CRectangle.prototype = {
	clone: function() {
		var r = new tannus_geom_CRectangle(this.x,this.y,this.width,this.height);
		r.z = this.z;
		r.depth = this.depth;
		return r;
	}
	,cloneFrom: function(other) {
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
		this.width = other.width;
		this.height = other.height;
		this.depth = other.depth;
	}
	,equals: function(other) {
		return this.x == other.x && this.y == other.y && this.z == other.z && this.width == other.width && this.height == other.height && this.depth == other.depth;
	}
	,divide: function(div) {
		{
			var _g = div;
			switch(_g[1]) {
			case 0:
				var f = _g[2];
				return new tannus_geom_CRectangle(this.x,this.y,this.width / f,this.height / f);
			case 1:
				var r = _g[2];
				return new tannus_geom_CRectangle(this.x,this.y,this.width / r.width,this.height / r.height);
			}
		}
	}
	,contains: function(ox,oy) {
		return ox > this.x && ox < this.x + this.width && (oy > this.y && oy < this.y + this.height);
	}
	,containsPoint: function(point) {
		return this.contains(point.get_x(),point.get_y());
	}
	,containsRect: function(o) {
		if(this.containsPoint(new tannus_geom_TPoint(o.x + o.width / 2,o.y + o.height / 2,0))) return true; else {
			var _g = 0;
			var _g1 = o.get_corners();
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(this.contains(p.get_x(),p.get_y())) return true;
			}
			return false;
		}
	}
	,vectorize: function(r) {
		var pos;
		var this1 = new tannus_geom_TPoint(this.x,this.y,0);
		var x;
		var what = this1.get_x();
		x = tannus_math__$Percent_Percent_$Impl_$.percent(what,r.width);
		var y;
		var what1 = this1.get_y();
		y = tannus_math__$Percent_Percent_$Impl_$.percent(what1,r.height);
		pos = new tannus_geom_TPoint(x,y,0);
		var dim;
		var w = tannus_math__$Percent_Percent_$Impl_$.percent(this.width,r.width);
		var h = tannus_math__$Percent_Percent_$Impl_$.percent(this.height,r.height);
		dim = [w,h];
		var _x = pos.get_x();
		var _y = pos.get_y();
		return new tannus_geom_CRectangle(_x,_y,dim[0],dim[1]);
	}
	,devectorize: function(r) {
		var px = this.x;
		var py = this.y;
		var pw = this.width;
		var ph = this.height;
		return new tannus_geom_CRectangle(r.width * (px / 100),r.height * (py / 100),r.width * (pw / 100),r.height * (ph / 100));
	}
	,getVertices: function() {
		var self = this;
		var verts;
		var v = [new tannus_geom_TPoint(self.x,self.y,0),new tannus_geom_TPoint(self.x + self.width,self.y,0),new tannus_geom_TPoint(self.x + self.width,self.y + self.height,0),new tannus_geom_TPoint(self.x,self.y + self.height,0)];
		verts = new tannus_geom_VertexArray(v);
		return verts;
	}
	,toString: function() {
		return "Rectangle(" + this.x + ", " + this.y + ", " + this.width + ", " + this.height + ")";
	}
	,get_position: function() {
		return new tannus_geom_TPoint(this.x,this.y,this.z);
	}
	,set_position: function(np) {
		this.x = np.get_x();
		this.y = np.get_y();
		this.z = np.get_z();
		return new tannus_geom_TPoint(this.x,this.y,this.z);
	}
	,get_corners: function() {
		return [new tannus_geom_TPoint(this.x,this.y,0),new tannus_geom_TPoint(this.x + this.width,this.y,0),new tannus_geom_TPoint(this.x,this.y + this.height,0),new tannus_geom_TPoint(this.x + this.width,this.y + this.height,0)];
	}
	,get_area: function() {
		return this.width * this.height;
	}
	,get_centerX: function() {
		return this.x + this.width / 2;
	}
	,set_centerX: function(v) {
		return this.x = v - this.width / 2;
	}
	,get_centerY: function() {
		return this.y + this.height / 2;
	}
	,set_centerY: function(v) {
		return this.y = v - this.height / 2;
	}
	,get_center: function() {
		return new tannus_geom_TPoint(this.x + this.width / 2,this.y + this.height / 2,0);
	}
	,set_center: function(nc) {
		this.set_centerX(nc.get_x());
		this.set_centerY(nc.get_y());
		return nc;
	}
	,get_topRight: function() {
		return new tannus_geom_TPoint(this.x + this.width,this.y,0);
	}
	,get_topLeft: function() {
		return new tannus_geom_TPoint(this.x,this.y,0);
	}
	,get_bottomLeft: function() {
		return new tannus_geom_TPoint(this.x,this.y + this.height,0);
	}
	,get_bottomRight: function() {
		return new tannus_geom_TPoint(this.x + this.width,this.y + this.height,0);
	}
	,get_w: function() {
		return this.width;
	}
	,set_w: function(nw) {
		return this.width = nw;
	}
	,get_h: function() {
		return this.height;
	}
	,set_h: function(nh) {
		return this.height = nh;
	}
	,get_d: function() {
		return this.depth;
	}
	,set_d: function(nd) {
		return this.depth = nd;
	}
	,__class__: tannus_geom_CRectangle
	,__properties__: {set_d:"set_d",get_d:"get_d",set_h:"set_h",get_h:"get_h",set_w:"set_w",get_w:"get_w",get_bottomRight:"get_bottomRight",get_bottomLeft:"get_bottomLeft",get_topLeft:"get_topLeft",get_topRight:"get_topRight",set_center:"set_center",get_center:"get_center",set_centerY:"set_centerY",get_centerY:"get_centerY",set_centerX:"set_centerX",get_centerX:"get_centerX",get_area:"get_area",get_corners:"get_corners",set_position:"set_position",get_position:"get_position"}
};
var tannus_geom_Triangle = function(x,y,z) {
	if(x != null) this.one = x; else this.one = new tannus_geom_TPoint(0,0,0);
	if(y != null) this.two = y; else this.two = new tannus_geom_TPoint(0,0,0);
	if(z != null) this.three = z; else this.three = new tannus_geom_TPoint(0,0,0);
};
$hxClasses["tannus.geom.Triangle"] = tannus_geom_Triangle;
tannus_geom_Triangle.__name__ = ["tannus","geom","Triangle"];
tannus_geom_Triangle.__interfaces__ = [tannus_geom_Shape];
tannus_geom_Triangle.prototype = {
	clone: function() {
		return new tannus_geom_Triangle(this.one.clone(),this.two.clone(),this.three.clone());
	}
	,vectorize: function(r) {
		var c = new tannus_geom_Triangle(this.one.clone(),this.two.clone(),this.three.clone());
		var this1 = this.one;
		var x;
		var what = this1.get_x();
		x = tannus_math__$Percent_Percent_$Impl_$.percent(what,r.width);
		var y;
		var what1 = this1.get_y();
		y = tannus_math__$Percent_Percent_$Impl_$.percent(what1,r.height);
		c.one = new tannus_geom_TPoint(x,y,0);
		var this2 = this.two;
		var x1;
		var what2 = this2.get_x();
		x1 = tannus_math__$Percent_Percent_$Impl_$.percent(what2,r.width);
		var y1;
		var what3 = this2.get_y();
		y1 = tannus_math__$Percent_Percent_$Impl_$.percent(what3,r.height);
		c.two = new tannus_geom_TPoint(x1,y1,0);
		var this3 = this.three;
		var x2;
		var what4 = this3.get_x();
		x2 = tannus_math__$Percent_Percent_$Impl_$.percent(what4,r.width);
		var y2;
		var what5 = this3.get_y();
		y2 = tannus_math__$Percent_Percent_$Impl_$.percent(what5,r.height);
		c.three = new tannus_geom_TPoint(x2,y2,0);
		return c;
	}
	,devectorize: function(r) {
		var c = new tannus_geom_Triangle(this.one.clone(),this.two.clone(),this.three.clone());
		var this1 = this.one;
		var px;
		var f = this1.get_x();
		px = f;
		var py;
		var f1 = this1.get_y();
		py = f1;
		c.one = new tannus_geom_TPoint(r.width * (px / 100),r.height * (py / 100),0);
		var this2 = this.two;
		var px1;
		var f2 = this2.get_x();
		px1 = f2;
		var py1;
		var f3 = this2.get_y();
		py1 = f3;
		c.two = new tannus_geom_TPoint(r.width * (px1 / 100),r.height * (py1 / 100),0);
		var this3 = this.three;
		var px2;
		var f4 = this3.get_x();
		px2 = f4;
		var py2;
		var f5 = this3.get_y();
		py2 = f5;
		c.three = new tannus_geom_TPoint(r.width * (px2 / 100),r.height * (py2 / 100),0);
		return c;
	}
	,getVertices: function() {
		{
			var lines = this.get_lines();
			var v = tannus_ds_ArrayTools.flatten((function($this) {
				var $r;
				var _g = [];
				{
					var _g1 = 0;
					while(_g1 < lines.length) {
						var l = lines[_g1];
						++_g1;
						_g.push([l.one,l.two]);
					}
				}
				$r = _g;
				return $r;
			}(this)));
			return new tannus_geom_VertexArray(v);
		}
	}
	,get_center: function() {
		var cx = (this.one.get_x() + this.two.get_x() + this.three.get_x()) / 3;
		var cy = (this.one.get_y() + this.two.get_y() + this.three.get_y()) / 3;
		var cz = (this.one.get_z() + this.two.get_z() + this.three.get_z()) / 3;
		return new tannus_geom_TPoint(cx,cy,cz);
	}
	,get_lines: function() {
		var la = [];
		la.push(new tannus_geom_Line(this.one,this.two));
		la.push(new tannus_geom_Line(this.two,this.three));
		la.push(new tannus_geom_Line(this.three,this.one));
		return la;
	}
	,get_points: function() {
		return [this.one,this.two,this.three];
	}
	,set_points: function(v) {
		this.one = v[0];
		this.two = v[1];
		this.three = v[2];
		return [this.one,this.two,this.three];
	}
	,__class__: tannus_geom_Triangle
	,__properties__: {set_points:"set_points",get_points:"get_points",get_lines:"get_lines",get_center:"get_center"}
};
var tannus_geom__$Velocity_Velocity_$Impl_$ = {};
$hxClasses["tannus.geom._Velocity.Velocity_Impl_"] = tannus_geom__$Velocity_Velocity_$Impl_$;
tannus_geom__$Velocity_Velocity_$Impl_$.__name__ = ["tannus","geom","_Velocity","Velocity_Impl_"];
tannus_geom__$Velocity_Velocity_$Impl_$._new = function(speed,angle) {
	return new tannus_geom_CVelocity(speed,angle);
};
tannus_geom__$Velocity_Velocity_$Impl_$.invert = function(this1) {
	return this1.invert();
};
tannus_geom__$Velocity_Velocity_$Impl_$.plus = function(this1,other) {
	return this1.plus(other);
};
tannus_geom__$Velocity_Velocity_$Impl_$.minus = function(this1,other) {
	return this1.minus(other);
};
tannus_geom__$Velocity_Velocity_$Impl_$.toPoint = function(this1) {
	return this1.get_vector();
};
tannus_geom__$Velocity_Velocity_$Impl_$.fromPoint = function(p) {
	return tannus_geom_CVelocity.fromPoint(p);
};
var tannus_geom_CVelocity = function(speed,angle) {
	this.speed = speed;
	this.angle = angle;
};
$hxClasses["tannus.geom.CVelocity"] = tannus_geom_CVelocity;
tannus_geom_CVelocity.__name__ = ["tannus","geom","CVelocity"];
tannus_geom_CVelocity.fromVector = function(x,y) {
	return tannus_geom_CVelocity.fromPoint(new tannus_geom_TPoint(x,y,0));
};
tannus_geom_CVelocity.fromPoint = function(p) {
	var vel;
	var angle = new tannus_geom_CAngle(0);
	vel = new tannus_geom_CVelocity(0,angle);
	vel.set_vector(p);
	return vel;
};
tannus_geom_CVelocity.prototype = {
	setVector: function(vx,vy) {
		var e = new tannus_geom_TPoint(vx,vy,0);
		var l = new tannus_geom_Line(new tannus_geom_TPoint(0,0,0),e);
		this.speed = l.one.distanceFrom(l.two);
		var v = tannus_math_TMath.angleBetween(0.0,0.0,e.get_x(),e.get_y());
		this.angle = new tannus_geom_CAngle(v);
	}
	,clone: function() {
		return new tannus_geom_CVelocity(this.speed,this.angle);
	}
	,invert: function() {
		return tannus_geom_CVelocity.fromVector(-(Math.cos(this.angle.v * Math.PI / 180) * this.speed),-(Math.sin(this.angle.v * Math.PI / 180) * this.speed));
	}
	,plus: function(other) {
		return tannus_geom_CVelocity.fromPoint((function($this) {
			var $r;
			var this1 = $this.get_vector();
			var other1 = other.get_vector();
			$r = this1.plusPoint(other1);
			return $r;
		}(this)));
	}
	,minus: function(other) {
		return tannus_geom_CVelocity.fromPoint((function($this) {
			var $r;
			var this1 = $this.get_vector();
			var p = other.get_vector();
			$r = this1.minusPoint(p);
			return $r;
		}(this)));
	}
	,get_x: function() {
		return Math.cos(this.angle.v * Math.PI / 180) * this.speed;
	}
	,set_x: function(nx) {
		this.setVector(nx,Math.sin(this.angle.v * Math.PI / 180) * this.speed);
		return nx;
	}
	,get_y: function() {
		return Math.sin(this.angle.v * Math.PI / 180) * this.speed;
	}
	,set_y: function(ny) {
		this.setVector(Math.cos(this.angle.v * Math.PI / 180) * this.speed,ny);
		return ny;
	}
	,get_vector: function() {
		var x = Math.cos(this.angle.v * Math.PI / 180) * this.speed;
		var y = Math.sin(this.angle.v * Math.PI / 180) * this.speed;
		return new tannus_geom_TPoint(x,y,0);
	}
	,set_vector: function(v) {
		this.setVector(v.get_x(),v.get_y());
		return this.get_vector();
	}
	,__class__: tannus_geom_CVelocity
	,__properties__: {set_vector:"set_vector",get_vector:"get_vector",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"}
};
var tannus_geom_VertexArray = function(v) {
	if(v != null) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < v.length) {
			var p = v[_g1];
			++_g1;
			_g.push(this.toImmutable(p));
		}
		this.data = _g;
	} else this.data = [];
	this._lines = new tannus_ds_CPair(null,null);
	this._rect = null;
};
$hxClasses["tannus.geom.VertexArray"] = tannus_geom_VertexArray;
tannus_geom_VertexArray.__name__ = ["tannus","geom","VertexArray"];
tannus_geom_VertexArray.prototype = {
	resetCache: function() {
		this._lines = new tannus_ds_CPair(null,null);
		this._rect = null;
	}
	,get: function(i) {
		return this.data[i];
	}
	,set: function(i,p) {
		this.data[i] = this.toImmutable(p);
		this.resetCache();
		return this.get(i);
	}
	,toImmutable: function(p) {
		if(!js_Boot.__instanceof(p,tannus_geom_ImmutablePoint)) {
			var np = new tannus_geom_ImmutablePoint(p.get_x(),p.get_y(),p.get_z());
			return np;
		} else return p.clone();
	}
	,toMutable: function(p) {
		if(js_Boot.__instanceof(p,tannus_geom_ImmutablePoint)) {
			var np = new tannus_geom_TPoint(0,0,0);
			np.copyFrom(p);
			return np;
		} else return p;
	}
	,iterator: function() {
		return new tannus_geom_VerticeIterator(this);
	}
	,push: function(p) {
		this.resetCache();
		return this.data.push(this.toImmutable(p));
	}
	,pop: function() {
		this.resetCache();
		return this.data.pop();
	}
	,unshift: function(p) {
		this.resetCache();
		this.data.unshift(this.toImmutable(p));
		return this.data.length;
	}
	,shift: function() {
		this.resetCache();
		return this.data.shift();
	}
	,clone: function() {
		return new tannus_geom_VertexArray(this.data);
	}
	,calculateLines: function(close) {
		if(close == null) close = false;
		var cached;
		if(close) cached = this._lines.right; else cached = this._lines.left;
		if(cached != null) return cached; else {
			var lines = [];
			var i = 0;
			var last = null;
			while(i < this.data.length) {
				var start = this.data[i];
				if(last == null) last = start; else {
					lines.push(new tannus_geom_Line(last,start));
					last = start;
				}
				i++;
			}
			if(close) {
				lines.push(new tannus_geom_Line(tannus_ds_ArrayTools.last(this.data),this.data[0]));
				this._lines.right = lines;
			} else this._lines.left = lines;
			return lines;
		}
	}
	,lineStack: function(close) {
		if(close == null) close = false;
		return new tannus_ds_Stack(this.calculateLines(close));
	}
	,pointStack: function() {
		var rdat = this.data.slice();
		rdat.reverse();
		return new tannus_ds_Stack(rdat);
	}
	,simplify: function(threshold) {
		if(threshold == null) threshold = 2;
		var s = this.pointStack();
		var ndata = [];
		var pass = (function(f) {
			return function(x) {
				return f(x);
			};
		})($arrayPushClosure(ndata));
		while(!s.get_empty()) {
			var x1 = s.pop();
			var y = s.peek();
			if(Math.round(x1.distanceFrom(y)) < threshold) s.add(y); else pass(x1);
		}
		if(this.data.length != ndata.length) {
			this.data = ndata;
			this.resetCache();
		}
	}
	,each: function(f) {
		var points = this.pointStack();
		while(!points.get_empty()) {
			var ip = points.peek();
			var p = this.toMutable(points.pop());
			f(p);
			(js_Boot.__cast(ip , tannus_geom_ImmutablePoint)).write(p);
		}
		this.resetCache();
	}
	,apply: function(m) {
		this.each($bind(m,m.transformPoint));
	}
	,map: function(f) {
		return new tannus_geom_VertexArray(this.data.map(f));
	}
	,getContainingRect: function() {
		if(this._rect == null) {
			var xr = tannus_math_TMath.minmax(this.data,function(p) {
				return p.get_x();
			});
			var yr = tannus_math_TMath.minmax(this.data,function(p1) {
				return p1.get_y();
			});
			this._rect = new tannus_geom_CRectangle(xr.min,yr.min,xr.max - xr.min,yr.max - yr.min);
		}
		return this._rect;
	}
	,get_length: function() {
		return this.data.length;
	}
	,get_lines: function() {
		return this.calculateLines(true);
	}
	,get_rect: function() {
		return this.getContainingRect();
	}
	,get_first: function() {
		return this.get(0);
	}
	,get_last: function() {
		return this.get(this.data.length - 1);
	}
	,__class__: tannus_geom_VertexArray
	,__properties__: {get_last:"get_last",get_first:"get_first",get_rect:"get_rect",get_lines:"get_lines",get_length:"get_length"}
};
var tannus_geom_VerticeIterator = function(va) {
	this.array = va;
	this.iter = new IntIterator(0,this.array.data.length);
};
$hxClasses["tannus.geom.VerticeIterator"] = tannus_geom_VerticeIterator;
tannus_geom_VerticeIterator.__name__ = ["tannus","geom","VerticeIterator"];
tannus_geom_VerticeIterator.prototype = {
	hasNext: function() {
		return this.iter.hasNext();
	}
	,next: function() {
		return this.array.get(this.iter.min++);
	}
	,__class__: tannus_geom_VerticeIterator
};
var tannus_geom_ImmutablePoint = function(x,y,z) {
	tannus_geom_TPoint.call(this,x,y,z);
};
$hxClasses["tannus.geom.ImmutablePoint"] = tannus_geom_ImmutablePoint;
tannus_geom_ImmutablePoint.__name__ = ["tannus","geom","ImmutablePoint"];
tannus_geom_ImmutablePoint.__super__ = tannus_geom_TPoint;
tannus_geom_ImmutablePoint.prototype = $extend(tannus_geom_TPoint.prototype,{
	set_x: function(v) {
		return v;
	}
	,set_y: function(v) {
		return v;
	}
	,set_z: function(v) {
		return v;
	}
	,write: function(p) {
		this._x = p.get_x();
		this._y = p.get_y();
		this._z = p.get_z();
	}
	,__class__: tannus_geom_ImmutablePoint
});
var tannus_geom__$Vertices_Vertices_$Impl_$ = {};
$hxClasses["tannus.geom._Vertices.Vertices_Impl_"] = tannus_geom__$Vertices_Vertices_$Impl_$;
tannus_geom__$Vertices_Vertices_$Impl_$.__name__ = ["tannus","geom","_Vertices","Vertices_Impl_"];
tannus_geom__$Vertices_Vertices_$Impl_$._new = function(v) {
	return new tannus_geom_VertexArray(v);
};
tannus_geom__$Vertices_Vertices_$Impl_$.clone = function(this1) {
	return this1.clone();
};
tannus_geom__$Vertices_Vertices_$Impl_$.map = function(this1,f) {
	return this1.map(f);
};
tannus_geom__$Vertices_Vertices_$Impl_$.get = function(this1,i) {
	return this1.get(i);
};
tannus_geom__$Vertices_Vertices_$Impl_$.set = function(this1,i,p) {
	return this1.set(i,p);
};
tannus_geom__$Vertices_Vertices_$Impl_$.toPoints = function(this1) {
	var _g = [];
	var $it0 = this1.iterator();
	while( $it0.hasNext() ) {
		var p = $it0.next();
		_g.push(p.clone());
	}
	return _g;
};
tannus_geom__$Vertices_Vertices_$Impl_$.fromPoints = function(list) {
	return new tannus_geom_VertexArray(list);
};
tannus_geom__$Vertices_Vertices_$Impl_$.toLines = function(this1) {
	return this1.calculateLines(true);
};
tannus_geom__$Vertices_Vertices_$Impl_$.fromLines = function(lines) {
	var v = tannus_ds_ArrayTools.flatten((function($this) {
		var $r;
		var _g = [];
		{
			var _g1 = 0;
			while(_g1 < lines.length) {
				var l = lines[_g1];
				++_g1;
				_g.push([l.one,l.two]);
			}
		}
		$r = _g;
		return $r;
	}(this)));
	return new tannus_geom_VertexArray(v);
};
tannus_geom__$Vertices_Vertices_$Impl_$.fromShape = function(s) {
	return s.getVertices();
};
var tannus_graphics__$Color_Color_$Impl_$ = {};
$hxClasses["tannus.graphics._Color.Color_Impl_"] = tannus_graphics__$Color_Color_$Impl_$;
tannus_graphics__$Color_Color_$Impl_$.__name__ = ["tannus","graphics","_Color","Color_Impl_"];
tannus_graphics__$Color_Color_$Impl_$._new = function(r,g,b,a) {
	if(b == null) b = 0;
	if(g == null) g = 0;
	if(r == null) r = 0;
	return new tannus_graphics__$Color_TColor(r,g,b,a);
};
tannus_graphics__$Color_Color_$Impl_$.clone = function(this1) {
	return this1.clone();
};
tannus_graphics__$Color_Color_$Impl_$.equals = function(this1,other) {
	return this1.equals(other);
};
tannus_graphics__$Color_Color_$Impl_$.invert = function(this1) {
	return this1.invert();
};
tannus_graphics__$Color_Color_$Impl_$.mix = function(this1,other,ratio) {
	return this1.mix(other,ratio);
};
tannus_graphics__$Color_Color_$Impl_$.lighten = function(this1,amount) {
	return this1.lighten(amount);
};
tannus_graphics__$Color_Color_$Impl_$.darken = function(this1,amount) {
	return this1.darken(amount);
};
tannus_graphics__$Color_Color_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_graphics__$Color_Color_$Impl_$.toByteArray = function(this1) {
	{
		var s = this1.toString();
		return tannus_io_impl_JavaScriptBinary.ofString(s);
	}
};
tannus_graphics__$Color_Color_$Impl_$.toInt = function(this1) {
	return this1.toInt();
};
tannus_graphics__$Color_Color_$Impl_$.fromInt = function(color) {
	return new tannus_graphics__$Color_TColor(color >> 16 & 255,color >> 8 & 255,color & 255,null);
};
tannus_graphics__$Color_Color_$Impl_$.fromString = function(s) {
	return tannus_graphics__$Color_TColor.fromString(s);
};
var tannus_graphics__$Color_TColor = function(r,g,b,a) {
	if(b == null) b = 0;
	if(g == null) g = 0;
	if(r == null) r = 0;
	if(r < 0) this._red = 0; else if(r > 255) this._red = 255; else this._red = r;
	if(g < 0) this._green = 0; else if(g > 255) this._green = 255; else this._green = g;
	if(b < 0) this._blue = 0; else if(b > 255) this._blue = 255; else this._blue = b;
	if(a != null) {
		if(a < 0) this._alpha = 0; else if(a > 255) this._alpha = 255; else this._alpha = a;
	} else this._alpha = null;
};
$hxClasses["tannus.graphics._Color.TColor"] = tannus_graphics__$Color_TColor;
tannus_graphics__$Color_TColor.__name__ = ["tannus","graphics","_Color","TColor"];
tannus_graphics__$Color_TColor.fromString = function(_s) {
	if(StringTools.startsWith(_s,"#")) {
		var s = StringTools.replace(_s,"#","");
		var _g = s.length;
		switch(_g) {
		case 6:
			var parts = [];
			var chars = s.split("");
			parts.push(chars.shift() + chars.shift());
			parts.push(chars.shift() + chars.shift());
			parts.push(chars.shift() + chars.shift());
			var channels = [];
			var _g1 = 0;
			while(_g1 < parts.length) {
				var part = parts[_g1];
				++_g1;
				var channel = Std.parseInt("0x" + part);
				channels.push(channel);
			}
			return new tannus_graphics__$Color_TColor(channels[0],channels[1],channels[2]);
		case 3:
			var parts1 = [];
			var chars1 = s.split("");
			parts1.push(chars1.shift());
			parts1.push(chars1.shift());
			parts1.push(chars1.shift());
			parts1 = parts1.map(function(c) {
				return c + c;
			});
			var channels1 = [];
			var _g11 = 0;
			while(_g11 < parts1.length) {
				var part1 = parts1[_g11];
				++_g11;
				var channel1 = Std.parseInt("0x" + part1);
				channels1.push(channel1);
			}
			return new tannus_graphics__$Color_TColor(channels1[0],channels1[1],channels1[2]);
		default:
			throw new js__$Boot_HaxeError("ColorError: Cannot create Color from \"" + s + "\"!");
		}
	} else {
		var s1 = _s;
		var rgb = new EReg("rgb\\( ?([0-9]+), ?([0-9]+), ?([0-9]+) ?\\)","i");
		var rgba = new EReg("rgba\\( ?([0-9]+), ?([0-9]+), ?([0-9]+), ?([0-9]+) ?\\)","i");
		if(rgb.match(s1)) {
			var data = tannus_io__$RegEx_RegEx_$Impl_$.matches(rgb,s1)[0];
			console.log(data);
			var i = (function(f) {
				return function(x) {
					return f(x);
				};
			})(Std.parseInt);
			return new tannus_graphics__$Color_TColor(i(data[1]),i(data[2]),i(data[3]));
		} else if(rgba.match(s1)) {
			var data1 = tannus_io__$RegEx_RegEx_$Impl_$.matches(rgba,s1)[0];
			console.log(data1);
			var i1 = (function(f1) {
				return function(x1) {
					return f1(x1);
				};
			})(Std.parseInt);
			return new tannus_graphics__$Color_TColor(i1(data1[1]),i1(data1[2]),i1(data1[3]),i1(data1[4]));
		} else throw new js__$Boot_HaxeError("ColorError: Cannot create Color from \"" + s1 + "\"!");
	}
};
tannus_graphics__$Color_TColor.fromInt = function(color) {
	return new tannus_graphics__$Color_TColor(color >> 16 & 255,color >> 8 & 255,color & 255,null);
};
tannus_graphics__$Color_TColor.hex = function(val,digits) {
	return StringTools.hex(val,digits);
};
tannus_graphics__$Color_TColor.prototype = {
	clone: function() {
		return new tannus_graphics__$Color_TColor(this._red,this._green,this._blue,this._alpha);
	}
	,equals: function(other) {
		return this._red == other._red && this._green == other._green && this._blue == other._blue && (this._alpha != null?this._alpha == other._alpha:true);
	}
	,mix: function(t,weight) {
		var ratio = weight / 100;
		return new tannus_graphics__$Color_TColor(this._red + (t._red - this._red) * ratio | 0,this._green + (t._green - this._green) * ratio | 0,this._blue + (t._blue - this._blue) * ratio | 0,this._alpha + (t._alpha - this._alpha) * ratio | 0);
	}
	,toString: function() {
		if(this._alpha == null) {
			var out = "#";
			out += tannus_graphics__$Color_TColor.hex(this._red,2);
			out += tannus_graphics__$Color_TColor.hex(this._green,2);
			out += tannus_graphics__$Color_TColor.hex(this._blue,2);
			return out;
		} else {
			var out1 = "rgba(" + this._red + ", " + this._green + ", " + this._blue + ", " + tannus_math_TMath.roundFloat((function($this) {
				var $r;
				var this1 = tannus_math__$Percent_Percent_$Impl_$.percent($this._alpha,255);
				$r = this1;
				return $r;
			}(this)) / 100,2) + ")";
			return out1;
		}
	}
	,toInt: function() {
		if(this._alpha == null) return Math.round(this._red) << 16 | Math.round(this._green) << 8 | Math.round(this._blue); else return Math.round(this._red) << 16 | Math.round(this._green) << 8 | Math.round(this._blue) | Math.round(this._alpha) << 24;
	}
	,lighten: function(amount) {
		var col = this.clone();
		var red = col._red * (100 + amount) / 100 | 0;
		var green = col._green * (100 + amount) / 100 | 0;
		var blue = col._blue * (100 + amount) / 100 | 0;
		if(red < 0) col._red = 0; else if(red > 255) col._red = 255; else col._red = red;
		if(green < 0) col._green = 0; else if(green > 255) col._green = 255; else col._green = green;
		if(blue < 0) col._blue = 0; else if(blue > 255) col._blue = 255; else col._blue = blue;
		return col;
	}
	,darken: function(amount) {
		return this.lighten(0 - amount);
	}
	,invert: function() {
		return new tannus_graphics__$Color_TColor(255 - this._red,255 - this._green,255 - this._blue,this._alpha);
	}
	,get_red: function() {
		return this._red;
	}
	,set_red: function(v) {
		return v < 0?this._red = 0:v > 255?this._red = 255:this._red = v;
	}
	,get_green: function() {
		return this._green;
	}
	,set_green: function(v) {
		return v < 0?this._green = 0:v > 255?this._green = 255:this._green = v;
	}
	,get_blue: function() {
		return this._blue;
	}
	,set_blue: function(v) {
		return v < 0?this._blue = 0:v > 255?this._blue = 255:this._blue = v;
	}
	,get_alpha: function() {
		return this._alpha;
	}
	,set_alpha: function(v) {
		return v != null?v < 0?this._alpha = 0:v > 255?this._alpha = 255:this._alpha = v:this._alpha = null;
	}
	,__class__: tannus_graphics__$Color_TColor
	,__properties__: {set_alpha:"set_alpha",get_alpha:"get_alpha",set_blue:"set_blue",get_blue:"get_blue",set_green:"set_green",get_green:"get_green",set_red:"set_red",get_red:"get_red"}
};
var tannus_html__$ElAttributes_ElAttributes_$Impl_$ = {};
$hxClasses["tannus.html._ElAttributes.ElAttributes_Impl_"] = tannus_html__$ElAttributes_ElAttributes_$Impl_$;
tannus_html__$ElAttributes_ElAttributes_$Impl_$.__name__ = ["tannus","html","_ElAttributes","ElAttributes_Impl_"];
tannus_html__$ElAttributes_ElAttributes_$Impl_$.__properties__ = {get_el:"get_el",get_elem:"get_elem"}
tannus_html__$ElAttributes_ElAttributes_$Impl_$._new = function(ref) {
	return ref;
};
tannus_html__$ElAttributes_ElAttributes_$Impl_$.getAttribute = function(this1,name) {
	return this1().attr(name);
};
tannus_html__$ElAttributes_ElAttributes_$Impl_$.setAttribute = function(this1,name,value) {
	this1().attr(name,Std.string(value));
	return tannus_html__$ElAttributes_ElAttributes_$Impl_$.getAttribute(this1,name);
};
tannus_html__$ElAttributes_ElAttributes_$Impl_$.writeObject = function(this1,o) {
	var _g = 0;
	var _g1;
	var this2 = o;
	_g1 = Reflect.fields(this2).map(function(k) {
		return { 'name' : k, 'value' : Reflect.getProperty(this2,k)};
	});
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		var this3 = this1();
		var value = Std.string(p.value);
		this3.attr(p.name,value);
		value;
	}
};
tannus_html__$ElAttributes_ElAttributes_$Impl_$.toObject = function(this1) {
	var o = { };
	var list;
	list = ((function($this) {
		var $r;
		var this2 = this1();
		$r = this2.get(0);
		return $r;
	}(this))).attributes;
	var _g1 = 0;
	var _g = list.length;
	while(_g1 < _g) {
		var i = _g1++;
		var p = list.item(i);
		var key = p.name;
		Reflect.setProperty(o,key,p.value);
		Reflect.getProperty(o,key);
	}
	return o;
};
tannus_html__$ElAttributes_ElAttributes_$Impl_$.toDict = function(this1) {
	var d = new tannus_ds_CDict();
	var list;
	list = ((function($this) {
		var $r;
		var this2 = this1();
		$r = this2.get(0);
		return $r;
	}(this))).attributes;
	var _g1 = 0;
	var _g = list.length;
	while(_g1 < _g) {
		var i = _g1++;
		var p = list.item(i);
		d.setByKey(p.name,p.value);
	}
	return d;
};
tannus_html__$ElAttributes_ElAttributes_$Impl_$.get_elem = function(this1) {
	return this1();
};
tannus_html__$ElAttributes_ElAttributes_$Impl_$.get_el = function(this1) {
	var this2 = this1();
	return this2.get(0);
};
var tannus_html__$ElStyles_ElStyles_$Impl_$ = {};
$hxClasses["tannus.html._ElStyles.ElStyles_Impl_"] = tannus_html__$ElStyles_ElStyles_$Impl_$;
tannus_html__$ElStyles_ElStyles_$Impl_$.__name__ = ["tannus","html","_ElStyles","ElStyles_Impl_"];
tannus_html__$ElStyles_ElStyles_$Impl_$._new = function(af) {
	return af;
};
tannus_html__$ElStyles_ElStyles_$Impl_$.get = function(this1,key) {
	return this1([key]);
};
tannus_html__$ElStyles_ElStyles_$Impl_$.set = function(this1,key,val) {
	this1([key,Std.string(val)]);
	return this1([key]);
};
tannus_html__$ElStyles_ElStyles_$Impl_$.copy = function(this1,other,keys) {
	var _g = 0;
	while(_g < keys.length) {
		var k = keys[_g];
		++_g;
		var val = other([k]);
		this1([k,Std.string(val)]);
		this1([k]);
	}
};
tannus_html__$ElStyles_ElStyles_$Impl_$.reference = function(this1,key) {
	var s = this1;
	return new tannus_io__$Pointer_Ref(function() {
		return s([key]);
	},function(v) {
		s([key,v == null?"null":"" + v]);
		return s([key]);
	});
};
tannus_html__$ElStyles_ElStyles_$Impl_$.gets = function(this1,keys) {
	var o = { };
	var _g = 0;
	while(_g < keys.length) {
		var k = keys[_g];
		++_g;
		var value = this1([k]);
		Reflect.setProperty(o,k,value);
		Reflect.getProperty(o,k);
	}
	return o;
};
tannus_html__$ElStyles_ElStyles_$Impl_$.writeObject = function(this1,o) {
	var _g = 0;
	var _g1;
	var this2 = o;
	_g1 = Reflect.fields(this2).map(function(k) {
		return { 'name' : k, 'value' : Reflect.getProperty(this2,k)};
	});
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		var key = p.name;
		this1([key,Std.string(Std.string(p.value))]);
		this1([key]);
	}
};
var tannus_html__$Element_Element_$Impl_$ = {};
$hxClasses["tannus.html._Element.Element_Impl_"] = tannus_html__$Element_Element_$Impl_$;
tannus_html__$Element_Element_$Impl_$.__name__ = ["tannus","html","_Element","Element_Impl_"];
tannus_html__$Element_Element_$Impl_$.__properties__ = {set_position:"set_position",get_position:"get_position",set_rectangle:"set_rectangle",get_rectangle:"get_rectangle",set_h:"set_h",get_h:"get_h",set_w:"set_w",get_w:"get_w",set_z:"set_z",get_z:"get_z",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",set_classes:"set_classes",get_classes:"get_classes",get_attributes:"get_attributes",get_style:"get_style",set_text:"set_text",get_text:"get_text",get_removed:"get_removed",get_exists:"get_exists",get_self:"get_self"}
tannus_html__$Element_Element_$Impl_$._new = function(jq) {
	return js.JQuery(jq);
};
tannus_html__$Element_Element_$Impl_$.get_self = function(this1) {
	return js.JQuery(this1);
};
tannus_html__$Element_Element_$Impl_$.get_exists = function(this1) {
	return this1.length > 0;
};
tannus_html__$Element_Element_$Impl_$.get_removed = function(this1) {
	return this1.closest("body").length < 1;
};
tannus_html__$Element_Element_$Impl_$.get_text = function(this1) {
	return this1.text();
};
tannus_html__$Element_Element_$Impl_$.set_text = function(this1,nt) {
	this1.text(nt);
	return this1.text();
};
tannus_html__$Element_Element_$Impl_$.get_style = function(this1) {
	var af = (function(f) {
		return function(a1) {
			return f(a1);
		};
	})((function(_e) {
		return function(args) {
			return tannus_html__$Element_Element_$Impl_$._cs(_e,args);
		};
	})(this1));
	return af;
};
tannus_html__$Element_Element_$Impl_$._cs = function(this1,args) {
	var r = tannus_html__$Element_Element_$Impl_$.cs(this1,args[0],args[1]);
	return r != null?r:"";
};
tannus_html__$Element_Element_$Impl_$.get_attributes = function(this1) {
	return function() {
		return this1;
	};
};
tannus_html__$Element_Element_$Impl_$.get_classes = function(this1) {
	return ((function($this) {
		var $r;
		var this2 = this1.attr("class");
		$r = this2 != null?this2:"";
		return $r;
	}(this))).split(" ");
};
tannus_html__$Element_Element_$Impl_$.set_classes = function(this1,cl) {
	var value = cl.join(" ");
	this1.attr("class",value);
	value;
	return ((function($this) {
		var $r;
		var this2 = this1.attr("class");
		$r = this2 != null?this2:"";
		return $r;
	}(this))).split(" ");
};
tannus_html__$Element_Element_$Impl_$.cs = function(this1,k,v) {
	if(v != null) this1.css(k,v != null?v:v);
	return this1.css(k);
};
tannus_html__$Element_Element_$Impl_$.get_x = function(this1) {
	return this1.offset().left;
};
tannus_html__$Element_Element_$Impl_$.set_x = function(this1,nx) {
	tannus_html__$Element_Element_$Impl_$.cs(this1,"left",nx + "px");
	return this1.offset().left;
};
tannus_html__$Element_Element_$Impl_$.get_y = function(this1) {
	return this1.offset().top;
};
tannus_html__$Element_Element_$Impl_$.set_y = function(this1,ny) {
	tannus_html__$Element_Element_$Impl_$.cs(this1,"top",ny + "px");
	return this1.offset().top;
};
tannus_html__$Element_Element_$Impl_$.get_z = function(this1) {
	var msz = this1.css("z-index");
	var mz = parseFloat(msz != null?msz:"0");
	if(isNaN(mz)) mz = 0;
	return mz;
};
tannus_html__$Element_Element_$Impl_$.set_z = function(this1,nz) {
	tannus_html__$Element_Element_$Impl_$.cs(this1,"z-index",nz + "");
	var msz = this1.css("z-index");
	var mz = parseFloat(msz != null?msz:"0");
	if(isNaN(mz)) mz = 0;
	return mz;
};
tannus_html__$Element_Element_$Impl_$.get_w = function(this1) {
	return this1.width() + 0.0;
};
tannus_html__$Element_Element_$Impl_$.set_w = function(this1,v) {
	this1.width(Math.round(v));
	return this1.width() + 0.0;
};
tannus_html__$Element_Element_$Impl_$.get_h = function(this1) {
	return this1.height() + 0.0;
};
tannus_html__$Element_Element_$Impl_$.set_h = function(this1,v) {
	this1.height(Math.round(v));
	return this1.height() + 0.0;
};
tannus_html__$Element_Element_$Impl_$.get_rectangle = function(this1) {
	var r;
	var _x = this1.offset().left;
	var _y = this1.offset().top;
	var _width = this1.width() + 0.0;
	var _height = this1.height() + 0.0;
	r = new tannus_geom_CRectangle(_x,_y,_width,_height);
	var msz = this1.css("z-index");
	var mz = parseFloat(msz != null?msz:"0");
	if(isNaN(mz)) mz = 0;
	r.z = mz;
	return r;
};
tannus_html__$Element_Element_$Impl_$.set_rectangle = function(this1,nr) {
	tannus_html__$Element_Element_$Impl_$.cs(this1,"left",nr.x + "px");
	this1.offset().left;
	tannus_html__$Element_Element_$Impl_$.cs(this1,"top",nr.y + "px");
	this1.offset().top;
	tannus_html__$Element_Element_$Impl_$.cs(this1,"z-index",nr.z + "");
	var msz = this1.css("z-index");
	var mz = parseFloat(msz != null?msz:"0");
	if(isNaN(mz)) mz = 0;
	mz;
	this1.width(Math.round(nr.width));
	this1.width() + 0.0;
	this1.height(Math.round(nr.height));
	this1.height() + 0.0;
	return tannus_html__$Element_Element_$Impl_$.get_rectangle(this1);
};
tannus_html__$Element_Element_$Impl_$.get_position = function(this1) {
	var x = this1.offset().left;
	var y = this1.offset().top;
	var z;
	var msz = this1.css("z-index");
	var mz = parseFloat(msz != null?msz:"0");
	if(isNaN(mz)) mz = 0;
	z = mz;
	return new tannus_geom_TPoint(x,y,z);
};
tannus_html__$Element_Element_$Impl_$.set_position = function(this1,np) {
	var nx = np.get_x();
	tannus_html__$Element_Element_$Impl_$.cs(this1,"left",nx + "px");
	this1.offset().left;
	var ny = np.get_y();
	tannus_html__$Element_Element_$Impl_$.cs(this1,"top",ny + "px");
	this1.offset().top;
	var nz = np.get_z();
	tannus_html__$Element_Element_$Impl_$.cs(this1,"z-index",nz + "");
	var msz = this1.css("z-index");
	var mz = parseFloat(msz != null?msz:"0");
	if(isNaN(mz)) mz = 0;
	mz;
	var x = this1.offset().left;
	var y = this1.offset().top;
	var z;
	var msz1 = this1.css("z-index");
	var mz1 = parseFloat(msz1 != null?msz1:"0");
	if(isNaN(mz1)) mz1 = 0;
	z = mz1;
	return new tannus_geom_TPoint(x,y,z);
};
tannus_html__$Element_Element_$Impl_$.get = function(this1,key) {
	return this1.attr(key);
};
tannus_html__$Element_Element_$Impl_$.set = function(this1,key,value) {
	this1.attr(key,value);
	return value;
};
tannus_html__$Element_Element_$Impl_$.at = function(this1,index) {
	return this1.get(index);
};
tannus_html__$Element_Element_$Impl_$.contains = function(this1,other) {
	return other.closest(this1).length > 0;
};
tannus_html__$Element_Element_$Impl_$.appendElementable = function(this1,child) {
	return this1.append(child.toElement());
};
tannus_html__$Element_Element_$Impl_$.addToElement = function(this1,other) {
	return this1.add(other);
};
tannus_html__$Element_Element_$Impl_$.addToElementArray = function(this1,other) {
	var els = ((function($this) {
		var $r;
		var _g = [];
		{
			var _g2 = 0;
			var _g1 = this1.length;
			while(_g2 < _g1) {
				var i = _g2++;
				_g.push((function($this) {
					var $r;
					var jq = this1.get(i);
					$r = js.JQuery(jq);
					return $r;
				}($this)));
			}
		}
		$r = _g;
		return $r;
	}(this))).concat(other);
	var el = js.JQuery("");
	var _g3 = 0;
	while(_g3 < els.length) {
		var e = els[_g3];
		++_g3;
		el = el.add(e);
	}
	return el;
};
tannus_html__$Element_Element_$Impl_$.addToElementable = function(this1,other) {
	return this1.add(other.toElement());
};
tannus_html__$Element_Element_$Impl_$.subFromElement = function(this1,other) {
	var this2 = js.JQuery(this1);
	var els;
	var _g3 = [];
	var _g21 = 0;
	var _g11 = other.length;
	while(_g21 < _g11) {
		var i1 = _g21++;
		_g3.push((function($this) {
			var $r;
			var jq1 = other.get(i1);
			$r = js.JQuery(jq1);
			return $r;
		}(this)));
	}
	els = _g3;
	var res = ((function($this) {
		var $r;
		var _g = [];
		{
			var _g2 = 0;
			var _g1 = this2.length;
			while(_g2 < _g1) {
				var i = _g2++;
				_g.push((function($this) {
					var $r;
					var jq = this2.get(i);
					$r = js.JQuery(jq);
					return $r;
				}($this)));
			}
		}
		$r = _g;
		return $r;
	}(this))).filter(function(e) {
		return Lambda.has(els,e);
	});
	var result = js.JQuery("");
	var _g4 = 0;
	while(_g4 < res.length) {
		var e1 = res[_g4];
		++_g4;
		result = result.add(e1);
	}
	return result;
};
tannus_html__$Element_Element_$Impl_$.subFromElementArray = function(this1,els) {
	var res = ((function($this) {
		var $r;
		var _g = [];
		{
			var _g2 = 0;
			var _g1 = this1.length;
			while(_g2 < _g1) {
				var i = _g2++;
				_g.push((function($this) {
					var $r;
					var jq = this1.get(i);
					$r = js.JQuery(jq);
					return $r;
				}($this)));
			}
		}
		$r = _g;
		return $r;
	}(this))).filter(function(e) {
		return Lambda.has(els,e);
	});
	var result = js.JQuery("");
	var _g3 = 0;
	while(_g3 < res.length) {
		var e1 = res[_g3];
		++_g3;
		result = result.add(e1);
	}
	return result;
};
tannus_html__$Element_Element_$Impl_$.toArray = function(this1) {
	var _g = [];
	var _g2 = 0;
	var _g1 = this1.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push((function($this) {
			var $r;
			var jq = this1.get(i);
			$r = js.JQuery(jq);
			return $r;
		}(this)));
	}
	return _g;
};
tannus_html__$Element_Element_$Impl_$.fromArray = function(els) {
	var el = js.JQuery("");
	var _g = 0;
	while(_g < els.length) {
		var e = els[_g];
		++_g;
		el = el.add(e);
	}
	return el;
};
tannus_html__$Element_Element_$Impl_$.toHTMLElement = function(this1) {
	return this1.get(0);
};
tannus_html__$Element_Element_$Impl_$.fromString = function(q) {
	return js.JQuery(q);
};
tannus_html__$Element_Element_$Impl_$.fromDOMElement = function(el) {
	return js.JQuery(el);
};
var tannus_html_Elementable = function() { };
$hxClasses["tannus.html.Elementable"] = tannus_html_Elementable;
tannus_html_Elementable.__name__ = ["tannus","html","Elementable"];
tannus_html_Elementable.prototype = {
	__class__: tannus_html_Elementable
};
var tannus_html__$Win_Win_$Impl_$ = {};
$hxClasses["tannus.html._Win.Win_Impl_"] = tannus_html__$Win_Win_$Impl_$;
tannus_html__$Win_Win_$Impl_$.__name__ = ["tannus","html","_Win","Win_Impl_"];
tannus_html__$Win_Win_$Impl_$.__properties__ = {get_current:"get_current",get_viewport:"get_viewport"}
tannus_html__$Win_Win_$Impl_$._new = function(w) {
	return w != null?w:window;
};
tannus_html__$Win_Win_$Impl_$.onScroll = function(this1) {
	var sig = new tannus_io_Signal();
	var handlr = function(event) {
		var scroll = new tannus_geom_TPoint(this1.scrollX,this1.scrollY,0);
		sig.broadcast(scroll);
	};
	this1.addEventListener("scroll",handlr);
	sig.ondelete = function() {
		this1.removeEventListener("scroll",handlr);
	};
	return sig;
};
tannus_html__$Win_Win_$Impl_$.onResize = function(this1) {
	var sig = new tannus_io_Signal();
	var handlr = function(event) {
		var area = [this1.innerWidth,this1.innerHeight];
		sig.broadcast(area);
	};
	this1.addEventListener("resize",handlr);
	sig.ondelete = function() {
		this1.removeEventListener("resize",handlr);
	};
	return sig;
};
tannus_html__$Win_Win_$Impl_$.onKeydown = function(this1) {
	var sig = new tannus_io_Signal();
	var handle = function(event) {
		var mods = [];
		if(event.altKey) mods.push("alt");
		if(event.shiftKey) mods.push("shift");
		if(event.ctrlKey) mods.push("ctrl");
		var e = new tannus_events_KeyboardEvent("keydown",event.keyCode,mods);
		sig.broadcast(e);
	};
	var bod = this1.document.getElementsByTagName("body").item(0);
	bod.addEventListener("keydown",handle);
	sig.ondelete = function() {
		bod.removeEventListener("keydown",handle);
	};
	return sig;
};
tannus_html__$Win_Win_$Impl_$.onBeforeUnload = function(this1) {
	var sig = new tannus_io_Signal();
	var handlr = function(event) {
		sig.call(new Date().getTime());
	};
	this1.addEventListener("beforeunload",handlr);
	sig.ondelete = function() {
		this1.removeEventListener("beforeunload",handlr);
	};
	return sig;
};
tannus_html__$Win_Win_$Impl_$.requestFileSystem = function(this1,size,cb) {
	var self = tannus_ds_CObj.create(this1);
	var rfs = self.get("requestFileSystem");
	if(rfs == null) rfs = self.get("webkitRequestFileSystem");
	rfs(self.get("PERSISTENT"),size,cb);
};
tannus_html__$Win_Win_$Impl_$.expose = function(this1,name,value) {
	var self = tannus_ds_CObj.create(this1);
	var val = value;
	self.set(name,val);
};
tannus_html__$Win_Win_$Impl_$.get_viewport = function(this1) {
	return new tannus_geom_CRectangle(this1.scrollX,this1.scrollY,this1.innerWidth,this1.innerHeight);
};
tannus_html__$Win_Win_$Impl_$.get_current = function() {
	return window;
};
var tannus_html_fs_FilePromise = function(efunc) {
	var _g = this;
	tannus_ds_Promise.call(this,function(accept,reject) {
		efunc(function(e) {
			_g.entry = e;
			var f = e;
			f.file(function(me) {
				accept(new tannus_html_fs_WebFile(me));
			},function(error) {
				reject(error);
			});
		});
	});
};
$hxClasses["tannus.html.fs.FilePromise"] = tannus_html_fs_FilePromise;
tannus_html_fs_FilePromise.__name__ = ["tannus","html","fs","FilePromise"];
tannus_html_fs_FilePromise.__super__ = tannus_ds_Promise;
tannus_html_fs_FilePromise.prototype = $extend(tannus_ds_Promise.prototype,{
	write: function(data) {
		tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$.writer(this.entry).then(function(writer) {
			tannus_html_fs__$WebFileWriter_WebFileWriter_$Impl_$.write(writer,data);
		});
		return this;
	}
	,read: function(pos,len) {
		if(pos == null) pos = 0;
		var _g = this;
		return new tannus_ds_Promise(function(accept,reject) {
			_g.then(function(file) {
				file.read(pos,len).then(accept).unless(reject);
			});
			_g.unless(function(error) {
				reject(error);
			});
		},null);
	}
	,__class__: tannus_html_fs_FilePromise
});
var tannus_html_fs__$WebDirectoryEntry_WebDirectoryEntry_$Impl_$ = {};
$hxClasses["tannus.html.fs._WebDirectoryEntry.WebDirectoryEntry_Impl_"] = tannus_html_fs__$WebDirectoryEntry_WebDirectoryEntry_$Impl_$;
tannus_html_fs__$WebDirectoryEntry_WebDirectoryEntry_$Impl_$.__name__ = ["tannus","html","fs","_WebDirectoryEntry","WebDirectoryEntry_Impl_"];
tannus_html_fs__$WebDirectoryEntry_WebDirectoryEntry_$Impl_$._new = function(dir) {
	return dir;
};
tannus_html_fs__$WebDirectoryEntry_WebDirectoryEntry_$Impl_$.exists = function(this1,path) {
	return new tannus_ds_Promise(function(accept,reject) {
		this1.getFile(path,null,function(entry) {
			accept(true);
		},function(error) {
			var _g = error.code;
			switch(_g) {
			case 1:
				accept(false);
				break;
			default:
				reject(error);
			}
		});
	},null).bool();
};
tannus_html_fs__$WebDirectoryEntry_WebDirectoryEntry_$Impl_$.createFile = function(this1,path) {
	return new tannus_ds_Promise((function(f,a1,a2) {
		return function(a3,a4) {
			f(a1,a2,a3,a4);
		};
	})($bind(this1,this1.getFile),path,{ 'create' : true}));
};
tannus_html_fs__$WebDirectoryEntry_WebDirectoryEntry_$Impl_$.getFile = function(this1,path) {
	return new tannus_ds_Promise((function(f,a1,a2) {
		return function(a3,a4) {
			f(a1,a2,a3,a4);
		};
	})($bind(this1,this1.getFile),path,{ }));
};
tannus_html_fs__$WebDirectoryEntry_WebDirectoryEntry_$Impl_$.createDirectory = function(this1,path) {
	return new tannus_ds_Promise((function(f,a1,a2) {
		return function(a3,a4) {
			f(a1,a2,a3,a4);
		};
	})($bind(this1,this1.getDirectory),path,{ 'create' : true}));
};
tannus_html_fs__$WebDirectoryEntry_WebDirectoryEntry_$Impl_$.readEntries = function(this1) {
	return new tannus_ds_promises_ArrayPromise((function(f) {
		return function(a1,a2) {
			f(a1,a2);
		};
	})(($_=this1.createReader(),$bind($_,$_.readEntries))));
};
tannus_html_fs__$WebDirectoryEntry_WebDirectoryEntry_$Impl_$.walk = function(this1,tester) {
	return new tannus_ds_Promise(function(accept,reject) {
		var stack = new tannus_ds_AsyncStack();
		var files = [];
		new tannus_ds_promises_ArrayPromise((function(f) {
			return function(a1,a2) {
				f(a1,a2);
			};
		})(($_=this1.createReader(),$bind($_,$_.readEntries)))).then(function(entries) {
			var _g = 0;
			while(_g < entries.length) {
				var e = [entries[_g]];
				++_g;
				stack.under((function(e) {
					return function(done) {
						if(e[0].isFile) {
							if(tester == null || tester(e[0])) files.push(e[0]);
							done();
						} else if(e[0].isDirectory) {
							var p = tannus_html_fs__$WebDirectoryEntry_WebDirectoryEntry_$Impl_$.walk(e[0],tester);
							p.then((function() {
								return function(dfiles) {
									files = files.concat(dfiles);
									done();
								};
							})());
							p.unless((function() {
								return function(error) {
									reject(error);
								};
							})());
						}
					};
				})(e));
			}
			stack.run(function() {
				accept(files);
			});
		}).unless(function(error1) {
			reject(error1);
		});
	},null).array();
};
var tannus_html_fs_WebFile = function(f) {
	this.file = f;
	this.file.lastModified;
};
$hxClasses["tannus.html.fs.WebFile"] = tannus_html_fs_WebFile;
tannus_html_fs_WebFile.__name__ = ["tannus","html","fs","WebFile"];
tannus_html_fs_WebFile.prototype = {
	slice: function(start,end,contentType) {
		return this.file.slice(start,end,contentType);
	}
	,read: function(pos,len) {
		if(pos == null) pos = 0;
		var _g = this;
		return new tannus_ds_Promise(function(accept,reject) {
			if(len == null) len = _g.file.size;
			var reader = new FileReader();
			reader.onerror = function(error) {
				reject(error);
			};
			reader.onloadend = function(event) {
				var data = tannus_io_impl_JavaScriptBinary.ofData(event.target.result);
				accept(data);
			};
			if(pos == 0 && len == _g.file.size) reader.readAsArrayBuffer(_g.file); else reader.readAsArrayBuffer(_g.slice(pos,pos + len,_g.file.type));
		},null);
	}
	,getObjectURL: function() {
		return window.webkitURL.createObjectURL(this.file);
	}
	,get_name: function() {
		return this.file.name;
	}
	,get_size: function() {
		return this.file.size;
	}
	,get_type: function() {
		return this.file.type;
	}
	,get_lastModified: function() {
		return this.file.lastModifiedDate;
	}
	,__class__: tannus_html_fs_WebFile
	,__properties__: {get_lastModified:"get_lastModified",get_type:"get_type",get_size:"get_size",get_name:"get_name"}
};
var tannus_html_fs__$WebFile_OldWebFile_$Impl_$ = {};
$hxClasses["tannus.html.fs._WebFile.OldWebFile_Impl_"] = tannus_html_fs__$WebFile_OldWebFile_$Impl_$;
tannus_html_fs__$WebFile_OldWebFile_$Impl_$.__name__ = ["tannus","html","fs","_WebFile","OldWebFile_Impl_"];
tannus_html_fs__$WebFile_OldWebFile_$Impl_$.__properties__ = {get_type:"get_type"}
tannus_html_fs__$WebFile_OldWebFile_$Impl_$._new = function(f) {
	return f;
};
tannus_html_fs__$WebFile_OldWebFile_$Impl_$.get_type = function(this1) {
	return this1.type;
};
tannus_html_fs__$WebFile_OldWebFile_$Impl_$.getObjectURL = function(this1) {
	return window.webkitURL.createObjectURL(this1);
};
var tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$ = {};
$hxClasses["tannus.html.fs._WebFileEntry.WebFileEntry_Impl_"] = tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$;
tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$.__name__ = ["tannus","html","fs","_WebFileEntry","WebFileEntry_Impl_"];
tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$.__properties__ = {get_fileSystem:"get_fileSystem"}
tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$._new = function(entry) {
	return entry;
};
tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$.get_fileSystem = function(this1) {
	return this1.filesystem;
};
tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$.file = function(this1) {
	return new tannus_html_fs_FilePromise(function(give) {
		give(this1);
	});
};
tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$.size = function(this1) {
	return ((function($this) {
		var $r;
		var this2 = this1;
		$r = new tannus_html_fs_FilePromise(function(give) {
			give(this2);
		});
		return $r;
	}(this))).transform(function(f) {
		return f.file.size;
	});
};
tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$.type = function(this1) {
	return ((function($this) {
		var $r;
		var this2 = this1;
		$r = new tannus_html_fs_FilePromise(function(give) {
			give(this2);
		});
		return $r;
	}(this))).transform(function(f) {
		return f.file.type;
	}).string();
};
tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$.read = function(this1) {
	return new tannus_ds_Promise(function(accept,reject) {
		this1.file(function(file) {
			var reader = new FileReader();
			reader.onerror = function(error) {
				reject(error);
			};
			reader.onload = function(event) {
				var data = tannus_io_impl_JavaScriptBinary.ofData(event.target.result);
				accept(data);
			};
			reader.readAsArrayBuffer(file);
		},function(error1) {
			reject(error1);
		});
	},null);
};
tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$.writer = function(this1) {
	return new tannus_ds_Promise(function(accept,reject) {
		this1.createWriter(function(writer) {
			accept(writer);
		},function(err) {
			reject(err);
		});
	},null);
};
tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$.remove = function(this1,cb) {
	this1.remove(cb);
};
var tannus_html_fs_WebFileError = function(type,msg) {
	Error.call(this,msg);
	this.name = "FileSystemError";
	this.code = type;
};
$hxClasses["tannus.html.fs.WebFileError"] = tannus_html_fs_WebFileError;
tannus_html_fs_WebFileError.__name__ = ["tannus","html","fs","WebFileError"];
tannus_html_fs_WebFileError.__super__ = Error;
tannus_html_fs_WebFileError.prototype = $extend(Error.prototype,{
	__class__: tannus_html_fs_WebFileError
});
var tannus_html_fs__$WebFileSystem_WebFileSystem_$Impl_$ = {};
$hxClasses["tannus.html.fs._WebFileSystem.WebFileSystem_Impl_"] = tannus_html_fs__$WebFileSystem_WebFileSystem_$Impl_$;
tannus_html_fs__$WebFileSystem_WebFileSystem_$Impl_$.__name__ = ["tannus","html","fs","_WebFileSystem","WebFileSystem_Impl_"];
tannus_html_fs__$WebFileSystem_WebFileSystem_$Impl_$._new = function(w) {
	return w;
};
tannus_html_fs__$WebFileSystem_WebFileSystem_$Impl_$.request = function(size,cb) {
	tannus_html__$Win_Win_$Impl_$.requestFileSystem(window,size,cb);
};
var tannus_html_fs__$WebFileWriter_WebFileWriter_$Impl_$ = {};
$hxClasses["tannus.html.fs._WebFileWriter.WebFileWriter_Impl_"] = tannus_html_fs__$WebFileWriter_WebFileWriter_$Impl_$;
tannus_html_fs__$WebFileWriter_WebFileWriter_$Impl_$.__name__ = ["tannus","html","fs","_WebFileWriter","WebFileWriter_Impl_"];
tannus_html_fs__$WebFileWriter_WebFileWriter_$Impl_$._new = function(w) {
	return w;
};
tannus_html_fs__$WebFileWriter_WebFileWriter_$Impl_$.seek = function(this1,pos) {
	this1.seek(pos);
};
tannus_html_fs__$WebFileWriter_WebFileWriter_$Impl_$.write = function(this1,data,cb) {
	if(cb == null) cb = function(x) {
		null;
	};
	this1.onwriteend = function(event) {
		cb(null);
	};
	this1.onerror = function(error) {
		cb(error);
	};
	var blob = new Blob([data.b]);
	this1.write(blob);
};
tannus_html_fs__$WebFileWriter_WebFileWriter_$Impl_$.append = function(this1,data,cb) {
	this1.seek(this1.length);
	tannus_html_fs__$WebFileWriter_WebFileWriter_$Impl_$.write(this1,data,cb);
};
var tannus_internal_CompileTime = function() { };
$hxClasses["tannus.internal.CompileTime"] = tannus_internal_CompileTime;
tannus_internal_CompileTime.__name__ = ["tannus","internal","CompileTime"];
var tannus_internal__$Error_Error_$Impl_$ = {};
$hxClasses["tannus.internal._Error.Error_Impl_"] = tannus_internal__$Error_Error_$Impl_$;
tannus_internal__$Error_Error_$Impl_$.__name__ = ["tannus","internal","_Error","Error_Impl_"];
tannus_internal__$Error_Error_$Impl_$._new = function(msg) {
	return new Error(msg);
};
tannus_internal__$Error_Error_$Impl_$.fromString = function(s) {
	return new Error(s);
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
var tannus_io__$Blob_Blob_$Impl_$ = {};
$hxClasses["tannus.io._Blob.Blob_Impl_"] = tannus_io__$Blob_Blob_$Impl_$;
tannus_io__$Blob_Blob_$Impl_$.__name__ = ["tannus","io","_Blob","Blob_Impl_"];
tannus_io__$Blob_Blob_$Impl_$._new = function(name,mime,dat) {
	return new tannus_io_CBlob(name,mime,dat);
};
tannus_io__$Blob_Blob_$Impl_$.toNativeBlob = function(this1) {
	return new Blob([this1.data.b],{ 'type' : this1.type});
};
tannus_io__$Blob_Blob_$Impl_$.toObjectURL = function(this1) {
	return URL.createObjectURL(new Blob([this1.data.b],{ 'type' : this1.type}));
};
tannus_io__$Blob_Blob_$Impl_$.fromDataURL = function(durl) {
	return tannus_io_CBlob.fromDataURL(durl);
};
var tannus_io_CBlob = function(nam,mime,dat) {
	this.name = nam;
	this.type = mime != null?mime:"text/plain";
	var alt;
	var size = tannus_io_impl_JavaScriptBinary.alloc(0);
	var this1;
	this1 = tannus_io_impl_JavaScriptBinary.alloc(size);
	alt = this1;
	if(dat != null) this.data = dat; else this.data = alt;
};
$hxClasses["tannus.io.CBlob"] = tannus_io_CBlob;
tannus_io_CBlob.__name__ = ["tannus","io","CBlob"];
tannus_io_CBlob.fromDataURL = function(durl) {
	durl = durl.substring(5);
	var bits = durl.split(";");
	var mime = bits.shift();
	var encoded = durl.substring(durl.indexOf(",") + 1,durl.length - 1);
	var data = tannus_io_impl_JavaScriptBinary.fromBase64(encoded);
	return new tannus_io_CBlob("file",mime,data);
};
tannus_io_CBlob.prototype = {
	save: function(dirname) {
		var f;
		var p = new tannus_sys__$Path_CPath("" + dirname + "/" + this.name);
		f = new tannus_sys_CFile(p);
		tannus_sys_JavaScriptFileSystem.write(f._path.s,this.data);
		return f;
	}
	,toDataURL: function() {
		return this.data.toDataUrl(this.type);
	}
	,__class__: tannus_io_CBlob
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
var tannus_io_EventDispatcher = function() {
	this._sigs = new haxe_ds_StringMap();
};
$hxClasses["tannus.io.EventDispatcher"] = tannus_io_EventDispatcher;
tannus_io_EventDispatcher.__name__ = ["tannus","io","EventDispatcher"];
tannus_io_EventDispatcher.prototype = {
	addSignal: function(name,sig) {
		var v;
		var alt = new tannus_io_Signal();
		if(sig != null) v = sig; else v = alt;
		this._sigs.set(name,v);
		v;
	}
	,addSignals: function(names) {
		var _g = 0;
		while(_g < names.length) {
			var name = names[_g];
			++_g;
			this.addSignal(name);
		}
	}
	,canDispatch: function(name) {
		return this._sigs.exists(name);
	}
	,on: function(name,action,once) {
		if(this.canDispatch(name)) this._sigs.get(name).on(action,once); else throw new js__$Boot_HaxeError("InvalidEvent: \"" + name + "\" is not a valid Event");
	}
	,once: function(name,action) {
		this.on(name,action,true);
	}
	,dispatch: function(name,data) {
		if(this.canDispatch(name)) this._sigs.get(name).call(data);
	}
	,off: function(name,action) {
		var sig = this._sigs.get(name);
		if(sig != null) {
			if(action != null) sig.ignore(action); else sig.handlers = [];
		}
	}
	,when: function(name,test,action) {
		if(this.canDispatch(name)) this._sigs.get(name).when(test,action); else throw new js__$Boot_HaxeError("InvalidEvent: \"" + name + "\" is not a valid Event");
	}
	,__class__: tannus_io_EventDispatcher
};
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
var tannus_io_OutputStream = function(o) {
	this.out = o;
};
$hxClasses["tannus.io.OutputStream"] = tannus_io_OutputStream;
tannus_io_OutputStream.__name__ = ["tannus","io","OutputStream"];
tannus_io_OutputStream.prototype = {
	open: function(done) {
		this.out.open(done);
	}
	,close: function(done) {
		this.out.close(done);
	}
	,flush: function(done) {
		this.out.flush(done);
	}
	,pause: function() {
		this.out.pause();
	}
	,resume: function() {
		this.out.resume();
	}
	,writeByte: function(c) {
		this.out.write(c);
	}
	,write: function(s) {
		var $it0 = s.iterator();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			this.writeByte(c);
		}
	}
	,writeBytes: function(s,pos,len) {
		var data = s.slice(pos,pos + len);
		this.write(data);
	}
	,writeString: function(s) {
		this.write(tannus_io_impl_JavaScriptBinary.ofString(s));
	}
	,__class__: tannus_io_OutputStream
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
var tannus_io__$Signal_Handler = $hxClasses["tannus.io._Signal.Handler"] = { __ename__ : ["tannus","io","_Signal","Handler"], __constructs__ : ["Normal","Counted","Every","Once","Tested"] };
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
var tannus_io__$VoidSignal_Handler = $hxClasses["tannus.io._VoidSignal.Handler"] = { __ename__ : ["tannus","io","_VoidSignal","Handler"], __constructs__ : ["Normal","Counted","Every","Once"] };
tannus_io__$VoidSignal_Handler.Normal = function(func) { var $x = ["Normal",0,func]; $x.__enum__ = tannus_io__$VoidSignal_Handler; $x.toString = $estr; return $x; };
tannus_io__$VoidSignal_Handler.Counted = function(func,count,fired) { var $x = ["Counted",1,func,count,fired]; $x.__enum__ = tannus_io__$VoidSignal_Handler; $x.toString = $estr; return $x; };
tannus_io__$VoidSignal_Handler.Every = function(func,wait,remaining) { var $x = ["Every",2,func,wait,remaining]; $x.__enum__ = tannus_io__$VoidSignal_Handler; $x.toString = $estr; return $x; };
tannus_io__$VoidSignal_Handler.Once = function(func,fired) { var $x = ["Once",3,func,fired]; $x.__enum__ = tannus_io__$VoidSignal_Handler; $x.toString = $estr; return $x; };
var tannus_io_WritableStream = function() {
	this.writeEvent = new tannus_io_Signal();
	this._buf = [];
	this.opened = this.closed = this.paused = false;
};
$hxClasses["tannus.io.WritableStream"] = tannus_io_WritableStream;
tannus_io_WritableStream.__name__ = ["tannus","io","WritableStream"];
tannus_io_WritableStream.prototype = {
	open: function(f) {
		this.opened = true;
	}
	,close: function(f) {
		this.closed = true;
	}
	,pause: function() {
		this.paused = true;
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.flush();
		}
	}
	,write: function(data) {
		if(this.opened && !this.closed) {
			if(this.paused) this._buf.push(data); else this.writeEvent.broadcast(data);
		} else this.error(new Error("Cannot write to closed or unopened Stream!"));
	}
	,flush: function(done) {
		var _g = 0;
		var _g1 = this._buf;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			this.writeEvent.broadcast(d);
		}
	}
	,error: function(e) {
		throw new js__$Boot_HaxeError(e);
	}
	,get_writable: function() {
		return this.opened && !this.closed;
	}
	,__class__: tannus_io_WritableStream
	,__properties__: {get_writable:"get_writable"}
};
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
var tannus_math__$Percent_Percent_$Impl_$ = {};
$hxClasses["tannus.math._Percent.Percent_Impl_"] = tannus_math__$Percent_Percent_$Impl_$;
tannus_math__$Percent_Percent_$Impl_$.__name__ = ["tannus","math","_Percent","Percent_Impl_"];
tannus_math__$Percent_Percent_$Impl_$.__properties__ = {set_delta:"set_delta",get_delta:"get_delta",set_value:"set_value",get_value:"get_value"}
tannus_math__$Percent_Percent_$Impl_$._new = function(f) {
	return f;
};
tannus_math__$Percent_Percent_$Impl_$.get_value = function(this1) {
	return this1;
};
tannus_math__$Percent_Percent_$Impl_$.set_value = function(this1,nv) {
	return this1 = nv;
};
tannus_math__$Percent_Percent_$Impl_$.get_delta = function(this1) {
	return this1 / 100;
};
tannus_math__$Percent_Percent_$Impl_$.set_delta = function(this1,v) {
	return this1 = v * 100;
};
tannus_math__$Percent_Percent_$Impl_$.toDelta = function(this1) {
	return this1 / 100;
};
tannus_math__$Percent_Percent_$Impl_$.complement = function(this1) {
	return 100 - this1;
};
tannus_math__$Percent_Percent_$Impl_$.plus = function(this1,other) {
	return this1 + other;
};
tannus_math__$Percent_Percent_$Impl_$.minus = function(this1,other) {
	return this1 - other;
};
tannus_math__$Percent_Percent_$Impl_$.preincrement = function(this1) {
	return ++this1;
};
tannus_math__$Percent_Percent_$Impl_$.postincrement = function(this1) {
	return this1++;
};
tannus_math__$Percent_Percent_$Impl_$.decrement = function(this1) {
	return --this1;
};
tannus_math__$Percent_Percent_$Impl_$.percent = function(what,of) {
	return what / of * 100;
};
tannus_math__$Percent_Percent_$Impl_$.toString = function(this1) {
	return "" + this1 + "%";
};
var tannus_math_Random = $hx_exports.Random = function(seed) {
	if(seed != null) this.state = seed; else this.state = Math.floor(Math.random() * 2147483647);
};
$hxClasses["tannus.math.Random"] = tannus_math_Random;
tannus_math_Random.__name__ = ["tannus","math","Random"];
tannus_math_Random.stringSeed = function(seed) {
	var state = 0;
	var ba = tannus_io_impl_JavaScriptBinary.ofString(seed);
	var $it0 = ba.iterator();
	while( $it0.hasNext() ) {
		var bit = $it0.next();
		seed += bit;
	}
	return new tannus_math_Random(state);
};
tannus_math_Random.prototype = {
	nextInt: function() {
		this.state = (1103515245.0 * this.state + 12345) % 2147483647;
		return this.state;
	}
	,nextFloat: function() {
		return this.nextInt() / 2147483647;
	}
	,reset: function(value) {
		this.state = value;
	}
	,randint: function(min,max) {
		return Math.floor(this.nextFloat() * (max - min + 1) + min);
	}
	,randchance: function(top,bottom) {
		var choices;
		var _g = [];
		var _g1 = 0;
		while(_g1 < bottom) {
			var i = _g1++;
			_g.push(i);
		}
		choices = _g;
		var correct = [];
		while(correct.length < top) {
			var cnum = this.choice(choices);
			if(!Lambda.has(correct,cnum)) correct.push(cnum);
		}
		return Lambda.has(correct,this.randint(top,bottom));
	}
	,randbool: function() {
		return this.randint(0,1) == 1;
	}
	,choice: function(set) {
		return set[this.randint(0,set.length - 1)];
	}
	,sample: function(set) {
		var sampleSize = this.randint(0,set.length);
		var items = [];
		while(items.length < sampleSize) {
			var ritem = this.choice(set);
			if(!Lambda.has(items,ritem)) items.push(ritem);
		}
		return items;
	}
	,shuffle: function(set) {
		var copy = set.slice();
		var result = [];
		while(copy.length != 1) {
			var el = this.choice(copy);
			HxOverrides.remove(copy,el);
			result.push(el);
		}
		result.push(copy.pop());
		return result;
	}
	,enumConstruct: function(_enum) {
		var name = this.choice(Type.getEnumConstructs(_enum));
		return (function(f,e,a1) {
			return function(a2) {
				return f(e,a1,a2);
			};
		})(Type.createEnum,_enum,name);
	}
	,__class__: tannus_math_Random
};
var tannus_math_RandomTools = function() { };
$hxClasses["tannus.math.RandomTools"] = tannus_math_RandomTools;
tannus_math_RandomTools.__name__ = ["tannus","math","RandomTools"];
tannus_math_RandomTools.__properties__ = {get_rand:"get_rand"}
tannus_math_RandomTools.randint = function(range) {
	return new tannus_math_Random().randint(range[0],range[1]);
};
tannus_math_RandomTools.between = function(r) {
	return r.min - r.min + new tannus_math_Random().randint(r.min | 0,r.max | 0);
};
tannus_math_RandomTools.choice = function(set) {
	return new tannus_math_Random().choice(set);
};
tannus_math_RandomTools.shuffle = function(set) {
	return new tannus_math_Random().shuffle(set);
};
tannus_math_RandomTools.randomConstruct = function(enumer) {
	return new tannus_math_Random().enumConstruct(enumer);
};
tannus_math_RandomTools.get_rand = function() {
	return new tannus_math_Random();
};
var tannus_math__$Ratio_Ratio_$Impl_$ = {};
$hxClasses["tannus.math._Ratio.Ratio_Impl_"] = tannus_math__$Ratio_Ratio_$Impl_$;
tannus_math__$Ratio_Ratio_$Impl_$.__name__ = ["tannus","math","_Ratio","Ratio_Impl_"];
tannus_math__$Ratio_Ratio_$Impl_$._new = function(top,bottom) {
	return new tannus_math_CRatio(top,bottom);
};
tannus_math__$Ratio_Ratio_$Impl_$.equals = function(this1,other) {
	return this1.equals(other);
};
tannus_math__$Ratio_Ratio_$Impl_$.toFloat = function(this1) {
	return this1.toFloat();
};
tannus_math__$Ratio_Ratio_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_math__$Ratio_Ratio_$Impl_$.toPercent = function(this1) {
	return this1.toPercent();
};
tannus_math__$Ratio_Ratio_$Impl_$.fromFloatArray = function(a) {
	return new tannus_math_CRatio(a[0],a[1]);
};
tannus_math__$Ratio_Ratio_$Impl_$.fromIntArray = function(a) {
	return new tannus_math_CRatio(a[0],a[1]);
};
var tannus_math_CRatio = function(t,b) {
	this.top = t;
	this.bottom = b;
};
$hxClasses["tannus.math.CRatio"] = tannus_math_CRatio;
tannus_math_CRatio.__name__ = ["tannus","math","CRatio"];
tannus_math_CRatio.prototype = {
	toFloat: function() {
		return this.top / this.bottom;
	}
	,toString: function() {
		return "" + this.top + " / " + this.bottom;
	}
	,toPercent: function() {
		return tannus_math__$Percent_Percent_$Impl_$.percent(this.top,this.bottom);
	}
	,equals: function(other) {
		return this.toFloat() == other.toFloat();
	}
	,get_percent: function() {
		return this.toPercent();
	}
	,__class__: tannus_math_CRatio
	,__properties__: {get_percent:"get_percent"}
};
var tannus_math_TMath = function() { };
$hxClasses["tannus.math.TMath"] = tannus_math_TMath;
tannus_math_TMath.__name__ = ["tannus","math","TMath"];
tannus_math_TMath.clamp_Float = function(value,min,max) {
	if(value < min) return min; else if(value > max) return max; else return value;
};
tannus_math_TMath.clamp_Int = function(value,min,max) {
	if(value < min) return min; else if(value > max) return max; else return value;
};
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
var tannus_mvc_Asset = function() { };
$hxClasses["tannus.mvc.Asset"] = tannus_mvc_Asset;
tannus_mvc_Asset.__name__ = ["tannus","mvc","Asset"];
tannus_mvc_Asset.__interfaces__ = [tannus_ds_Destructible];
tannus_mvc_Asset.prototype = {
	__class__: tannus_mvc_Asset
};
var tannus_mvc_Model = function() {
	tannus_io_EventDispatcher.call(this);
	this.assets = [];
	this.readyReqs = new tannus_mvc_Requirements();
	this._ready = new tannus_io_VoidSignal();
	this._bindMethodsToEvents();
};
$hxClasses["tannus.mvc.Model"] = tannus_mvc_Model;
tannus_mvc_Model.__name__ = ["tannus","mvc","Model"];
tannus_mvc_Model.__interfaces__ = [tannus_mvc_Asset];
tannus_mvc_Model.__super__ = tannus_io_EventDispatcher;
tannus_mvc_Model.prototype = $extend(tannus_io_EventDispatcher.prototype,{
	init: function(cb) {
		var _g = this;
		if(cb != null) this._ready.once(cb);
		this.readyReqs.meet(function() {
			_g.sync(function() {
				_g._ready.call();
			});
		});
	}
	,onready: function(f) {
		this._ready.once(f);
	}
	,link: function(item) {
		this.assets.push(item);
	}
	,unlink: function(item) {
		HxOverrides.remove(this.assets,item);
	}
	,destroy: function() {
		var _g = 0;
		var _g1 = this.assets;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			a.destroy();
		}
	}
	,detach: function() {
		var _g = 0;
		var _g1 = this.assets;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			a.detach();
		}
	}
	,require: function(name,task) {
		this.readyReqs.tasks.set(name,task);
	}
	,sync: function(done) {
		this.storage.push(done);
	}
	,save: function() {
		this.sync(function() {
			null;
		});
	}
	,getAttribute: function(key) {
		return this.storage.get(this.map_key(key));
	}
	,get: function(k) {
		return this.getAttribute(k);
	}
	,setAttribute: function(key,value) {
		return this.storage.set(this.map_key(key),value);
	}
	,set: function(key,value) {
		return this.setAttribute(key,value);
	}
	,attribute: function(key) {
		var ref;
		var g = (function(f,a1) {
			return function() {
				return f(a1);
			};
		})($bind(this,this.getAttribute),key);
		var s = (function(f1,a11) {
			return function(a2) {
				return f1(a11,a2);
			};
		})($bind(this,this.setAttribute),key);
		ref = new tannus_io__$Pointer_Ref(g,s);
		return ref;
	}
	,hasAttribute: function(name) {
		return this.storage.exists(this.map_key(name));
	}
	,exists: function(key) {
		return this.hasAttribute(key);
	}
	,removeAttribute: function(name) {
		var had = this.hasAttribute(name);
		this.storage.remove(this.map_key(name));
		return had;
	}
	,remove: function(key) {
		return this.removeAttribute(key);
	}
	,watch: function(cb) {
		this.storage.watch(cb);
	}
	,watchKey: function(key,cb) {
		this.watch(function(com) {
			switch(com[1]) {
			case 0:
				var k = com[2];
				if(k == key) cb(); else null;
				break;
			case 1:
				var k1 = com[2];
				if(k1 == key) cb(); else null;
				break;
			case 2:
				var k2 = com[2];
				if(k2 == key) cb(); else null;
				break;
			default:
				null;
			}
		});
	}
	,map_key: function(key) {
		return key;
	}
	,_bindMethodsToEvents: function() {
		var cclass = js_Boot.getClass(this);
		var data = haxe_rtti_Meta.getFields(cclass);
		var _g = 0;
		var _g1 = Reflect.fields(data);
		while(_g < _g1.length) {
			var name = _g1[_g];
			++_g;
			var field;
			{
				var this1 = Reflect.getProperty(data,name);
				if(this1 != null) field = this1; else field = this1;
			}
			if(Object.prototype.hasOwnProperty.call(field,"handle")) {
				var events = Reflect.getProperty(field,"handle");
				var val = Reflect.getProperty(this,name);
				if(!Reflect.isFunction(val)) throw new js__$Boot_HaxeError("TypeError: Cannot bind field " + name + "!");
				var _g2 = 0;
				while(_g2 < events.length) {
					var event = events[_g2];
					++_g2;
					if(!this.canDispatch(event)) this.addSignal(event);
					this.on(event,val);
				}
			}
		}
	}
	,set_storage: function(v) {
		this.storage = v;
		this.readyReqs.tasks.set("storage",function(met) {
			v.init(met);
		});
		return this.storage;
	}
	,__class__: tannus_mvc_Model
	,__properties__: {set_storage:"set_storage"}
});
var tannus_mvc_Requirements = function() {
	this.tasks = new haxe_ds_StringMap();
	this.complete = new tannus_io_VoidSignal();
};
$hxClasses["tannus.mvc.Requirements"] = tannus_mvc_Requirements;
tannus_mvc_Requirements.__name__ = ["tannus","mvc","Requirements"];
tannus_mvc_Requirements.prototype = {
	add: function(name,task) {
		this.tasks.set(name,task);
	}
	,onComplete: function(f) {
		this.complete.on(f);
	}
	,meet: function(cb) {
		if(cb != null) this.complete.on(cb);
		var stack = new tannus_ds_AsyncStack();
		var $it0 = this.tasks.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			stack.under(this.tasks.get(name));
		}
		stack.run(($_=this.complete,$bind($_,$_.fire)));
	}
	,__class__: tannus_mvc_Requirements
};
var tannus_nore_Check = $hxClasses["tannus.nore.Check"] = { __ename__ : ["tannus","nore","Check"], __constructs__ : ["TypeCheck","LooseTypeCheck","ShortTypeCheck","NestedCheck","FieldExistsCheck","FieldValueCheck","FieldValueBlockCheck","FieldValueTypeCheck","HelperCheck","GroupCheck","EitherCheck","InvertedCheck","TernaryCheck"] };
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
var tannus_nore_Token = $hxClasses["tannus.nore.Token"] = { __ename__ : ["tannus","nore","Token"], __constructs__ : ["TConst","TOperator","TBrackets","TBoxBrackets","TGroup","TTuple","TCall","THelper","TIf","TComma","TOr","TNot","TApprox","TDoubleDot"] };
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
var tannus_nore_Const = $hxClasses["tannus.nore.Const"] = { __ename__ : ["tannus","nore","Const"], __constructs__ : ["CIdent","CString","CReference","CNumber"] };
tannus_nore_Const.CIdent = function(id) { var $x = ["CIdent",0,id]; $x.__enum__ = tannus_nore_Const; $x.toString = $estr; return $x; };
tannus_nore_Const.CString = function(s,quotes) { var $x = ["CString",1,s,quotes]; $x.__enum__ = tannus_nore_Const; $x.toString = $estr; return $x; };
tannus_nore_Const.CReference = function(name) { var $x = ["CReference",2,name]; $x.__enum__ = tannus_nore_Const; $x.toString = $estr; return $x; };
tannus_nore_Const.CNumber = function(n) { var $x = ["CNumber",3,n]; $x.__enum__ = tannus_nore_Const; $x.toString = $estr; return $x; };
var tannus_nore_Value = $hxClasses["tannus.nore.Value"] = { __ename__ : ["tannus","nore","Value"], __constructs__ : ["VString","VNumber","VArray","VField"] };
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
var tannus_storage_Commit = $hxClasses["tannus.storage.Commit"] = { __ename__ : ["tannus","storage","Commit"], __constructs__ : ["Create","Delete","Change"] };
tannus_storage_Commit.Create = function(key,value) { var $x = ["Create",0,key,value]; $x.__enum__ = tannus_storage_Commit; $x.toString = $estr; return $x; };
tannus_storage_Commit.Delete = function(key) { var $x = ["Delete",1,key]; $x.__enum__ = tannus_storage_Commit; $x.toString = $estr; return $x; };
tannus_storage_Commit.Change = function(key,prev,next) { var $x = ["Change",2,key,prev,next]; $x.__enum__ = tannus_storage_Commit; $x.toString = $estr; return $x; };
var tannus_storage_Storage = function() {
	this.local = new haxe_ds_StringMap();
	this.remote = null;
	this.commits = [];
	this.deleted = [];
	this._ready = false;
	this._remote_commit = new tannus_ds_CRef($bind(this,this._remoteCommitSignal));
};
$hxClasses["tannus.storage.Storage"] = tannus_storage_Storage;
tannus_storage_Storage.__name__ = ["tannus","storage","Storage"];
tannus_storage_Storage.copy = function(d) {
	var result = new haxe_ds_StringMap();
	var $it0 = d.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		var value;
		value = __map_reserved[key] != null?d.getReserved(key):d.h[key];
		result.set(key,value);
	}
	return result;
};
tannus_storage_Storage.prototype = {
	fetch: function(done) {
		var _g = this;
		this._fetch(function(fdata) {
			_g.remote = fdata;
			done();
		});
	}
	,push: function(done) {
		var _g = this;
		this._fetch(function(fdata) {
			fdata = _g._applyCommits(fdata,_g.commits);
			_g._push(fdata,function(err) {
				if(err != null) throw new js__$Boot_HaxeError(err);
				_g.local = new haxe_ds_StringMap();
				_g.deleted = [];
				_g.commits = [];
				_g.remote = tannus_storage_Storage.copy(fdata);
				done();
			});
		});
	}
	,init: function(cb) {
		var _g = this;
		this.fetch(function() {
			_g._ready = true;
			cb();
		});
	}
	,get: function(key) {
		if(this.remote != null) {
			if(Lambda.has(this.deleted,key)) return null;
			var rv = this.remote.get(key);
			var lv = this.local.get(key);
			{
				var rem = rv;
				var rem1 = rv;
				if(rv == null) {
					var loc = lv;
					if(loc != null) return loc; else {
						var loc1 = lv;
						if(lv == null) {
							if(rem != null) return rem; else if(rem1 != null && loc1 != null) return loc1; else return null;
						} else switch(lv) {
						default:
							if(rem1 != null && loc1 != null) return loc1; else return null;
						}
					}
				} else switch(rv) {
				default:
					var loc1 = lv;
					if(lv == null) {
						if(rem != null) return rem; else if(rem1 != null && loc1 != null) return loc1; else return null;
					} else switch(lv) {
					default:
						if(rem1 != null && loc1 != null) return loc1; else return null;
					}
				}
			}
		} else throw new js__$Boot_HaxeError("StorageError: Storage has not been initialized!");
	}
	,set: function(key,value) {
		if(this.remote != null) {
			if(Lambda.has(this.deleted,key)) {
				HxOverrides.remove(this.deleted,key);
				this.commit(tannus_storage_Commit.Create(key,value));
			} else {
				var prev = this.get(key);
				if(prev != null) this.commit(tannus_storage_Commit.Change(key,prev,value)); else this.commit(tannus_storage_Commit.Create(key,value));
			}
			{
				this.local.set(key,value);
				value;
			}
			return value;
		} else throw new js__$Boot_HaxeError("StorageError: Storage has not been initialized!");
	}
	,exists: function(key) {
		if(this.remote != null) {
			if(Lambda.has(this.deleted,key)) return false; else return this.local.exists(key) || this.remote.exists(key);
		} else throw new js__$Boot_HaxeError("StorageError: Storage has not been initialized!");
	}
	,watch: function(handler) {
		var sig = this._remote_commit.get();
		sig.listen(handler,false);
	}
	,remove: function(key) {
		this.deleted.push(key);
		this.commit(tannus_storage_Commit.Delete(key));
	}
	,reference: function(key) {
		var ref;
		var g = (function(f,a1) {
			return function() {
				return f(a1);
			};
		})($bind(this,this.get),key);
		var s = (function(f1,a11) {
			return function(a2) {
				return f1(a11,a2);
			};
		})($bind(this,this.set),key);
		var d = (function(f2,a12) {
			return function() {
				f2(a12);
			};
		})($bind(this,this.remove),key);
		ref = new tannus_io__$Pointer_Ref(g,s);
		return ref;
	}
	,keys: function() {
		return tannus_ds_ArrayTools.unique(tannus_ds_MapTools.keyArray(this.remote).concat(tannus_ds_MapTools.keyArray(this.local)));
	}
	,_fetch: function(cb) {
		throw new js__$Boot_HaxeError("StorageMethodNotImplemented: _fetch!");
	}
	,_applyCommits: function(rem,coms) {
		var result = tannus_storage_Storage.copy(rem);
		var _g = 0;
		while(_g < coms.length) {
			var commit = coms[_g];
			++_g;
			switch(commit[1]) {
			case 0:
				var value = commit[3];
				var key = commit[2];
				var value1 = value;
				result.set(key,value1);
				break;
			case 2:
				var next = commit[4];
				var prev = commit[3];
				var key1 = commit[2];
				var value2 = next;
				result.set(key1,value2);
				break;
			case 1:
				var key2 = commit[2];
				result.remove(key2);
				break;
			}
		}
		return result;
	}
	,_push: function(data,cb) {
		throw new js__$Boot_HaxeError("StorageMethodNotImplemented: _push!");
	}
	,_remoteCommitSignal: function() {
		throw new js__$Boot_HaxeError("StorageMethodNotImplemented: _remoteCommitSignal!");
		return new tannus_io_Signal();
	}
	,commit: function(c) {
		this.commits.push(c);
	}
	,get_ready: function() {
		return this._ready;
	}
	,__class__: tannus_storage_Storage
	,__properties__: {get_ready:"get_ready"}
};
var tannus_storage_chrome_ChromeStorage = function(a) {
	tannus_storage_Storage.call(this);
	this.area = a;
};
$hxClasses["tannus.storage.chrome.ChromeStorage"] = tannus_storage_chrome_ChromeStorage;
tannus_storage_chrome_ChromeStorage.__name__ = ["tannus","storage","chrome","ChromeStorage"];
tannus_storage_chrome_ChromeStorage.__super__ = tannus_storage_Storage;
tannus_storage_chrome_ChromeStorage.prototype = $extend(tannus_storage_Storage.prototype,{
	_fetch: function(cb) {
		this.area.get(null,function(data) {
			cb(tannus_ds__$Object_Object_$Impl_$.toMap(data));
		});
	}
	,_push: function(map_data,cb) {
		var data = tannus_ds_MapTools.toObject(map_data);
		this.area.set(data,function() {
			cb(null);
		});
	}
	,_remoteCommitSignal: function() {
		var signal = new tannus_io_Signal();
		tannus_chrome__$StorageArea_StorageArea_$Impl_$.watchAll(this.area,function(change) {
			var removed = [];
			var created = new haxe_ds_StringMap();
			var changed = new haxe_ds_StringMap();
			var commits = [];
			var $it0 = change.keys();
			while( $it0.hasNext() ) {
				var key = $it0.next();
				var delta;
				delta = __map_reserved[key] != null?change.getReserved(key):change.h[key];
				{
					var _g = delta[1];
					var _g1 = delta[0];
					var value = _g;
					var prev = _g;
					if(_g == null) {
						var value1 = _g1;
						var v = value1;
						created.set(key,v);
						v;
						commits.push(tannus_storage_Commit.Create(key,value1));
					} else switch(_g) {
					default:
						var next = _g1;
						if(_g1 == null) {
							removed.push(key);
							commits.push(tannus_storage_Commit.Delete(key));
						} else switch(_g1) {
						default:
							if(__map_reserved[key] != null) changed.setReserved(key,delta); else changed.h[key] = delta;
							commits.push(tannus_storage_Commit.Change(key,prev,next));
						}
					}
				}
			}
			var _g2 = 0;
			while(_g2 < commits.length) {
				var c = commits[_g2];
				++_g2;
				signal.broadcast(c);
			}
		});
		return signal;
	}
	,__class__: tannus_storage_chrome_ChromeStorage
});
var tannus_sys__$Directory_Directory_$Impl_$ = {};
$hxClasses["tannus.sys._Directory.Directory_Impl_"] = tannus_sys__$Directory_Directory_$Impl_$;
tannus_sys__$Directory_Directory_$Impl_$.__name__ = ["tannus","sys","_Directory","Directory_Impl_"];
tannus_sys__$Directory_Directory_$Impl_$.__properties__ = {get_entries:"get_entries",get_exists:"get_exists",get_path:"get_path"}
tannus_sys__$Directory_Directory_$Impl_$._new = function(p,create) {
	if(create == null) create = false;
	var this1;
	this1 = p;
	if(tannus_sys_JavaScriptFileSystem.exists(this1.s)) {
		if(!tannus_sys_JavaScriptFileSystem.isDirectory(this1.s)) throw new js__$Boot_HaxeError((function($this) {
			var $r;
			var x;
			{
				var x1 = new tannus_sys__$Path_CPath("IOError: ");
				var s;
				{
					var this2 = tannus_sys__$Path_CPath.join([x1.s,p.s]);
					s = this2.s;
				}
				x = new tannus_sys__$Path_CPath(s);
			}
			var y = new tannus_sys__$Path_CPath(" is not a Directory!");
			$r = (function($this) {
				var $r;
				var s1;
				{
					var this3 = tannus_sys__$Path_CPath.join([x.s,y.s]);
					s1 = this3.s;
				}
				$r = new tannus_sys__$Path_CPath(s1);
				return $r;
			}($this));
			return $r;
		}(this)));
	} else if(create) tannus_sys_JavaScriptFileSystem.createDirectory(this1.s); else throw new js__$Boot_HaxeError((function($this) {
		var $r;
		var x2;
		{
			var x3 = new tannus_sys__$Path_CPath("IOError: ");
			var s2;
			{
				var this4 = tannus_sys__$Path_CPath.join([x3.s,p.s]);
				s2 = this4.s;
			}
			x2 = new tannus_sys__$Path_CPath(s2);
		}
		var y1 = new tannus_sys__$Path_CPath(" is not a File or a Directory!");
		$r = (function($this) {
			var $r;
			var s3;
			{
				var this5 = tannus_sys__$Path_CPath.join([x2.s,y1.s]);
				s3 = this5.s;
			}
			$r = new tannus_sys__$Path_CPath(s3);
			return $r;
		}($this));
		return $r;
	}(this)));
	return this1;
};
tannus_sys__$Directory_Directory_$Impl_$.get = function(this1,name) {
	var entry;
	{
		var p = new tannus_sys__$Path_CPath(name);
		if(tannus_sys_JavaScriptFileSystem.exists(p.s)) {
			if(tannus_sys_JavaScriptFileSystem.isDirectory(p.s)) {
				var et = tannus_sys_FSEntryType.Folder(p);
				entry = et;
			} else {
				var et1 = tannus_sys_FSEntryType.File(new tannus_sys_CFile(p));
				entry = et1;
			}
		} else throw new js__$Boot_HaxeError("IOError: Cannot create FSEntry instance for Path which does not exist");
	}
	var canRet;
	{
		var _g = entry;
		switch(_g[1]) {
		case 0:
			var f = _g[2];
			canRet = tannus_sys_JavaScriptFileSystem.exists(f._path.s);
			break;
		case 1:
			var f1 = _g[2];
			canRet = tannus_sys_JavaScriptFileSystem.exists(f1.s);
			break;
		}
	}
	if(canRet) return entry; else return null;
};
tannus_sys__$Directory_Directory_$Impl_$.file = function(this1,name) {
	var f;
	{
		var p;
		var y = new tannus_sys__$Path_CPath(name);
		var s;
		{
			var this2 = tannus_sys__$Path_CPath.join([this1.s,y.s]);
			s = this2.s;
		}
		p = new tannus_sys__$Path_CPath(s);
		f = new tannus_sys_CFile(p);
	}
	return f;
};
tannus_sys__$Directory_Directory_$Impl_$.iterator = function(this1) {
	var el = tannus_sys__$Directory_Directory_$Impl_$.get_entries(this1);
	return HxOverrides.iter(el);
};
tannus_sys__$Directory_Directory_$Impl_$.walk = function(this1,func) {
	var _g = 0;
	var _g1 = tannus_sys__$Directory_Directory_$Impl_$.get_entries(this1);
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		{
			var _g2 = e;
			switch(_g2[1]) {
			case 0:
				var f = _g2[2];
				func(e);
				break;
			case 1:
				var d = _g2[2];
				func(e);
				tannus_sys__$Directory_Directory_$Impl_$.walk(d,func);
				break;
			}
		}
	}
};
tannus_sys__$Directory_Directory_$Impl_$.walkRecursive = function(this1,tester) {
	var results = [];
	var _g = 0;
	var _g1 = tannus_sys__$Directory_Directory_$Impl_$.get_entries(this1);
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		{
			var _g2 = e;
			switch(_g2[1]) {
			case 0:
				var f = _g2[2];
				if(tester == null) results.push(f); else if(tester(f)) results.push(f);
				break;
			case 1:
				var d = _g2[2];
				results = results.concat(tannus_sys__$Directory_Directory_$Impl_$.walkRecursive(d,tester));
				break;
			}
		}
	}
	return results;
};
tannus_sys__$Directory_Directory_$Impl_$.rename = function(this1,ndir) {
	tannus_sys_JavaScriptFileSystem.volume.rename(this1.s,ndir);
	tannus_sys_JavaScriptFileSystem.save();
};
tannus_sys__$Directory_Directory_$Impl_$["delete"] = function(this1,force) {
	if(force == null) force = false;
	if(!force) tannus_sys_JavaScriptFileSystem.deleteDirectory(this1.s); else tannus_sys__$Directory_Directory_$Impl_$.walk(this1,function(entry) {
		{
			var _g = entry;
			switch(_g[1]) {
			case 0:
				var f = _g[2];
				tannus_sys_JavaScriptFileSystem.volume.deleteFile(f._path.s);
				tannus_sys_JavaScriptFileSystem.save();
				break;
			case 1:
				var f1 = _g[2];
				tannus_sys__$Directory_Directory_$Impl_$["delete"](f1,true);
				break;
			}
		}
	});
};
tannus_sys__$Directory_Directory_$Impl_$.get_path = function(this1) {
	return this1;
};
tannus_sys__$Directory_Directory_$Impl_$.get_exists = function(this1) {
	return tannus_sys_JavaScriptFileSystem.exists(this1.s);
};
tannus_sys__$Directory_Directory_$Impl_$.get_entries = function(this1) {
	var rnames;
	var _g = [];
	var _g1 = 0;
	var _g2 = tannus_sys_JavaScriptFileSystem.readDirectory(this1.s);
	while(_g1 < _g2.length) {
		var s = _g2[_g1];
		++_g1;
		_g.push(new tannus_sys__$Path_CPath(s));
	}
	rnames = _g;
	var elist = [];
	var _g21 = 0;
	var _g11 = rnames.length;
	while(_g21 < _g11) {
		var i = _g21++;
		rnames[i].set_directory(this1);
		elist.push((function($this) {
			var $r;
			var p = rnames[i];
			$r = tannus_sys_JavaScriptFileSystem.exists(p.s)?tannus_sys_JavaScriptFileSystem.isDirectory(p.s)?(function($this) {
				var $r;
				var et = tannus_sys_FSEntryType.Folder(p);
				$r = et;
				return $r;
			}($this)):(function($this) {
				var $r;
				var et1 = tannus_sys_FSEntryType.File(new tannus_sys_CFile(p));
				$r = et1;
				return $r;
			}($this)):(function($this) {
				var $r;
				throw new js__$Boot_HaxeError("IOError: Cannot create FSEntry instance for Path which does not exist");
				return $r;
			}($this));
			return $r;
		}(this)));
	}
	return elist;
};
var tannus_sys__$FSEntry_FSEntry_$Impl_$ = {};
$hxClasses["tannus.sys._FSEntry.FSEntry_Impl_"] = tannus_sys__$FSEntry_FSEntry_$Impl_$;
tannus_sys__$FSEntry_FSEntry_$Impl_$.__name__ = ["tannus","sys","_FSEntry","FSEntry_Impl_"];
tannus_sys__$FSEntry_FSEntry_$Impl_$.__properties__ = {get_name:"get_name",get_path:"get_path",get_type:"get_type"}
tannus_sys__$FSEntry_FSEntry_$Impl_$._new = function(et) {
	return et;
};
tannus_sys__$FSEntry_FSEntry_$Impl_$.get_type = function(this1) {
	return this1;
};
tannus_sys__$FSEntry_FSEntry_$Impl_$.get_path = function(this1) {
	{
		var _g = this1;
		switch(_g[1]) {
		case 0:
			var f = _g[2];
			return f._path;
		case 1:
			var f1 = _g[2];
			return f1;
		}
	}
};
tannus_sys__$FSEntry_FSEntry_$Impl_$.get_name = function(this1) {
	return tannus_sys__$FSEntry_FSEntry_$Impl_$.get_path(this1).get_name();
};
tannus_sys__$FSEntry_FSEntry_$Impl_$.rename = function(this1,ndir) {
	{
		var _g = this1;
		switch(_g[1]) {
		case 0:
			var f = _g[2];
			f.set_path(ndir);
			break;
		case 1:
			var f1 = _g[2];
			tannus_sys_JavaScriptFileSystem.volume.rename(f1.s,ndir.s);
			tannus_sys_JavaScriptFileSystem.save();
			break;
		}
	}
};
tannus_sys__$FSEntry_FSEntry_$Impl_$["delete"] = function(this1) {
	{
		var _g = this1;
		switch(_g[1]) {
		case 0:
			var f = _g[2];
			tannus_sys_JavaScriptFileSystem.volume.deleteFile(f._path.s);
			tannus_sys_JavaScriptFileSystem.save();
			break;
		case 1:
			var f1 = _g[2];
			tannus_sys__$Directory_Directory_$Impl_$["delete"](f1);
			break;
		}
	}
};
tannus_sys__$FSEntry_FSEntry_$Impl_$.file = function(this1) {
	{
		var _g = this1;
		switch(_g[1]) {
		case 0:
			var f = _g[2];
			return f;
		case 1:
			var d = _g[2];
			throw new js__$Boot_HaxeError("IOError: Cannot cast a Directory to a File!");
			break;
		}
	}
};
tannus_sys__$FSEntry_FSEntry_$Impl_$.isFile = function(this1) {
	{
		var _g = this1;
		switch(_g[1]) {
		case 0:
			var f = _g[2];
			return true;
		case 1:
			var d = _g[2];
			return false;
		}
	}
};
tannus_sys__$FSEntry_FSEntry_$Impl_$.isDirectory = function(this1) {
	{
		var _g = this1;
		switch(_g[1]) {
		case 0:
			var f = _g[2];
			return false;
		case 1:
			var d = _g[2];
			return true;
		}
	}
};
tannus_sys__$FSEntry_FSEntry_$Impl_$.folder = function(this1) {
	{
		var _g = this1;
		switch(_g[1]) {
		case 0:
			var f = _g[2];
			throw new js__$Boot_HaxeError("IOError: Cannot cast a File to a Directory!");
			break;
		case 1:
			var d = _g[2];
			return d;
		}
	}
};
tannus_sys__$FSEntry_FSEntry_$Impl_$.fromPath = function(p) {
	if(tannus_sys_JavaScriptFileSystem.exists(p.s)) {
		if(tannus_sys_JavaScriptFileSystem.isDirectory(p.s)) {
			var et = tannus_sys_FSEntryType.Folder(p);
			return et;
		} else {
			var et1 = tannus_sys_FSEntryType.File(new tannus_sys_CFile(p));
			return et1;
		}
	} else throw new js__$Boot_HaxeError("IOError: Cannot create FSEntry instance for Path which does not exist");
};
tannus_sys__$FSEntry_FSEntry_$Impl_$.fromString = function(s) {
	var p = new tannus_sys__$Path_CPath(s);
	if(tannus_sys_JavaScriptFileSystem.exists(p.s)) {
		if(tannus_sys_JavaScriptFileSystem.isDirectory(p.s)) {
			var et = tannus_sys_FSEntryType.Folder(p);
			return et;
		} else {
			var et1 = tannus_sys_FSEntryType.File(new tannus_sys_CFile(p));
			return et1;
		}
	} else throw new js__$Boot_HaxeError("IOError: Cannot create FSEntry instance for Path which does not exist");
};
var tannus_sys_FSEntryType = $hxClasses["tannus.sys.FSEntryType"] = { __ename__ : ["tannus","sys","FSEntryType"], __constructs__ : ["File","Folder"] };
tannus_sys_FSEntryType.File = function(f) { var $x = ["File",0,f]; $x.__enum__ = tannus_sys_FSEntryType; $x.toString = $estr; return $x; };
tannus_sys_FSEntryType.Folder = function(d) { var $x = ["Folder",1,d]; $x.__enum__ = tannus_sys_FSEntryType; $x.toString = $estr; return $x; };
var tannus_sys__$File_File_$Impl_$ = {};
$hxClasses["tannus.sys._File.File_Impl_"] = tannus_sys__$File_File_$Impl_$;
tannus_sys__$File_File_$Impl_$.__name__ = ["tannus","sys","_File","File_Impl_"];
tannus_sys__$File_File_$Impl_$._new = function(p) {
	return new tannus_sys_CFile(p);
};
tannus_sys__$File_File_$Impl_$.lines = function(this1,nlines) {
	if(nlines == null) return ((function($this) {
		var $r;
		var this2 = tannus_sys_JavaScriptFileSystem.read(this1._path.s);
		$r = this2.toString();
		return $r;
	}(this))).split("\n"); else {
		this1.write((function($this) {
			var $r;
			var s = nlines.join("\n");
			$r = tannus_io_impl_JavaScriptBinary.ofString(s);
			return $r;
		}(this)));
		return nlines;
	}
};
tannus_sys__$File_File_$Impl_$.fromString = function(p) {
	var p1 = new tannus_sys__$Path_CPath(p);
	return new tannus_sys_CFile(p1);
};
tannus_sys__$File_File_$Impl_$.fromPath = function(p) {
	return new tannus_sys_CFile(p);
};
tannus_sys__$File_File_$Impl_$.fromByteArray = function(p) {
	var p1 = p.toString();
	var p2 = new tannus_sys__$Path_CPath(p1);
	return new tannus_sys_CFile(p2);
};
var tannus_sys_CFile = function(p) {
	this._path = p;
	if(tannus_sys_JavaScriptFileSystem.exists(this._path.s) && tannus_sys_JavaScriptFileSystem.isDirectory(this._path.s)) tannus_sys_CFile.ferror((function($this) {
		var $r;
		var this1;
		{
			var x;
			var x1 = new tannus_sys__$Path_CPath("\"");
			var s;
			{
				var this2 = tannus_sys__$Path_CPath.join([x1.s,$this._path.s]);
				s = this2.s;
			}
			x = new tannus_sys__$Path_CPath(s);
			var y = new tannus_sys__$Path_CPath("\" is a directory!");
			var s1;
			{
				var this3 = tannus_sys__$Path_CPath.join([x.s,y.s]);
				s1 = this3.s;
			}
			this1 = new tannus_sys__$Path_CPath(s1);
		}
		$r = this1.s;
		return $r;
	}(this)));
};
$hxClasses["tannus.sys.CFile"] = tannus_sys_CFile;
tannus_sys_CFile.__name__ = ["tannus","sys","CFile"];
tannus_sys_CFile.ferror = function(msg) {
	throw new js__$Boot_HaxeError("FileError: " + msg);
};
tannus_sys_CFile.prototype = {
	read: function() {
		return tannus_sys_JavaScriptFileSystem.read(this._path.s);
	}
	,write: function(data) {
		tannus_sys_JavaScriptFileSystem.write(this._path.s,data);
	}
	,append: function(data) {
		tannus_sys_JavaScriptFileSystem.append(this._path.s,data);
	}
	,rename: function(newpath) {
		this.set_path(newpath);
	}
	,'delete': function() {
		tannus_sys_JavaScriptFileSystem.volume.deleteFile(this._path.s);
		tannus_sys_JavaScriptFileSystem.save();
	}
	,get_exists: function() {
		return tannus_sys_JavaScriptFileSystem.exists(this._path.s);
	}
	,get_size: function() {
		var stats = tannus_sys_JavaScriptFileSystem.volume.stat(this._path.s);
		return stats.size;
	}
	,get_data: function() {
		return tannus_sys_JavaScriptFileSystem.read(this._path.s);
	}
	,set_data: function(nd) {
		tannus_sys_JavaScriptFileSystem.write(this._path.s,nd);
		return tannus_sys_JavaScriptFileSystem.read(this._path.s);
	}
	,get_content: function() {
		var f = this;
		var f1 = new tannus_io__$Pointer_Ref(function() {
			return f;
		},function(v) {
			return f = v;
		});
		return f1;
	}
	,get_path: function() {
		return this._path;
	}
	,set_path: function(np) {
		tannus_sys_JavaScriptFileSystem.volume.rename(this._path.s,np.s);
		tannus_sys_JavaScriptFileSystem.save();
		return this._path = np;
	}
	,get_directory: function() {
		return this._path.get_directory();
	}
	,get_input: function() {
		var inp = new haxe_io_BytesInput((function($this) {
			var $r;
			var this1 = $this.get_data();
			$r = this1.toBytes();
			return $r;
		}(this)));
		return inp;
	}
	,__class__: tannus_sys_CFile
	,__properties__: {get_input:"get_input",get_directory:"get_directory",set_path:"set_path",get_path:"get_path",get_content:"get_content",set_data:"set_data",get_data:"get_data",get_size:"get_size",get_exists:"get_exists"}
};
var tannus_sys__$GlobStar_GlobStar_$Impl_$ = {};
$hxClasses["tannus.sys._GlobStar.GlobStar_Impl_"] = tannus_sys__$GlobStar_GlobStar_$Impl_$;
tannus_sys__$GlobStar_GlobStar_$Impl_$.__name__ = ["tannus","sys","_GlobStar","GlobStar_Impl_"];
tannus_sys__$GlobStar_GlobStar_$Impl_$._new = function(s) {
	return new tannus_sys_CGlobStar(s);
};
tannus_sys__$GlobStar_GlobStar_$Impl_$.fromString = function(s) {
	return new tannus_sys_CGlobStar(s);
};
var tannus_sys_CGlobStar = $hx_exports.globstar = function(pat) {
	this.spat = pat;
	var data = tannus_sys_gs_Printer.compile(pat);
	this.pattern = data.regex;
	this.pind = data.params;
};
$hxClasses["tannus.sys.CGlobStar"] = tannus_sys_CGlobStar;
tannus_sys_CGlobStar.__name__ = ["tannus","sys","CGlobStar"];
tannus_sys_CGlobStar.prototype = {
	test: function(path) {
		var data = tannus_io__$RegEx_RegEx_$Impl_$.matches(this.pattern,path);
		if(data.length == 0) return false; else return StringTools.trim(tannus_ds_StringUtils.remove(path,data[0][0])) == "";
	}
	,match: function(s) {
		var dat = tannus_io__$RegEx_RegEx_$Impl_$.matches(this.pattern,s);
		if(dat.length == 0) return null; else {
			var m = dat[0];
			var res = { };
			var $it0 = this.pind.keys();
			while( $it0.hasNext() ) {
				var k = $it0.next();
				var i = this.pind.get(k);
				console.log(i);
				{
					Reflect.setProperty(res,k,m[i + 1]);
					Reflect.getProperty(res,k);
				}
			}
			return res;
		}
	}
	,__class__: tannus_sys_CGlobStar
};
var tannus_sys_Token = $hxClasses["tannus.sys.Token"] = { __ename__ : ["tannus","sys","Token"], __constructs__ : ["TLiteral","TExpan"] };
tannus_sys_Token.TLiteral = function(s) { var $x = ["TLiteral",0,s]; $x.__enum__ = tannus_sys_Token; $x.toString = $estr; return $x; };
tannus_sys_Token.TExpan = function(bits) { var $x = ["TExpan",1,bits]; $x.__enum__ = tannus_sys_Token; $x.toString = $estr; return $x; };
var tannus_sys_JavaScriptFileSystem = function() { };
$hxClasses["tannus.sys.JavaScriptFileSystem"] = tannus_sys_JavaScriptFileSystem;
tannus_sys_JavaScriptFileSystem.__name__ = ["tannus","sys","JavaScriptFileSystem"];
tannus_sys_JavaScriptFileSystem.__properties__ = {get_v:"get_v"}
tannus_sys_JavaScriptFileSystem.load = function() {
	var ls = js_Browser.getLocalStorage();
	var saved = ls.getItem("::fs::");
	if(saved == null) {
		tannus_sys_JavaScriptFileSystem.volume = new tannus_sys_VirtualVolume("fs");
		tannus_sys_JavaScriptFileSystem.save();
	} else tannus_sys_JavaScriptFileSystem.volume = tannus_sys_VirtualVolume.deserialize(tannus_io_impl_JavaScriptBinary.ofString(saved));
};
tannus_sys_JavaScriptFileSystem.save = function() {
	var ls = js_Browser.getLocalStorage();
	var data = tannus_sys_JavaScriptFileSystem.volume.serialize();
	ls.setItem("::fs::",data.toString());
};
tannus_sys_JavaScriptFileSystem.get_v = function() {
	return tannus_sys_JavaScriptFileSystem.volume;
};
tannus_sys_JavaScriptFileSystem.exists = function(name) {
	return tannus_sys_JavaScriptFileSystem.volume.exists(name);
};
tannus_sys_JavaScriptFileSystem.isDirectory = function(name) {
	return tannus_sys_JavaScriptFileSystem.volume.isDirectory(name);
};
tannus_sys_JavaScriptFileSystem.createDirectory = function(name) {
	tannus_sys_JavaScriptFileSystem.volume.createDirectory(name);
	tannus_sys_JavaScriptFileSystem.save();
};
tannus_sys_JavaScriptFileSystem.deleteDirectory = function(name) {
	tannus_sys_JavaScriptFileSystem.volume.deleteDirectory(name);
	tannus_sys_JavaScriptFileSystem.save();
};
tannus_sys_JavaScriptFileSystem.deleteFile = function(name) {
	tannus_sys_JavaScriptFileSystem.volume.deleteFile(name);
	tannus_sys_JavaScriptFileSystem.save();
};
tannus_sys_JavaScriptFileSystem.readDirectory = function(name) {
	return tannus_sys_JavaScriptFileSystem.volume.readDirectory(name);
};
tannus_sys_JavaScriptFileSystem.read = function(name) {
	return tannus_sys_JavaScriptFileSystem.volume.read(name);
};
tannus_sys_JavaScriptFileSystem.write = function(name,data) {
	tannus_sys_JavaScriptFileSystem.volume.write(name,data);
	tannus_sys_JavaScriptFileSystem.save();
};
tannus_sys_JavaScriptFileSystem.append = function(name,data) {
	tannus_sys_JavaScriptFileSystem.volume.append(name,data);
	tannus_sys_JavaScriptFileSystem.save();
};
tannus_sys_JavaScriptFileSystem.rename = function(o,n) {
	tannus_sys_JavaScriptFileSystem.volume.rename(o,n);
	tannus_sys_JavaScriptFileSystem.save();
};
tannus_sys_JavaScriptFileSystem.stat = function(name) {
	return tannus_sys_JavaScriptFileSystem.volume.stat(name);
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
var tannus_sys_Mimes = $hx_exports.tannus.sys.Mimes = function() { };
$hxClasses["tannus.sys.Mimes"] = tannus_sys_Mimes;
tannus_sys_Mimes.__name__ = ["tannus","sys","Mimes"];
tannus_sys_Mimes.minit = function() {
	if(!tannus_sys_Mimes.initted) tannus_sys_Mimes.__init();
};
tannus_sys_Mimes.getMimeType = function(ext) {
	if(!tannus_sys_Mimes.initted) tannus_sys_Mimes.__init();
	if(StringTools.startsWith(ext,".")) ext = ext.substring(1);
	if(tannus_sys_Mimes.extensions.exists(ext)) return tannus_sys_Mimes.extensions.get(ext); else return "application/octet-stream";
};
tannus_sys_Mimes.getExtensionList = function(mime) {
	if(!tannus_sys_Mimes.initted) tannus_sys_Mimes.__init();
	if(tannus_sys_Mimes.types.exists(mime)) return tannus_sys_Mimes.types.get(mime); else return [];
};
tannus_sys_Mimes.__init = function() {
	tannus_sys_Mimes.types = new haxe_ds_StringMap();
	tannus_sys_Mimes.extensions = new haxe_ds_StringMap();
	var all = Reflect.fields(tannus_sys_Mimes.primitive);
	var _g = 0;
	while(_g < all.length) {
		var ext = all[_g];
		++_g;
		var type = Std.string(Reflect.getProperty(tannus_sys_Mimes.primitive,ext));
		{
			tannus_sys_Mimes.extensions.set(ext,type);
			type;
		}
		if(tannus_sys_Mimes.types.get(type) == null) {
			var v = [];
			tannus_sys_Mimes.types.set(type,v);
			v;
		}
		tannus_sys_Mimes.types.get(type).push(ext);
	}
	tannus_sys_Mimes.initted = true;
};
var tannus_sys__$Path_Path_$Impl_$ = {};
$hxClasses["tannus.sys._Path.Path_Impl_"] = tannus_sys__$Path_Path_$Impl_$;
tannus_sys__$Path_Path_$Impl_$.__name__ = ["tannus","sys","_Path","Path_Impl_"];
tannus_sys__$Path_Path_$Impl_$._new = function(s) {
	return new tannus_sys__$Path_CPath(s);
};
tannus_sys__$Path_Path_$Impl_$.sum = function(x,y) {
	var s;
	{
		var this1 = tannus_sys__$Path_CPath.join([x.s,y.s]);
		s = this1.s;
	}
	return new tannus_sys__$Path_CPath(s);
};
tannus_sys__$Path_Path_$Impl_$.toString = function(this1) {
	return this1.s;
};
tannus_sys__$Path_Path_$Impl_$.fromString = function(s) {
	return new tannus_sys__$Path_CPath(s);
};
tannus_sys__$Path_Path_$Impl_$.toByteArray = function(this1) {
	return tannus_io_impl_JavaScriptBinary.ofString(this1.s);
};
tannus_sys__$Path_Path_$Impl_$.fromByteArray = function(b) {
	var s = b.toString();
	return new tannus_sys__$Path_CPath(s);
};
var tannus_sys__$Path_CPath = function(str) {
	this.s = str;
};
$hxClasses["tannus.sys._Path.CPath"] = tannus_sys__$Path_CPath;
tannus_sys__$Path_CPath.__name__ = ["tannus","sys","_Path","CPath"];
tannus_sys__$Path_CPath.join = function(list) {
	var res = haxe_io_Path.join(list);
	return new tannus_sys__$Path_CPath(res);
};
tannus_sys__$Path_CPath._expand = function(p) {
	var segments = p.get_pieces();
	var pieces = [];
	var _g = 0;
	while(_g < segments.length) {
		var s = segments[_g];
		++_g;
		switch(s) {
		case ".":case "":
			continue;
			break;
		case "..":
			pieces.pop();
			break;
		default:
			pieces.push(s);
		}
	}
	var result = tannus_sys__$Path_CPath.join(pieces).normalize();
	return result;
};
tannus_sys__$Path_CPath.err = function(msg) {
	throw new js__$Boot_HaxeError("PathError: " + msg);
};
tannus_sys__$Path_CPath.prototype = {
	toString: function() {
		return this.s;
	}
	,normalize: function() {
		{
			var s = haxe_io_Path.normalize(this.s);
			return new tannus_sys__$Path_CPath(s);
		}
	}
	,absolutize: function() {
		var spath = this.s + "";
		if(!StringTools.startsWith(spath,"/")) spath = "/" + spath;
		console.log(spath);
		return new tannus_sys__$Path_CPath(spath);
	}
	,expand: function() {
		return tannus_sys__$Path_CPath._expand(this);
	}
	,resolve: function(other) {
		if(!this.get_absolute()) throw new js__$Boot_HaxeError("PathError: " + "Cannot resolve a relative Path by another relative Path; One of them must be absolute!"); else {
			var joined = tannus_sys__$Path_CPath.join([this.s,other.s]).normalize();
			var result = tannus_sys__$Path_CPath._expand(joined);
			return result;
		}
		return new tannus_sys__$Path_CPath("");
	}
	,relative: function(other) {
		if(this.get_absolute() && other.get_absolute()) {
			var a = this.get_pieces();
			var b = other.get_pieces();
			var keep = [];
			var diffs = 0;
			var additions = [];
			var diffhit = false;
			var _g1 = 0;
			var _g = a.length;
			while(_g1 < _g) {
				var i = _g1++;
				var mine = a[i];
				var yurs = b[i];
				if(mine != yurs) diffhit = true;
				if(!diffhit) keep.push(mine); else {
					diffs++;
					if(yurs != null) additions.push(yurs);
				}
			}
			var respieces = tannus_ds_ArrayTools.times([".."],diffs).concat(additions);
			return tannus_sys__$Path_CPath.join(respieces);
		} else throw new js__$Boot_HaxeError("PathError: " + "Both Paths must be absolute!");
		return new tannus_sys__$Path_CPath("");
	}
	,get_sdir: function() {
		return haxe_io_Path.directory(this.s);
	}
	,get_str: function() {
		return this.s;
	}
	,set_str: function(v) {
		return this.s = v;
	}
	,get_directory: function() {
		var s = this.get_sdir();
		return new tannus_sys__$Path_CPath(s);
	}
	,set_directory: function(v) {
		var this1 = tannus_sys__$Path_CPath.join([v.s,this.get_name()]);
		this.s = this1.s;
		return this.get_directory();
	}
	,get_name: function() {
		return haxe_io_Path.withoutDirectory(this.s);
	}
	,set_name: function(v) {
		var this1 = tannus_sys__$Path_CPath.join([this.get_sdir(),v]);
		this.s = this1.s;
		return this.get_name();
	}
	,get_basename: function() {
		return haxe_io_Path.withoutExtension(this.s);
	}
	,set_basename: function(v) {
		this.set_name(v + ("." + this.get_extension()));
		return this.get_basename();
	}
	,get_extension: function() {
		return haxe_io_Path.extension(this.s);
	}
	,set_extension: function(v) {
		this.s = tannus_ds_StringUtils.beforeLast(this.s,".") + ("." + v);
		return this.get_extension();
	}
	,get_mime: function() {
		if(!tannus_ds_StringUtils.empty(this.get_extension())) {
			var m = tannus_sys_Mimes.getMimeType(this.get_extension());
			return m;
		} else return null;
	}
	,get_root: function() {
		return tannus_ds_StringUtils.empty(this.get_sdir());
	}
	,get_absolute: function() {
		return haxe_io_Path.isAbsolute(this.s);
	}
	,get_pieces: function() {
		return this.s.split("/");
	}
	,set_pieces: function(v) {
		var this1 = tannus_sys__$Path_CPath.join(v);
		this.s = this1.s;
		return this.get_pieces();
	}
	,__class__: tannus_sys__$Path_CPath
	,__properties__: {set_pieces:"set_pieces",get_pieces:"get_pieces",get_absolute:"get_absolute",get_root:"get_root",get_mime:"get_mime",set_extension:"set_extension",get_extension:"get_extension",set_basename:"set_basename",get_basename:"get_basename",set_name:"set_name",get_name:"get_name",set_directory:"set_directory",get_directory:"get_directory",set_str:"set_str",get_str:"get_str",get_sdir:"get_sdir"}
};
var tannus_sys_VVEntry = function(vv,nam,typ) {
	this.name = nam;
	this.content = null;
	this.type = typ;
	this.meta = new haxe_ds_StringMap();
	this.volume = vv;
	this.__init();
};
$hxClasses["tannus.sys.VVEntry"] = tannus_sys_VVEntry;
tannus_sys_VVEntry.__name__ = ["tannus","sys","VVEntry"];
tannus_sys_VVEntry.deserialize = function(o,vol) {
	var e = new tannus_sys_VVEntry(vol,o.name,o.type);
	e.meta = o.meta;
	e.content = o.content;
	return e;
};
tannus_sys_VVEntry.prototype = {
	__init: function() {
		this.set_cdate(new Date());
	}
	,update: function() {
		this.set_mdate(new Date());
	}
	,list: function() {
		var _g = this;
		if(!this.get_isFile()) {
			var entries = this.volume.entries;
			return entries.filter(function(e) {
				return new tannus_sys__$Path_CPath(e.name).get_directory() == new tannus_sys__$Path_CPath(_g.name);
			});
		} else throw new js__$Boot_HaxeError((function($this) {
			var $r;
			var x = new tannus_sys__$Path_CPath("IOError: ");
			var y;
			{
				var x1;
				var x2 = new tannus_sys__$Path_CPath("\"");
				var y2 = new tannus_sys__$Path_CPath($this.name);
				var s;
				{
					var this1 = tannus_sys__$Path_CPath.join([x2.s,y2.s]);
					s = this1.s;
				}
				x1 = new tannus_sys__$Path_CPath(s);
				var y1 = new tannus_sys__$Path_CPath("\" is a File!");
				var s1;
				{
					var this2 = tannus_sys__$Path_CPath.join([x1.s,y1.s]);
					s1 = this2.s;
				}
				y = new tannus_sys__$Path_CPath(s1);
			}
			$r = (function($this) {
				var $r;
				var s2;
				{
					var this3 = tannus_sys__$Path_CPath.join([x.s,y.s]);
					s2 = this3.s;
				}
				$r = new tannus_sys__$Path_CPath(s2);
				return $r;
			}($this));
			return $r;
		}(this)));
		return [];
	}
	,write: function(data) {
		if(this.get_isFile() || !this.volume.exists((function($this) {
			var $r;
			var this1 = new tannus_sys__$Path_CPath($this.name);
			$r = this1.s;
			return $r;
		}(this)))) {
			this.content = data;
			this.set_mdate(new Date());
		} else throw new js__$Boot_HaxeError((function($this) {
			var $r;
			var x = new tannus_sys__$Path_CPath("IOError: ");
			var y;
			{
				var x1;
				var x2 = new tannus_sys__$Path_CPath("\"");
				var y2 = new tannus_sys__$Path_CPath($this.name);
				var s;
				{
					var this2 = tannus_sys__$Path_CPath.join([x2.s,y2.s]);
					s = this2.s;
				}
				x1 = new tannus_sys__$Path_CPath(s);
				var y1 = new tannus_sys__$Path_CPath("\" is a Directory!");
				var s1;
				{
					var this3 = tannus_sys__$Path_CPath.join([x1.s,y1.s]);
					s1 = this3.s;
				}
				y = new tannus_sys__$Path_CPath(s1);
			}
			$r = (function($this) {
				var $r;
				var s2;
				{
					var this4 = tannus_sys__$Path_CPath.join([x.s,y.s]);
					s2 = this4.s;
				}
				$r = new tannus_sys__$Path_CPath(s2);
				return $r;
			}($this));
			return $r;
		}(this)));
	}
	,read: function() {
		if(this.get_isFile()) {
			if(this.content == null) return tannus_io_impl_JavaScriptBinary.ofString(""); else return this.content;
		} else throw new js__$Boot_HaxeError((function($this) {
			var $r;
			var x = new tannus_sys__$Path_CPath("IOError: ");
			var y;
			{
				var x1;
				var x2 = new tannus_sys__$Path_CPath("\"");
				var y2 = new tannus_sys__$Path_CPath($this.name);
				var s;
				{
					var this1 = tannus_sys__$Path_CPath.join([x2.s,y2.s]);
					s = this1.s;
				}
				x1 = new tannus_sys__$Path_CPath(s);
				var y1 = new tannus_sys__$Path_CPath("\" cannot be read!");
				var s1;
				{
					var this2 = tannus_sys__$Path_CPath.join([x1.s,y1.s]);
					s1 = this2.s;
				}
				y = new tannus_sys__$Path_CPath(s1);
			}
			$r = (function($this) {
				var $r;
				var s2;
				{
					var this3 = tannus_sys__$Path_CPath.join([x.s,y.s]);
					s2 = this3.s;
				}
				$r = new tannus_sys__$Path_CPath(s2);
				return $r;
			}($this));
			return $r;
		}(this)));
		var this4;
		this4 = tannus_io_impl_JavaScriptBinary.alloc(0);
		return this4;
	}
	,append: function(data) {
		if(this.get_isFile()) {
			this.content = this.read();
			this.content.append(data);
			this.set_mdate(new Date());
		} else throw new js__$Boot_HaxeError((function($this) {
			var $r;
			var x = new tannus_sys__$Path_CPath("IOError: ");
			var y;
			{
				var x1;
				var x2 = new tannus_sys__$Path_CPath("\"");
				var y2 = new tannus_sys__$Path_CPath($this.name);
				var s;
				{
					var this1 = tannus_sys__$Path_CPath.join([x2.s,y2.s]);
					s = this1.s;
				}
				x1 = new tannus_sys__$Path_CPath(s);
				var y1 = new tannus_sys__$Path_CPath("\" cannot be written to!");
				var s1;
				{
					var this2 = tannus_sys__$Path_CPath.join([x1.s,y1.s]);
					s1 = this2.s;
				}
				y = new tannus_sys__$Path_CPath(s1);
			}
			$r = (function($this) {
				var $r;
				var s2;
				{
					var this3 = tannus_sys__$Path_CPath.join([x.s,y.s]);
					s2 = this3.s;
				}
				$r = new tannus_sys__$Path_CPath(s2);
				return $r;
			}($this));
			return $r;
		}(this)));
	}
	,rename: function(newname) {
		if(this.get_isFile()) this.name = newname; else {
			var subs = this.list();
			var _g = 0;
			while(_g < subs.length) {
				var e = subs[_g];
				++_g;
				var np;
				{
					var this1 = new tannus_sys__$Path_CPath(e.name).normalize();
					np = this1.s;
				}
				np = StringTools.replace(np,(function($this) {
					var $r;
					var this2 = new tannus_sys__$Path_CPath($this.name).normalize();
					$r = this2.s;
					return $r;
				}(this)),(function($this) {
					var $r;
					var this3 = new tannus_sys__$Path_CPath(newname).normalize();
					$r = this3.s;
					return $r;
				}(this)));
				e.name = np;
			}
			this.name = newname;
		}
	}
	,serialize: function() {
		return { 'name' : this.name, 'type' : this.type, 'meta' : this.meta, 'content' : this.content};
	}
	,get_path: function() {
		return new tannus_sys__$Path_CPath(this.name);
	}
	,set_path: function(np) {
		this.name = np.s;
		return new tannus_sys__$Path_CPath(this.name);
	}
	,get_stats: function() {
		if(!this.get_isFile()) throw new js__$Boot_HaxeError((function($this) {
			var $r;
			var x = new tannus_sys__$Path_CPath("IOError: ");
			var y;
			{
				var x1;
				var x2 = new tannus_sys__$Path_CPath("\"");
				var y2 = new tannus_sys__$Path_CPath($this.name);
				var s;
				{
					var this1 = tannus_sys__$Path_CPath.join([x2.s,y2.s]);
					s = this1.s;
				}
				x1 = new tannus_sys__$Path_CPath(s);
				var y1 = new tannus_sys__$Path_CPath("\" is a Directory!");
				var s1;
				{
					var this2 = tannus_sys__$Path_CPath.join([x1.s,y1.s]);
					s1 = this2.s;
				}
				y = new tannus_sys__$Path_CPath(s1);
			}
			$r = (function($this) {
				var $r;
				var s2;
				{
					var this3 = tannus_sys__$Path_CPath.join([x.s,y.s]);
					s2 = this3.s;
				}
				$r = new tannus_sys__$Path_CPath(s2);
				return $r;
			}($this));
			return $r;
		}(this)));
		return { 'size' : this.read().get_length(), 'ctime' : this.get_cdate(), 'mtime' : this.get_mdate()};
	}
	,get_isFile: function() {
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			return true;
		default:
			return false;
		}
	}
	,get_isDirectory: function() {
		return !this.get_isFile();
	}
	,get_cdate: function() {
		return this.meta.get("cdate");
	}
	,set_cdate: function(cd) {
		var _cd = this.meta.get("cdate");
		if(_cd != null && js_Boot.__instanceof(_cd,Date)) return _cd; else return (function($this) {
			var $r;
			$this.meta.set("cdate",cd);
			$r = cd;
			return $r;
		}(this));
	}
	,get_mdate: function() {
		var m = this.meta.get("mdate");
		if(m != null) return m; else return this.get_cdate();
	}
	,set_mdate: function(nm) {
		return (function($this) {
			var $r;
			$this.meta.set("mdate",nm);
			$r = nm;
			return $r;
		}(this));
	}
	,__class__: tannus_sys_VVEntry
	,__properties__: {set_mdate:"set_mdate",get_mdate:"get_mdate",set_cdate:"set_cdate",get_cdate:"get_cdate",get_isDirectory:"get_isDirectory",get_isFile:"get_isFile",get_stats:"get_stats",set_path:"set_path",get_path:"get_path"}
};
var tannus_sys_VVType = $hxClasses["tannus.sys.VVType"] = { __ename__ : ["tannus","sys","VVType"], __constructs__ : ["VVFile","VVFolder"] };
tannus_sys_VVType.VVFile = ["VVFile",0];
tannus_sys_VVType.VVFile.toString = $estr;
tannus_sys_VVType.VVFile.__enum__ = tannus_sys_VVType;
tannus_sys_VVType.VVFolder = ["VVFolder",1];
tannus_sys_VVType.VVFolder.toString = $estr;
tannus_sys_VVType.VVFolder.__enum__ = tannus_sys_VVType;
var tannus_sys_VirtualVolume = function(nam) {
	this.name = nam;
	this.entries = [];
};
$hxClasses["tannus.sys.VirtualVolume"] = tannus_sys_VirtualVolume;
tannus_sys_VirtualVolume.__name__ = ["tannus","sys","VirtualVolume"];
tannus_sys_VirtualVolume.deserialize = function(data) {
	var bits = haxe_Unserializer.run(data.toString());
	var vv = new tannus_sys_VirtualVolume("wut");
	var _g = 0;
	while(_g < bits.length) {
		var bit = bits[_g];
		++_g;
		var e = tannus_sys_VVEntry.deserialize(bit,vv);
		vv.entries.push(e);
	}
	return vv;
};
tannus_sys_VirtualVolume.error = function(msg) {
	throw new js__$Boot_HaxeError("IOError: " + msg);
};
tannus_sys_VirtualVolume.normal = function(name) {
	{
		var this1 = new tannus_sys__$Path_CPath(name).normalize();
		return this1.s;
	}
};
tannus_sys_VirtualVolume.prototype = {
	all: function() {
		return this.entries;
	}
	,getEntry: function(name) {
		name = tannus_sys_VirtualVolume.normal(name);
		var _g = 0;
		var _g1 = this.entries;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			if((function($this) {
				var $r;
				var this1 = new tannus_sys__$Path_CPath(f.name);
				$r = this1.s;
				return $r;
			}(this)) == name) return f;
		}
		return null;
	}
	,create: function(name,type) {
		name = tannus_sys_VirtualVolume.normal(name);
		var e = new tannus_sys_VVEntry(this,name,type);
		this.entries.push(e);
		return e;
	}
	,validatePath: function(p) {
		this.name = tannus_sys_VirtualVolume.normal(this.name);
		var _p = p;
		while(true) if(_p.get_root()) break; else {
			_p = _p.get_directory();
			if(!this.exists(_p.s)) tannus_sys_VirtualVolume.error((function($this) {
				var $r;
				var this1;
				{
					var x;
					var x1 = new tannus_sys__$Path_CPath("No such file or directory \"");
					var s;
					{
						var this2 = tannus_sys__$Path_CPath.join([x1.s,_p.s]);
						s = this2.s;
					}
					x = new tannus_sys__$Path_CPath(s);
					var y = new tannus_sys__$Path_CPath("\"!");
					var s1;
					{
						var this3 = tannus_sys__$Path_CPath.join([x.s,y.s]);
						s1 = this3.s;
					}
					this1 = new tannus_sys__$Path_CPath(s1);
				}
				$r = this1.s;
				return $r;
			}(this)));
		}
	}
	,exists: function(name) {
		name = tannus_sys_VirtualVolume.normal(name);
		var p = new tannus_sys__$Path_CPath(name);
		return this.getEntry(p.s) != null;
	}
	,isDirectory: function(name) {
		name = tannus_sys_VirtualVolume.normal(name);
		var p = new tannus_sys__$Path_CPath(name);
		var e = this.getEntry(name);
		if(e == null) return false; else if(name == "" || name == "/") return true; else {
			var _g = e.type;
			switch(_g[1]) {
			case 1:
				return true;
			default:
				return false;
			}
		}
	}
	,createDirectory: function(name) {
		name = tannus_sys_VirtualVolume.normal(name);
		this.validatePath(new tannus_sys__$Path_CPath(name));
		this.create(name,tannus_sys_VVType.VVFolder);
	}
	,deleteDirectory: function(name) {
		name = tannus_sys_VirtualVolume.normal(name);
		if(this.isDirectory(name)) {
			var e = this.getEntry(name);
			var subs = e.list();
			if(subs.length == 0) HxOverrides.remove(this.entries,e); else throw new js__$Boot_HaxeError("IOError: " + ("Directory not empty \"" + name + "\"!"));
		}
	}
	,readDirectory: function(name) {
		name = tannus_sys_VirtualVolume.normal(name);
		var p = new tannus_sys__$Path_CPath(name);
		if(name == "" || name == "/") return this.entries.filter(function(e) {
			return new tannus_sys__$Path_CPath(e.name).get_root();
		}).map(function(e1) {
			{
				var this1 = new tannus_sys__$Path_CPath(e1.name).normalize();
				return this1.s;
			}
		}); else if(this.isDirectory(name)) {
			var e2 = this.getEntry(name);
			return e2.list().map(function(e3) {
				return e3.name;
			});
		} else throw new js__$Boot_HaxeError("IOError: " + ("\"" + name + "\" is not a Directory!"));
	}
	,write: function(path,data) {
		path = tannus_sys_VirtualVolume.normal(path);
		this.validatePath(new tannus_sys__$Path_CPath(path));
		var e = this.getEntry(path);
		if(e == null) e = this.create(path,tannus_sys_VVType.VVFile);
		e.write(data);
	}
	,read: function(path) {
		path = tannus_sys_VirtualVolume.normal(path);
		var e = this.getEntry(path);
		if(e != null && e.get_isFile()) return e.read(); else throw new js__$Boot_HaxeError("IOError: " + ("\"" + path + "\" is either a Directory, or does not exist!"));
	}
	,append: function(path,data) {
		path = tannus_sys_VirtualVolume.normal(path);
		var e = this.getEntry(path);
		if(e != null && e.get_isFile()) e.append(data); else throw new js__$Boot_HaxeError("IOError: " + ("\"" + path + "\" cannot be written to!"));
	}
	,deleteFile: function(path) {
		path = tannus_sys_VirtualVolume.normal(path);
		var e = this.getEntry(path);
		if(e != null && e.get_isFile()) HxOverrides.remove(this.entries,e); else throw new js__$Boot_HaxeError("IOError: " + ("Cannot delete \"" + path + "\"!"));
	}
	,rename: function(oldp,newp) {
		oldp = tannus_sys_VirtualVolume.normal(oldp);
		newp = tannus_sys_VirtualVolume.normal(newp);
		if(this.exists(oldp)) {
			this.validatePath(new tannus_sys__$Path_CPath(newp));
			var e = this.getEntry(oldp);
			e.rename(newp);
		} else throw new js__$Boot_HaxeError("IOError: " + ("No such file or directory \"" + oldp + "\"!"));
	}
	,stat: function(path) {
		path = tannus_sys_VirtualVolume.normal(path);
		var e = this.getEntry(path);
		if(e != null) return e.get_stats(); else throw new js__$Boot_HaxeError("IOError: " + ("No such file or directory \"" + path + "\"!"));
	}
	,serialize: function() {
		var bits = [];
		var _g = 0;
		var _g1 = this.entries;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			bits.push(e.serialize());
		}
		haxe_Serializer.USE_CACHE = true;
		haxe_Serializer.USE_ENUM_INDEX = true;
		var data;
		var s = haxe_Serializer.run(bits);
		data = tannus_io_impl_JavaScriptBinary.ofString(s);
		return data;
	}
	,zip: function() {
		var entry_list = new List();
		var _g = 0;
		var _g1 = this.entries;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(e.get_isFile()) {
				var zentry = { 'fileTime' : new Date(), 'fileSize' : e.content._length, 'fileName' : (function($this) {
					var $r;
					var this1 = new tannus_sys__$Path_CPath(e.name);
					$r = this1.s;
					return $r;
				}(this)), 'dataSize' : e.content._length, 'data' : e.content.toBytes(), 'compressed' : false, 'extraFields' : null, 'crc32' : null};
				entry_list.push(zentry);
			}
		}
		var out = new haxe_io_BytesOutput();
		var writer = new haxe_zip_Writer(out);
		writer.write(entry_list);
		var zip_data;
		{
			var b = out.getBytes();
			zip_data = tannus_io_impl_JavaScriptBinary.fromBytes(b);
		}
		return new tannus_io_CBlob("zipfile","application/zip",zip_data);
	}
	,__class__: tannus_sys_VirtualVolume
};
var tannus_sys_gs_Lexer = function() {
	this.reserved = [];
	this.reset();
	this.reserve(tannus_io_impl_JavaScriptBinary.ofString("*{[,:<"));
};
$hxClasses["tannus.sys.gs.Lexer"] = tannus_sys_gs_Lexer;
tannus_sys_gs_Lexer.__name__ = ["tannus","sys","gs","Lexer"];
tannus_sys_gs_Lexer.prototype = {
	lex: function(s) {
		this.reset();
		this.buffer = tannus_io_impl_JavaScriptBinary.ofString(s);
		while(true) {
			var t = this.lexNext();
			if(t == null) break; else this.tree.push(t);
		}
		return this.tree;
	}
	,lexNext: function() {
		var c = this.buffer.get(0);
		if(this.buffer._length <= 0) return null; else if(c == 42) {
			this.advance();
			console.log("asterisk");
			if((function($this) {
				var $r;
				var this1 = $this.buffer.get(0);
				$r = this1 == 42;
				return $r;
			}(this))) {
				this.advance();
				return tannus_sys_gs_Token.DoubleStar;
			} else return tannus_sys_gs_Token.Star;
		} else if(c == 44) {
			this.advance();
			return tannus_sys_gs_Token.Comma;
		} else if(c == 123) {
			var betw = this.between((function($this) {
				var $r;
				var n = HxOverrides.cca("{",0);
				var this2;
				if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
				this2 = n;
				$r = this2;
				return $r;
			}(this)),(function($this) {
				var $r;
				var n1 = HxOverrides.cca("}",0);
				var this3;
				if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n1)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n1 + ")!");
				this3 = n1;
				$r = this3;
				return $r;
			}(this)));
			var etree = this.ilex(betw);
			var list = [];
			var ct = [];
			var _g = 0;
			while(_g < etree.length) {
				var tk = etree[_g];
				++_g;
				switch(tk[1]) {
				case 6:
					list.push(ct);
					ct = [];
					break;
				default:
					ct.push(tk);
				}
			}
			list.push(ct);
			return tannus_sys_gs_Token.Expand(list);
		} else if(c == 91) {
			var opt = this.ilex(this.between((function($this) {
				var $r;
				var n2 = HxOverrides.cca("[",0);
				var this4;
				if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n2)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n2 + ")!");
				this4 = n2;
				$r = this4;
				return $r;
			}(this)),(function($this) {
				var $r;
				var n3 = HxOverrides.cca("]",0);
				var this5;
				if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n3)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n3 + ")!");
				this5 = n3;
				$r = this5;
				return $r;
			}(this))));
			return tannus_sys_gs_Token.Optional(opt);
		} else if(c == 58) {
			this.advance();
			return tannus_sys_gs_Token.Colon;
		} else if(c == 60) {
			var param = this.ilex(this.between((function($this) {
				var $r;
				var n4 = HxOverrides.cca("<",0);
				var this6;
				if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n4)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n4 + ")!");
				this6 = n4;
				$r = this6;
				return $r;
			}(this)),(function($this) {
				var $r;
				var n5 = HxOverrides.cca(">",0);
				var this7;
				if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n5)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n5 + ")!");
				this7 = n5;
				$r = this7;
				return $r;
			}(this)),false));
			var name = "";
			var check = tannus_sys_gs_Token.Star;
			var bits = [param.shift(),param.shift(),param.shift()];
			switch(bits.length) {
			case 3:
				switch(bits[0][1]) {
				case 0:
					if(bits[1] == null) {
						if(bits[2] == null) {
							var sname = bits[0][2];
							name = StringTools.trim(sname);
						} else switch(bits[2][1]) {
						default:
							throw new js__$Boot_HaxeError("Unexpected " + Std.string(bits));
						}
					} else switch(bits[1][1]) {
					case 7:
						var tcheck = bits[2];
						var sname1 = bits[0][2];
						if(tcheck != null) {
							name = sname1;
							check = tcheck;
						} else throw new js__$Boot_HaxeError("Unexpected " + Std.string(bits));
						break;
					default:
						throw new js__$Boot_HaxeError("Unexpected " + Std.string(bits));
					}
					break;
				default:
					throw new js__$Boot_HaxeError("Unexpected " + Std.string(bits));
				}
				break;
			default:
				throw new js__$Boot_HaxeError("Unexpected " + Std.string(bits));
			}
			return tannus_sys_gs_Token.Param(name,check);
		} else {
			var txt = String.fromCharCode(c);
			this.advance();
			while(!(this.buffer._length <= 0) && !Lambda.has(this.reserved,this.buffer.get(0))) {
				c = this.advance();
				txt += String.fromCharCode(c);
			}
			return tannus_sys_gs_Token.Literal(txt);
		}
	}
	,ilex: function(s) {
		var current = this.save();
		this.reset();
		var res = this.lex(s);
		this.restore(current);
		return res;
	}
	,between: function(start,end,recursive) {
		if(recursive == null) recursive = true;
		var c = this.buffer.get(0);
		var str = "";
		if(c == start) {
			this.advance();
			var lvl = 1;
			while(!(this.buffer._length <= 0) && lvl > 0) {
				c = this.buffer.get(0);
				if(c == start && recursive) lvl++; else if(c == end) lvl--;
				if(lvl > 0) str += String.fromCharCode(c);
				this.advance();
			}
		} else throw new js__$Boot_HaxeError("Structure not present!");
		return str;
	}
	,reset: function() {
		var this1;
		this1 = tannus_io_impl_JavaScriptBinary.alloc(0);
		this.buffer = this1;
		this.tree = [];
	}
	,next: function(d) {
		if(d == null) d = 1;
		return this.buffer.get(d - 1);
	}
	,advance: function() {
		return this.buffer.shift();
	}
	,reserve: function(set) {
		this.reserved = this.reserved.concat(set.toArray());
	}
	,save: function() {
		return { 'buffer' : this.buffer, 'tree' : this.tree};
	}
	,restore: function(s) {
		this.buffer = s.buffer;
		this.tree = s.tree;
	}
	,get_eoi: function() {
		return this.buffer._length <= 0;
	}
	,__class__: tannus_sys_gs_Lexer
	,__properties__: {get_eoi:"get_eoi"}
};
var tannus_sys_gs_Printer = function() {
	this.groupCount = 0;
	this.params = new haxe_ds_StringMap();
};
$hxClasses["tannus.sys.gs.Printer"] = tannus_sys_gs_Printer;
tannus_sys_gs_Printer.__name__ = ["tannus","sys","gs","Printer"];
tannus_sys_gs_Printer.compile = function(s) {
	var p = new tannus_sys_gs_Printer();
	var t = new tannus_sys_gs_Lexer().lex(s);
	return { 'regex' : p.pattern(t), 'params' : p.params};
};
tannus_sys_gs_Printer.prototype = {
	pattern: function(tree) {
		return new EReg(this.print(tree),"");
	}
	,print: function(tree) {
		var s = "";
		var _g = 0;
		while(_g < tree.length) {
			var t = tree[_g];
			++_g;
			s += this.printToken(t);
		}
		return s;
	}
	,printToken: function(t,parent) {
		switch(t[1]) {
		case 0:
			var txt = t[2];
			return this.escape(txt);
		case 4:
			this.groupCount++;
			return "([^/]+)";
		case 5:
			this.groupCount++;
			return "(.+)";
		case 3:
			var check = t[3];
			var name = t[2];
			var v = this.groupCount;
			this.params.set(name,v);
			v;
			return this.printToken(check,t);
		case 2:
			var tree = t[2];
			this.groupCount++;
			var sprint = (function(f,a1) {
				return function(t1) {
					return f(t1,a1);
				};
			})($bind(this,this.printToken),t);
			return tannus_ds_StringUtils.wrap(tree.map(sprint).join(""),"(",")") + "?";
		case 1:
			var choices = t[2];
			this.groupCount++;
			var sprint1 = (function(f1,a11) {
				return function(t2) {
					return f1(t2,a11);
				};
			})($bind(this,this.printToken),t);
			var schoices;
			var _g = [];
			var _g1 = 0;
			while(_g1 < choices.length) {
				var c = choices[_g1];
				++_g1;
				_g.push(c.map(sprint1).join(""));
			}
			schoices = _g;
			var canBeEmpty = HxOverrides.remove(schoices,"");
			var res = tannus_ds_StringUtils.wrap(schoices.join("|"),"(",")");
			if(canBeEmpty) res += "?";
			return res;
		default:
			console.log(Std.string(t) + "");
			throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(t));
			return "";
		}
	}
	,escape: function(txt) {
		var esc = [".","^","$","+","(",")","?"];
		var _g = 0;
		while(_g < esc.length) {
			var c = esc[_g];
			++_g;
			txt = StringTools.replace(txt,c,"\\" + c);
		}
		return txt;
	}
	,__class__: tannus_sys_gs_Printer
};
var tannus_sys_gs_Token = $hxClasses["tannus.sys.gs.Token"] = { __ename__ : ["tannus","sys","gs","Token"], __constructs__ : ["Literal","Expand","Optional","Param","Star","DoubleStar","Comma","Colon"] };
tannus_sys_gs_Token.Literal = function(txt) { var $x = ["Literal",0,txt]; $x.__enum__ = tannus_sys_gs_Token; $x.toString = $estr; return $x; };
tannus_sys_gs_Token.Expand = function(pieces) { var $x = ["Expand",1,pieces]; $x.__enum__ = tannus_sys_gs_Token; $x.toString = $estr; return $x; };
tannus_sys_gs_Token.Optional = function(sub) { var $x = ["Optional",2,sub]; $x.__enum__ = tannus_sys_gs_Token; $x.toString = $estr; return $x; };
tannus_sys_gs_Token.Param = function(name,check) { var $x = ["Param",3,name,check]; $x.__enum__ = tannus_sys_gs_Token; $x.toString = $estr; return $x; };
tannus_sys_gs_Token.Star = ["Star",4];
tannus_sys_gs_Token.Star.toString = $estr;
tannus_sys_gs_Token.Star.__enum__ = tannus_sys_gs_Token;
tannus_sys_gs_Token.DoubleStar = ["DoubleStar",5];
tannus_sys_gs_Token.DoubleStar.toString = $estr;
tannus_sys_gs_Token.DoubleStar.__enum__ = tannus_sys_gs_Token;
tannus_sys_gs_Token.Comma = ["Comma",6];
tannus_sys_gs_Token.Comma.toString = $estr;
tannus_sys_gs_Token.Comma.__enum__ = tannus_sys_gs_Token;
tannus_sys_gs_Token.Colon = ["Colon",7];
tannus_sys_gs_Token.Colon.toString = $estr;
tannus_sys_gs_Token.Colon.__enum__ = tannus_sys_gs_Token;
var tannus_sys_internal__$FileContent_FileContent_$Impl_$ = {};
$hxClasses["tannus.sys.internal._FileContent.FileContent_Impl_"] = tannus_sys_internal__$FileContent_FileContent_$Impl_$;
tannus_sys_internal__$FileContent_FileContent_$Impl_$.__name__ = ["tannus","sys","internal","_FileContent","FileContent_Impl_"];
tannus_sys_internal__$FileContent_FileContent_$Impl_$.__properties__ = {get_f:"get_f"}
tannus_sys_internal__$FileContent_FileContent_$Impl_$._new = function(f) {
	return f;
};
tannus_sys_internal__$FileContent_FileContent_$Impl_$.get_f = function(this1) {
	return this1.get();
};
tannus_sys_internal__$FileContent_FileContent_$Impl_$.append = function(this1,data) {
	this1.get().append(data);
};
tannus_sys_internal__$FileContent_FileContent_$Impl_$.toByteArray = function(this1) {
	return this1.get().read();
};
tannus_sys_internal__$FileContent_FileContent_$Impl_$.toString = function(this1) {
	{
		var this2 = this1.get().read();
		return this2.toString();
	}
};
var war_Game = function(s) {
	var _g = this;
	gryffin_ui_Page.call(this);
	war_Game.instance = this;
	this.stage = s;
	this.state = new war_ds_State();
	this.state.init();
	this.world = new war_world_World(this,40);
	this.player = new war_player_Avatar(this);
	this.hud = new war_ui_HUD(s,this);
	this.hud.addItem(new war_ui_PlayerHealthBar(s,this.player));
	this.hud.addItem(new war_ui_PlayerLevelBar(s,this.player));
	this.hud.addItem(new war_ui_WaveDisplay(s,this.world));
	this.hud.addItem(new war_ui_EquippedDisplay(this.player));
	this.fps = new war_utils_FPS();
	this.addChild(this.world);
	this.addChild(this.player);
	this.addChild(this.fps);
	this.addChild(this.hud);
	this.world.wave.stop();
	var w = window;
	var self = tannus_ds_CObj.create(w);
	var val = this.world;
	self.set("world",val);
	var self1 = tannus_ds_CObj.create(w);
	var val1 = this.player;
	self1.set("player",val1);
	this.state._ready.once(function() {
		_g.load(function() {
			console.log("game loaded");
		});
	});
};
$hxClasses["war.Game"] = war_Game;
war_Game.__name__ = ["war","Game"];
war_Game.__super__ = gryffin_ui_Page;
war_Game.prototype = $extend(gryffin_ui_Page.prototype,{
	save: function(cb) {
		var _g = this;
		var stack = new tannus_ds_AsyncStack();
		stack.under(function(done) {
			_g.state.getPlayerFile(function(f) {
				var s = new haxe_Serializer();
				s.useCache = true;
				s.useEnumIndex = true;
				s.serialize(_g.player.state());
				var data = s.toString();
				((function($this) {
					var $r;
					var this1 = f;
					$r = new tannus_html_fs_FilePromise(function(give) {
						give(this1);
					});
					return $r;
				}(this))).write(tannus_io_impl_JavaScriptBinary.ofString(data)).then(function(x) {
					done();
				});
			});
		});
		stack.under(function(done1) {
			_g.state.getWorldFile(function(f1) {
				var s1 = new haxe_Serializer();
				s1.useCache = true;
				s1.useEnumIndex = true;
				s1.serialize(_g.world.state());
				var data1 = s1.toString();
				((function($this) {
					var $r;
					var this2 = f1;
					$r = new tannus_html_fs_FilePromise(function(give1) {
						give1(this2);
					});
					return $r;
				}(this))).write(tannus_io_impl_JavaScriptBinary.ofString(data1)).then(function(x1) {
					done1();
				});
			});
		});
		stack.run(function() {
			if(cb != null) cb();
		});
	}
	,load: function(cb) {
		var _g = this;
		var stack = new tannus_ds_AsyncStack();
		stack.under(function(done) {
			_g.state.getPlayerFile(function(f) {
				tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$.read(f).then(function(data) {
					if(data._length == 0) done(); else {
						var playerState = haxe_Unserializer.run(data.toString());
						_g.player.patch(playerState);
						done();
					}
				});
			});
		});
		stack.under(function(done1) {
			_g.state.getWorldFile(function(f1) {
				tannus_html_fs__$WebFileEntry_WebFileEntry_$Impl_$.read(f1).then(function(data1) {
					if(data1._length > 0) {
						var worldState = haxe_Unserializer.run(data1.toString());
						_g.world.patch(worldState);
					}
					done1();
				});
			});
		});
		stack.run(function() {
			cb();
		});
	}
	,__class__: war_Game
});
var war_ai_Bumble = function() {
	gryffin_fx_TimedEffect.call(this);
	this.interval = 250;
};
$hxClasses["war.ai.Bumble"] = war_ai_Bumble;
war_ai_Bumble.__name__ = ["war","ai","Bumble"];
war_ai_Bumble.__super__ = gryffin_fx_TimedEffect;
war_ai_Bumble.prototype = $extend(gryffin_fx_TimedEffect.prototype,{
	affect: function(e) {
		var pl = this.player(e);
		var pos = e.get_pos();
		this.vel = e.velocity;
		this.vel.speed = e.speed;
		if(pl != null) {
			if(e.get_center().distanceFrom(pl.get_center()) > e.reach) {
				this.vel.angle = e.get_center().angleTo(pl.get_center());
				var p = this.vel.get_vector();
				pos.moveByPoint(p);
			} else e.attack(pl);
		}
		gryffin_fx_TimedEffect.prototype.affect.call(this,e);
	}
	,player: function(e) {
		if(e.stage != null) {
			var avatar = e.stage.get("war.player.Avatar").at(0);
			return avatar;
		} else return null;
	}
	,__class__: war_ai_Bumble
});
var war_core_Ent = function() {
	gryffin_core_Entity.call(this);
	this.rect = new tannus_geom_CRectangle(0,0,0,0);
};
$hxClasses["war.core.Ent"] = war_core_Ent;
war_core_Ent.__name__ = ["war","core","Ent"];
war_core_Ent.__super__ = gryffin_core_Entity;
war_core_Ent.prototype = $extend(gryffin_core_Entity.prototype,{
	containsPoint: function(p) {
		var r;
		var _x = this.get_x();
		var _y = this.get_y();
		var _width = this.get_w();
		var _height = this.get_h();
		r = new tannus_geom_CRectangle(_x,_y,_width,_height);
		return r.contains(p.get_x(),p.get_y());
	}
	,collidesWith: function(r) {
		var _g = 0;
		var _g1 = r.get_corners();
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(this.containsPoint(p)) return true;
		}
		return false;
	}
	,get_x: function() {
		return this.rect.x;
	}
	,set_x: function(v) {
		return this.rect.x = v;
	}
	,get_y: function() {
		return this.rect.y;
	}
	,set_y: function(v) {
		return this.rect.y = v;
	}
	,get_w: function() {
		return this.rect.width;
	}
	,set_w: function(v) {
		return this.rect.width = v;
	}
	,get_h: function() {
		return this.rect.height;
	}
	,set_h: function(v) {
		return this.rect.height = v;
	}
	,get_pos: function() {
		var _g = this;
		var x = new tannus_io__$Pointer_Ref(function() {
			return _g.get_x();
		},function(v) {
			return _g.set_x(v);
		});
		var y = new tannus_io__$Pointer_Ref(function() {
			return _g.get_y();
		},function(v1) {
			return _g.set_y(v1);
		});
		return new tannus_geom_LinkedPoint(x,y,null);
	}
	,set_pos: function(v) {
		this.set_x(v.get_x());
		this.set_y(v.get_y());
		return this.get_pos();
	}
	,get_center: function() {
		return this.rect.get_center();
	}
	,set_center: function(v) {
		return this.rect.set_center(v);
	}
	,get_centerX: function() {
		return this.get_x() + this.get_w() / 2;
	}
	,set_centerX: function(v) {
		return this.set_x(v - this.get_w() / 2);
	}
	,get_centerY: function() {
		return this.get_y() + this.get_h() / 2;
	}
	,set_centerY: function(v) {
		return this.set_y(v - this.get_h() / 2);
	}
	,__class__: war_core_Ent
	,__properties__: $extend(gryffin_core_Entity.prototype.__properties__,{set_centerY:"set_centerY",get_centerY:"get_centerY",set_centerX:"set_centerX",get_centerX:"get_centerX",set_center:"set_center",get_center:"get_center",set_pos:"set_pos",get_pos:"get_pos",set_h:"set_h",get_h:"get_h",set_w:"set_w",get_w:"get_w",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"})
});
var war_ds_Purchase = function() {
	this.name = "purchase";
	this.description = "the base purchase";
};
$hxClasses["war.ds.Purchase"] = war_ds_Purchase;
war_ds_Purchase.__name__ = ["war","ds","Purchase"];
war_ds_Purchase.prototype = {
	canAfford: function(p) {
		return true;
	}
	,make: function(p) {
		null;
	}
	,__class__: war_ds_Purchase
};
var war_ds_PurchaseTools = function() { };
$hxClasses["war.ds.PurchaseTools"] = war_ds_PurchaseTools;
war_ds_PurchaseTools.__name__ = ["war","ds","PurchaseTools"];
war_ds_PurchaseTools.addPurchase = function(menu,buy,player) {
	menu.item({ 'label' : buy.name, 'click' : function() {
		if(buy.canAfford(player)) buy.make(player);
	}});
};
var war_ds_State = function() {
	tannus_mvc_Model.call(this);
	this.set_storage(new tannus_storage_chrome_ChromeStorage(chrome.storage.sync));
};
$hxClasses["war.ds.State"] = war_ds_State;
war_ds_State.__name__ = ["war","ds","State"];
war_ds_State.__super__ = tannus_mvc_Model;
war_ds_State.prototype = $extend(tannus_mvc_Model.prototype,{
	getFolder: function(cb) {
		var _g = this;
		if(this.get_folder() == null) tannus_chrome_FileSystem.chooseDirectory().then(function(d) {
			_g.set_folder(chrome.fileSystem.retainEntry(d));
			cb(d);
			_g.save();
		}); else tannus_chrome_FileSystem.restoreEntry(this.get_folder(),cb);
	}
	,getPlayerFile: function(cb) {
		this.getFolder(function(dir) {
			new tannus_ds_Promise((function(f,a1,a2) {
				return function(a3,a4) {
					f(a1,a2,a3,a4);
				};
			})(($_=dir,$bind($_,$_.getFile)),"player.dat",{ 'create' : true})).then(cb);
		});
	}
	,getWorldFile: function(cb) {
		this.getFolder(function(dir) {
			new tannus_ds_Promise((function(f,a1,a2) {
				return function(a3,a4) {
					f(a1,a2,a3,a4);
				};
			})(($_=dir,$bind($_,$_.getFile)),"world.dat",{ 'create' : true})).then(cb);
		});
	}
	,get_folder: function() {
		return this.getAttribute("folder");
	}
	,set_folder: function(v) {
		return this.setAttribute("folder",v);
	}
	,__class__: war_ds_State
	,__properties__: $extend(tannus_mvc_Model.prototype.__properties__,{set_folder:"set_folder",get_folder:"get_folder"})
});
var war_items_Drop = function(i) {
	war_core_Ent.call(this);
	this.rotation = new tannus_geom_CAngle(0);
	this.item = i;
	this.lifetime = 60000;
	this.dateCreated = new Date().getTime();
	this.tip = new gryffin_ui_Tooltip();
	this.tip.target = this.rect;
	this.tip.direction = 0;
	this.tip.box.set_fontSize(8);
	this.addSibling(this.tip);
	this.tip.hide();
	this.set_w(this.set_h(25));
	this.image = this.item.draw(Math.ceil(this.get_w()),Math.ceil(this.get_h()));
};
$hxClasses["war.items.Drop"] = war_items_Drop;
war_items_Drop.__name__ = ["war","items","Drop"];
war_items_Drop.__super__ = war_core_Ent;
war_items_Drop.prototype = $extend(war_core_Ent.prototype,{
	render: function(s,c) {
		c.save();
		c.drawComponent(this.image,0,0,this.image.canvas.width,this.image.canvas.height,this.get_x(),this.get_y(),this.get_w(),this.get_h());
		c.restore();
	}
	,update: function(s) {
		war_core_Ent.prototype.update.call(this,s);
		this.tip.set_text(this.item.tooltip());
		if(new Date().getTime() - this.dateCreated >= this.lifetime) {
			this["delete"]();
			return;
		}
		if(this.world == null) {
			var w = s.get("war.world.World").at(0);
			if(w != null) this.world = w;
		} else this.set_w(this.set_h(this.world.get_tileWidth()));
	}
	,pickup: function(o) {
		if(this.item.useType == 1 && this.item.usable()) {
			var udata = new war_items_UseData();
			udata.target = udata.origin = o.get_pos();
			udata.user = o;
			this.item["use"](udata);
			this["delete"]();
			this.tip["delete"]();
		} else {
			var added = o.inventory.addItem(this.item);
			if(added) {
				this["delete"]();
				this.tip["delete"]();
			}
		}
	}
	,get_age: function() {
		return new Date().getTime() - this.dateCreated;
	}
	,__class__: war_items_Drop
	,__properties__: $extend(war_core_Ent.prototype.__properties__,{get_age:"get_age"})
});
var war_items_Item = function() {
	this.type = "base";
	this.name = "item";
	this.description = "item";
	this.equippable = false;
	this.useType = 0;
	this.stackable = 0;
	this.count = 0;
	this.storage = null;
};
$hxClasses["war.items.Item"] = war_items_Item;
war_items_Item.__name__ = ["war","items","Item"];
war_items_Item.prototype = {
	usable: function() {
		return true;
	}
	,tooltip: function() {
		return this.name;
	}
	,hudText: function() {
		return this.name;
	}
	,'use': function(data) {
		console.log(data);
	}
	,canPickup: function(o) {
		return !(o.health <= 0);
	}
	,draw: function(w,h) {
		var can = gryffin_display_Canvas.create(w,h);
		var c = can._ctx.get();
		var tb = new gryffin_display_TextBox();
		tb.set_fontFamily("Ubuntu");
		tb.set_bold(true);
		tb.set_text(this.name);
		tb.autoScale(w,h);
		c.drawComponent(tb,0,0,tb.get_width(),tb.get_height(),0,0,tb.get_width(),tb.get_height());
		return can;
	}
	,base_value: function() {
		return 0;
	}
	,data: function() {
		var self = this;
		return tannus_ds__$Object_Object_$Impl_$._plk(self,["type","name","description","equippable","useType","stackable","count"]);
	}
	,apply: function(data) {
		var self = this;
		tannus_ds__$Object_Object_$Impl_$.write(self,data);
	}
	,hxSerialize: function(s) {
		s.serialize(this.data());
	}
	,hxUnserialize: function(u) {
		this.apply(u.unserialize());
	}
	,get_canStack: function() {
		return this.stackable > 0;
	}
	,__class__: war_items_Item
	,__properties__: {get_canStack:"get_canStack"}
};
var war_items_HealthItem = function(points) {
	war_items_Item.call(this);
	this.name = "Health";
	this.type = "booster/health";
	this.count = points;
	this.description = "" + this.count + "hp";
	this.useType = 1;
	this.icon = gryffin_display_Image.load("../assets/images/health.png");
};
$hxClasses["war.items.HealthItem"] = war_items_HealthItem;
war_items_HealthItem.__name__ = ["war","items","HealthItem"];
war_items_HealthItem.__super__ = war_items_Item;
war_items_HealthItem.prototype = $extend(war_items_Item.prototype,{
	canPickup: function(o) {
		return js_Boot.__instanceof(o,war_player_Avatar) && o.health < o.max_health;
	}
	,'use': function(data) {
		data.user.hurt(-this.count);
	}
	,draw: function(w,h) {
		var c = gryffin_display_Canvas.create(w,h);
		c._ctx.get().drawComponent(this.icon,0,0,this.icon.img.naturalWidth,this.icon.img.naturalHeight,0,0,w,h);
		return c;
	}
	,__class__: war_items_HealthItem
});
var war_items_ItemStorage = function(numberOfSlots) {
	this.slots = [];
	this.size = numberOfSlots;
	this.__makeSlots();
};
$hxClasses["war.items.ItemStorage"] = war_items_ItemStorage;
war_items_ItemStorage.__name__ = ["war","items","ItemStorage"];
war_items_ItemStorage.prototype = {
	addItem: function(item) {
		var firstFreeSlot = null;
		var _g = 0;
		var _g1 = this.slots;
		while(_g < _g1.length) {
			var slot = _g1[_g];
			++_g;
			if(slot.get_item() == null && firstFreeSlot == null) firstFreeSlot = slot; else if(!(slot.get_item() == null) && item.stackable > 0 && item.count > 0 && slot.get_item().count < item.stackable && slot.get_item().type == item.type) {
				slot.get_item().count += item.count;
				if(slot.get_item().count > slot.get_item().stackable) {
					var rem = slot.get_item().count - slot.get_item().stackable;
					slot.get_item().count = slot.get_item().stackable;
					item.count = rem;
				} else item.count = 0;
				if(item.count == 0) return true;
			}
		}
		if(firstFreeSlot != null) {
			firstFreeSlot.set_item(item);
			return true;
		}
		return false;
	}
	,indexOf: function(slot) {
		return HxOverrides.indexOf(this.slots,slot,0);
	}
	,itemSlot: function(item) {
		var _g = 0;
		var _g1 = this.slots;
		while(_g < _g1.length) {
			var slot = _g1[_g];
			++_g;
			if(!(slot.get_item() == null) && slot.get_item() == item) return slot;
		}
		return null;
	}
	,slotByType: function(type) {
		var _g = 0;
		var _g1 = this.slots;
		while(_g < _g1.length) {
			var slot = _g1[_g];
			++_g;
			if(!(slot.get_item() == null) && slot.get_item().type == type) return slot;
		}
		return null;
	}
	,drop: function(index) {
		var slot = this.slots[index];
		if(slot == null) throw new Error("Cannot be dropped! There is no Slot at position " + index); else if(slot.get_item() == null) throw new Error("Cannot be dropped! Slot is empty"); else return slot.drop();
	}
	,iterator: function() {
		return HxOverrides.iter(this.slots);
	}
	,__makeSlots: function() {
		var _g1 = 0;
		var _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			var slot = this.freshSlot();
			this.slots.push(slot);
		}
	}
	,freshSlot: function() {
		return new war_items_Slot(this);
	}
	,__class__: war_items_ItemStorage
};
var war_items_Inventory = function(size,org) {
	war_items_ItemStorage.call(this,size);
	this.owner = org;
	this.equippedIndex = 0;
};
$hxClasses["war.items.Inventory"] = war_items_Inventory;
war_items_Inventory.__name__ = ["war","items","Inventory"];
war_items_Inventory.__super__ = war_items_ItemStorage;
war_items_Inventory.prototype = $extend(war_items_ItemStorage.prototype,{
	'use': function(data) {
		data.user = this.owner;
		data.origin = this.owner.get_center();
		if(this.slots[this.equippedIndex].usable()) this.slots[this.equippedIndex]["use"](data);
	}
	,equip: function(id) {
		this.equippedIndex = id;
	}
	,freshSlot: function() {
		return new war_items_InventorySlot(this);
	}
	,hxSerialize: function(s) {
		var w = (function(f) {
			return function(v) {
				f(v);
			};
		})($bind(s,s.serialize));
		w(this.size);
		w(this.equippedIndex);
		var _g = 0;
		var _g1 = this.slots;
		while(_g < _g1.length) {
			var slot = _g1[_g];
			++_g;
			w(slot.get_item());
		}
	}
	,hxUnserialize: function(u) {
		var n;
		var f1 = (function(f) {
			return function() {
				return f();
			};
		})($bind(u,u.unserialize));
		n = f1;
		this.size = n();
		this.equippedIndex = n();
		this.slots = [];
		var _g1 = 0;
		var _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			var slot = this.freshSlot();
			this.slots.push(slot);
			slot.set_item(n());
		}
	}
	,get_equipped: function() {
		return this.slots[this.equippedIndex];
	}
	,get_equippedItem: function() {
		return this.slots[this.equippedIndex].get_item();
	}
	,__class__: war_items_Inventory
	,__properties__: {get_equippedItem:"get_equippedItem",get_equipped:"get_equipped"}
});
var war_items_Slot = function(owner,itm) {
	this.storage = owner;
	this.set_item(itm);
};
$hxClasses["war.items.Slot"] = war_items_Slot;
war_items_Slot.__name__ = ["war","items","Slot"];
war_items_Slot.prototype = {
	usable: function() {
		return !(this.get_item() == null) && this.get_item().usable();
	}
	,'use': function(data) {
		this.get_item()["use"](data);
	}
	,drop: function() {
		return new war_items_Drop(this.get_item());
	}
	,get_item: function() {
		return this._item;
	}
	,set_item: function(v) {
		if(this._item != null) this._item.storage = null;
		this._item = v;
		if(this._item != null) this._item.storage = this.storage;
		return this._item;
	}
	,get_free: function() {
		return this.get_item() == null;
	}
	,get_index: function() {
		return HxOverrides.indexOf(this.storage.slots,this,0);
	}
	,__class__: war_items_Slot
	,__properties__: {get_index:"get_index",get_free:"get_free",set_item:"set_item",get_item:"get_item"}
};
var war_items_InventorySlot = function(inv,item) {
	war_items_Slot.call(this,inv,item);
	this.inventory = inv;
};
$hxClasses["war.items.InventorySlot"] = war_items_InventorySlot;
war_items_InventorySlot.__name__ = ["war","items","InventorySlot"];
war_items_InventorySlot.__super__ = war_items_Slot;
war_items_InventorySlot.prototype = $extend(war_items_Slot.prototype,{
	__class__: war_items_InventorySlot
});
var war_items_MoneyItem = function(amount) {
	war_items_Item.call(this);
	this.name = "Money";
	this.type = "misc/cash";
	this.count = amount;
	this.description = "$" + this.count;
	this.useType = 1;
	this.icon = gryffin_display_Image.load("../assets/images/cash.png");
};
$hxClasses["war.items.MoneyItem"] = war_items_MoneyItem;
war_items_MoneyItem.__name__ = ["war","items","MoneyItem"];
war_items_MoneyItem.__super__ = war_items_Item;
war_items_MoneyItem.prototype = $extend(war_items_Item.prototype,{
	canPickup: function(o) {
		return js_Boot.__instanceof(o,war_player_Avatar);
	}
	,'use': function(data) {
		(js_Boot.__cast(data.user , war_player_Avatar)).money += this.count;
	}
	,tooltip: function() {
		return "$" + this.count;
	}
	,draw: function(w,h) {
		var c = gryffin_display_Canvas.create(w,h);
		c._ctx.get().drawComponent(this.icon,0,0,this.icon.img.naturalWidth,this.icon.img.naturalHeight,0,0,w,h);
		return c;
	}
	,__class__: war_items_MoneyItem
});
var war_items_UseData = function() {
	this.target = new tannus_geom_TPoint(0,0,0);
	this.origin = this.target;
	this.altKey = false;
	this.ctrlKey = false;
	this.shiftKey = false;
};
$hxClasses["war.items.UseData"] = war_items_UseData;
war_items_UseData.__name__ = ["war","items","UseData"];
war_items_UseData.fromMouseEvent = function(e) {
	var u = new war_items_UseData();
	u.target = e.position;
	u.altKey = Lambda.has(e.emods,"alt");
	u.ctrlKey = Lambda.has(e.emods,"ctrl");
	u.shiftKey = Lambda.has(e.emods,"shift");
	return u;
};
war_items_UseData.prototype = {
	__class__: war_items_UseData
};
var war_npc_Organism = function() {
	war_core_Ent.call(this);
	this.game = war_Game.instance;
	this.level = 1;
	this.max_health = 100;
	this.set_health(100);
	this.ondie = new tannus_io_VoidSignal();
};
$hxClasses["war.npc.Organism"] = war_npc_Organism;
war_npc_Organism.__name__ = ["war","npc","Organism"];
war_npc_Organism.__super__ = war_core_Ent;
war_npc_Organism.prototype = $extend(war_core_Ent.prototype,{
	update: function(s) {
		war_core_Ent.prototype.update.call(this,s);
		this.collisions();
		if(this.health <= 0) this.die();
	}
	,collisions: function() {
		if(this.get_x() < this.game.world.get_x()) this.set_x(this.game.world.get_x()); else if(this.get_x() + this.get_w() > this.game.world.get_x() + this.game.world.get_w()) this.set_x(this.game.world.get_x() + this.game.world.get_w() - this.get_w());
		if(this.get_y() < this.game.world.get_y() && !this["is"]("war.npc.Zombie")) this.set_y(this.game.world.get_y()); else if(this.get_y() + this.get_h() > this.game.world.get_y() + this.game.world.get_h()) this.set_y(this.game.world.get_y() + this.game.world.get_h() - this.get_h());
	}
	,die: function() {
		this["delete"]();
		this.ondie.call();
		this.dispatch("death",null);
	}
	,hurt: function(amount) {
		var _g = this;
		_g.set_health(_g.health - amount);
	}
	,state: function() {
		return new war_npc_OrganismData(this);
	}
	,patch: function(data) {
		data.apply(this);
	}
	,get_dead: function() {
		return this.health <= 0;
	}
	,get_world: function() {
		return this.game.world;
	}
	,set_health: function(v) {
		return this.health = tannus_math_TMath.min(v,this.max_health);
	}
	,__class__: war_npc_Organism
	,__properties__: $extend(war_core_Ent.prototype.__properties__,{set_health:"set_health",get_world:"get_world",get_dead:"get_dead"})
});
var war_npc_OrganismData = function(o) {
	this.rect = o.rect.clone();
	this.health = o.health;
	this.max_health = o.max_health;
	this.level = o.level;
};
$hxClasses["war.npc.OrganismData"] = war_npc_OrganismData;
war_npc_OrganismData.__name__ = ["war","npc","OrganismData"];
war_npc_OrganismData.prototype = {
	hxSerialize: function(s) {
		var w = (function(f) {
			return function(v) {
				f(v);
			};
		})($bind(s,s.serialize));
		w(this.level);
		w(this.health);
		w(this.max_health);
		w(this.rect);
	}
	,hxUnserialize: function(u) {
		var r;
		var f1 = (function(f) {
			return function() {
				return f();
			};
		})($bind(u,u.unserialize));
		r = f1;
		this.level = r();
		this.health = r();
		this.max_health = r();
		this.rect = r();
	}
	,apply: function(o) {
		o.rect = this.rect.clone();
		o.max_health = this.max_health;
		o.set_health(this.health);
		o.level = this.level;
	}
	,__class__: war_npc_OrganismData
};
var war_npc_Wave = function(w,lvl) {
	gryffin_core_Entity.call(this);
	this.level = lvl;
	this.delay = 10000;
	this.count = Math.round(10 + 2.5 * this.level);
	this.zombies = [];
	this.world = w;
	this.disabled = false;
	this.onstop = new tannus_io_VoidSignal();
};
$hxClasses["war.npc.Wave"] = war_npc_Wave;
war_npc_Wave.__name__ = ["war","npc","Wave"];
war_npc_Wave.__super__ = gryffin_core_Entity;
war_npc_Wave.prototype = $extend(gryffin_core_Entity.prototype,{
	init: function(stage) {
		gryffin_core_Entity.prototype.init.call(this,stage);
		window.setTimeout($bind(this,this.activate),this.delay);
	}
	,activate: function() {
		this.generate();
		var _g = 0;
		var _g1 = this.zombies;
		while(_g < _g1.length) {
			var z = _g1[_g];
			++_g;
			this.addSibling(z);
		}
	}
	,generate: function() {
		var _g1 = 0;
		var _g = this.count;
		while(_g1 < _g) {
			var i = _g1++;
			var zombie = new war_npc_Zombie(this);
			this.zombies.push(zombie);
			this.stats(zombie);
			this.watch(zombie);
		}
	}
	,disable: function() {
		this.disabled = true;
	}
	,stop: function() {
		this.onstop.call();
	}
	,stats: function(z) {
		var r = new tannus_math_Random();
		z.level = r.randint(1,this.level);
		z.stats(r);
	}
	,watch: function(z) {
		var _g = this;
		z.on("death",function(e) {
			HxOverrides.remove(_g.zombies,z);
			_g.checkFinished();
		});
		this.onstop.once(function() {
			if(!(z.health <= 0)) {
				z.inventory = new war_items_Inventory(1,z);
				z.hurt(z.health);
			}
		});
	}
	,checkFinished: function() {
		if(Lambda.empty(this.zombies) && !this.disabled) {
			var nextWave = new war_npc_Wave(this.world,++this.level);
			this.world.wave = nextWave;
			this.addSibling(nextWave);
			this["delete"]();
			this.world.game.save();
		}
	}
	,__class__: war_npc_Wave
});
var war_npc_Zombie = function(w) {
	var _g = this;
	war_npc_Organism.call(this);
	this.speed = 1;
	var angle = new tannus_geom_CAngle(0);
	this.velocity = new tannus_geom_CVelocity(0,angle);
	this.reach = 25;
	this.healthbar = new war_ui_ZombieHealthBar(this);
	this.damage_value = new tannus_ds__$Value_CVal(function() {
		return 2;
	});
	this.damage_value.modify(function(v) {
		return v + Math.floor((_g.level < 4?_g.level:_g.level / 2) * v);
	});
	this.wave = w;
	this.player = w.world.game.player;
	this.addEffect(new war_ai_Bumble());
	this.__generateInventory();
};
$hxClasses["war.npc.Zombie"] = war_npc_Zombie;
war_npc_Zombie.__name__ = ["war","npc","Zombie"];
war_npc_Zombie.__super__ = war_npc_Organism;
war_npc_Zombie.prototype = $extend(war_npc_Organism.prototype,{
	stats: function(r) {
		this.set_pos((function($this) {
			var $r;
			var x = r.randint(Math.round($this.game.world.get_x()),Math.round($this.game.world.get_w()));
			var y = r.randint(-35,-60);
			$r = new tannus_geom_TPoint(x,y,0);
			return $r;
		}(this)));
		this.speed = r.randint(2,3);
		this.max_health = 100 + 20 * this.level;
		this.set_health(this.max_health);
	}
	,update: function(s) {
		this.set_w(this.set_h(this.game.world.get_tileWidth() + this.game.world.get_tileWidth() * 0.3));
		if(this.player == null) this.player = s.get("war.player.Avatar").at(0);
		war_npc_Organism.prototype.update.call(this,s);
	}
	,render: function(s,c) {
		c.save();
		c.beginPath();
		c.set_fillStyle("grey");
		c.rect(this.get_x(),this.get_y(),this.get_w(),this.get_h());
		c.closePath();
		c.fill();
		c.restore();
	}
	,collisions: function() {
		war_npc_Organism.prototype.collisions.call(this);
		var zombies = this.wave.zombies;
		var _g = 0;
		while(_g < zombies.length) {
			var zombie = zombies[_g];
			++_g;
			if(zombie != this && this.rect.containsRect(zombie.rect)) {
				var cd_0 = zombie.rect.get_centerX() < this.rect.get_centerX();
				var cd_1 = zombie.rect.get_centerY() < this.rect.get_centerY();
				if(cd_0) zombie.set_x(this.get_x() - zombie.get_w()); else zombie.set_x(this.get_x() + this.get_w());
				if(cd_1) zombie.set_y(this.get_y() - zombie.get_h()); else zombie.set_y(this.get_y() + this.get_h());
			}
		}
	}
	,collisionData: function(o) {
		return [o.rect.get_centerX() < this.rect.get_centerX(),o.rect.get_centerY() < this.rect.get_centerY()];
	}
	,drawDebugData: function(c) {
		var m = this.get_center();
		c.save();
		c.beginPath();
		c.set_globalAlpha(0.7);
		c.set_fillStyle("#F00");
		c.arc(m.get_x(),m.get_y(),this.reach,0,2 * Math.PI,false);
		c.closePath();
		c.fill();
		c.restore();
	}
	,attack: function(player) {
		player.hurt(this.damage_value.get());
	}
	,die: function() {
		this.player.skill.grant_xp(Math.ceil(10 + 3.6 * this.level));
		var $it0 = this.inventory.iterator();
		while( $it0.hasNext() ) {
			var slot = $it0.next();
			if(!(slot.get_item() == null)) {
				var drop = slot.drop();
				drop.set_x(this.get_x() + tannus_math_RandomTools.randint([Std["int"](-this.get_w()),Std["int"](this.get_w())]));
				drop.set_y(this.get_y() + tannus_math_RandomTools.randint([Std["int"](-this.get_h()),Std["int"](this.get_h())]));
				this.addSibling(drop);
			}
		}
		war_npc_Organism.prototype.die.call(this);
	}
	,__generateInventory: function() {
		this.inventory = new war_items_Inventory(5 + Math.ceil(1.75 * this.level),this);
		var r = new tannus_math_Random();
		if(Lambda.has([6,9],r.randint(0,10))) {
			var p;
			var f = r.randint(0,10);
			p = f;
			this.inventory.addItem(new war_items_HealthItem(Math.floor(this.max_health * (p / 100))));
		}
		if(r.randchance(2,5)) {
			var moneys = r.randint(0,r.randint(5,12) * this.level);
			if(moneys > 0) {
				var cash = new war_items_MoneyItem(moneys);
				this.inventory.addItem(cash);
			}
		} else {
			var ammos = r.randint(0,10 * this.level);
			if(ammos > 0) {
				var ammo = new war_weapons_Ammo();
				ammo.count = ammos;
				this.inventory.addItem(ammo);
				var hasGun = r.randchance(12,100);
				if(hasGun) {
					var gunTypes = [war_weapons_Pistol];
					var type = r.choice(gunTypes);
					var gun = Type.createInstance(type,[]);
					this.inventory.addItem(gun);
				}
			}
		}
	}
	,__class__: war_npc_Zombie
});
var war_player_Avatar = function(g) {
	var _g = this;
	war_npc_Organism.call(this);
	this.controls = new war_player_Controls(this);
	this.keys = new haxe_ds_IntMap();
	this.inventory = new war_items_Inventory(10,this);
	this.inventory.addItem(new war_weapons_Pistol());
	var ammo = new war_weapons_Ammo();
	ammo.count = 5000;
	this.inventory.addItem(ammo);
	var angle = new tannus_geom_CAngle(0);
	this.vel = new tannus_geom_CVelocity(0,angle);
	this.speed = 3;
	this.money = 0;
	this._using = false;
	this.skill = new war_player_Skill();
	this.game.world.firstUpdate.once(function() {
		_g.rect.set_center(_g.game.world.rect.get_center());
	});
	this.controls.keysig(81).once($bind(this,this.pressedQ));
	this.controls.keysig(27).once($bind(this,this.pressedEsc));
};
$hxClasses["war.player.Avatar"] = war_player_Avatar;
war_player_Avatar.__name__ = ["war","player","Avatar"];
war_player_Avatar.__super__ = war_npc_Organism;
war_player_Avatar.prototype = $extend(war_npc_Organism.prototype,{
	init: function(stage) {
		war_npc_Organism.prototype.init.call(this,stage);
		this.rect.set_center(this.game.world.rect.get_center());
	}
	,update: function(s) {
		war_npc_Organism.prototype.update.call(this,s);
		this.set_w(this.set_h(this.game.world.get_tileWidth()));
		if(this._using && this.inventory.get_equippedItem().useType == 2) {
			var udata = new war_items_UseData();
			udata.target = s.getMousePosition();
			udata.user = this;
			this["use"](udata);
		}
		this.move();
		this.pickups();
	}
	,render: function(s,c) {
		c.set_fillStyle("#000");
		c.fillRect(this.get_x(),this.get_y(),this.get_w(),this.get_h());
		var eq = this.inventory.get_equipped().get_item();
	}
	,move: function() {
		this.vel.set_x(0);
		this.vel.set_y(0);
		if((function($this) {
			var $r;
			var this1 = $this.keys;
			$r = (function($this) {
				var $r;
				var i;
				{
					var _this = "W".toUpperCase();
					i = HxOverrides.cca(_this,0);
				}
				$r = this1.h.hasOwnProperty(i)?this1.h[i]:false;
				return $r;
			}($this));
			return $r;
		}(this))) {
			var _g = this.vel;
			_g.set_y(Math.sin(_g.angle.v * Math.PI / 180) * _g.speed - this.speed);
		} else if((function($this) {
			var $r;
			var this2 = $this.keys;
			$r = (function($this) {
				var $r;
				var i1;
				{
					var _this1 = "S".toUpperCase();
					i1 = HxOverrides.cca(_this1,0);
				}
				$r = this2.h.hasOwnProperty(i1)?this2.h[i1]:false;
				return $r;
			}($this));
			return $r;
		}(this))) {
			var _g1 = this.vel;
			_g1.set_y(Math.sin(_g1.angle.v * Math.PI / 180) * _g1.speed + this.speed);
		}
		if((function($this) {
			var $r;
			var this3 = $this.keys;
			$r = (function($this) {
				var $r;
				var i2;
				{
					var _this2 = "A".toUpperCase();
					i2 = HxOverrides.cca(_this2,0);
				}
				$r = this3.h.hasOwnProperty(i2)?this3.h[i2]:false;
				return $r;
			}($this));
			return $r;
		}(this))) {
			var _g2 = this.vel;
			_g2.set_x(Math.cos(_g2.angle.v * Math.PI / 180) * _g2.speed - this.speed);
		} else if((function($this) {
			var $r;
			var this4 = $this.keys;
			$r = (function($this) {
				var $r;
				var i3;
				{
					var _this3 = "D".toUpperCase();
					i3 = HxOverrides.cca(_this3,0);
				}
				$r = this4.h.hasOwnProperty(i3)?this4.h[i3]:false;
				return $r;
			}($this));
			return $r;
		}(this))) {
			var _g3 = this.vel;
			_g3.set_x(Math.cos(_g3.angle.v * Math.PI / 180) * _g3.speed + this.speed);
		}
		this.vel.set_x(tannus_math_TMath.clamp_Float(this.vel.get_x(),-this.speed,this.speed));
		this.vel.set_y(tannus_math_TMath.clamp_Float(this.vel.get_y(),-this.speed,this.speed));
		var _g4 = this;
		_g4.set_x(_g4.get_x() + this.vel.get_x());
		var _g5 = this;
		_g5.set_y(_g5.get_y() + this.vel.get_y());
	}
	,pickups: function() {
		var drops = this.stage.get("war.items.Drop");
		var $it0 = drops.iterator();
		while( $it0.hasNext() ) {
			var drop = $it0.next();
			if(drop.collidesWith(this.rect) && drop.item.canPickup(this)) drop.pickup(this);
		}
	}
	,'use': function(data) {
		this.inventory["use"](data);
	}
	,pressedQ: function(e) {
		var _g = this;
		var invPage = new war_ui_InventoryView(this);
		this.stage.addChild(invPage);
		invPage.open();
		gryffin_Tools.defer(function() {
			_g.controls.keysig(81).once(function(e1) {
				invPage.close();
				gryffin_Tools.defer((function(f,a1,cb) {
					return function() {
						f(a1,cb);
					};
				})(($_=_g.controls,$bind($_,$_.nextkey)),81,$bind(_g,_g.pressedQ)));
			});
		});
	}
	,pressedEsc: function(e) {
		var pm = new war_ui_PauseMenu(this);
		this.stage.addChild(pm);
		pm.open();
	}
	,state: function() {
		return new war_player_PlayerData(this);
	}
	,get_equipped: function() {
		return this.inventory.get_equippedItem();
	}
	,__class__: war_player_Avatar
	,__properties__: $extend(war_npc_Organism.prototype.__properties__,{get_equipped:"get_equipped"})
});
var war_player_Controls = function(p) {
	this.player = p;
	this.keyListeners = new haxe_ds_IntMap();
	this.player.on("activated",$bind(this,this.bind));
};
$hxClasses["war.player.Controls"] = war_player_Controls;
war_player_Controls.__name__ = ["war","player","Controls"];
war_player_Controls.prototype = {
	bind: function(s) {
		this.stage = s;
		this.bindKeys();
		this.bindMouse();
	}
	,bindMouse: function() {
		this.stage.on("click",$bind(this,this.handleClick));
		this.stage.on("mousedown",$bind(this,this.handleMouse));
		this.stage.on("mouseup",$bind(this,this.handleMouse));
	}
	,handleClick: function(e) {
		if(!this.player.game.isOpen()) return;
		if(!e._defaultPrevented) {
			var use_data = war_items_UseData.fromMouseEvent(e);
			this.player["use"](use_data);
		}
	}
	,handleMouse: function(e) {
		if(!e._defaultPrevented) {
			var _g = e.type;
			switch(_g) {
			case "mousedown":
				var eq = this.player.inventory.get_equippedItem();
				if(eq != null && eq.useType == 2) this.player._using = true;
				break;
			case "mouseup":case "mouseleave":
				this.player._using = false;
				break;
			}
		}
	}
	,bindKeys: function() {
		this.stage.on("keydown",(function(f,a1) {
			return function(e) {
				f(e,a1);
			};
		})($bind(this,this.toggleKey),true));
		this.stage.on("keyup",(function(f1,a11) {
			return function(e1) {
				f1(e1,a11);
			};
		})($bind(this,this.toggleKey),false));
	}
	,toggleKey: function(e,state) {
		this.player.keys.h[e.keyCode] = state;
		if(e.type == "keyup") this.pressEvent(e);
	}
	,pressEvent: function(e) {
		console.log(e.keyCode);
		this.keysig(e.keyCode).call(e);
	}
	,onkey: function(code,cb) {
		this.keysig(code).on(cb,null);
	}
	,nextkey: function(code,cb) {
		this.keysig(code).once(cb);
	}
	,keysig: function(code) {
		var sig = this.keyListeners.h[code];
		if(sig == null) {
			var v = new tannus_io_Signal();
			this.keyListeners.h[code] = v;
			sig = v;
		}
		return sig;
	}
	,__class__: war_player_Controls
};
var war_player__$Keys_Keys_$Impl_$ = {};
$hxClasses["war.player._Keys.Keys_Impl_"] = war_player__$Keys_Keys_$Impl_$;
war_player__$Keys_Keys_$Impl_$.__name__ = ["war","player","_Keys","Keys_Impl_"];
war_player__$Keys_Keys_$Impl_$._new = function() {
	return new haxe_ds_IntMap();
};
war_player__$Keys_Keys_$Impl_$.get = function(this1,i) {
	if(this1.h.hasOwnProperty(i)) return this1.h[i]; else return false;
};
war_player__$Keys_Keys_$Impl_$.set = function(this1,i,v) {
	this1.h[i] = v;
};
war_player__$Keys_Keys_$Impl_$.letter = function(this1,key) {
	var i;
	var _this = key.toUpperCase();
	i = HxOverrides.cca(_this,0);
	if(this1.h.hasOwnProperty(i)) return this1.h[i]; else return false;
};
var war_player_PlayerData = function(p) {
	war_npc_OrganismData.call(this,p);
	this.skill = [p.skill._lvl,p.skill._xp];
	this.vel = [p.vel.angle.v,p.vel.speed];
	this.money = p.money;
	this.inventory = haxe_Serializer.run(p.inventory);
};
$hxClasses["war.player.PlayerData"] = war_player_PlayerData;
war_player_PlayerData.__name__ = ["war","player","PlayerData"];
war_player_PlayerData.__super__ = war_npc_OrganismData;
war_player_PlayerData.prototype = $extend(war_npc_OrganismData.prototype,{
	apply: function(o) {
		war_npc_OrganismData.prototype.apply.call(this,o);
		if(js_Boot.__instanceof(o,war_player_Avatar)) {
			var p = o;
			p.skill._lvl = this.skill[0];
			p.skill._xp = this.skill[1];
			p.vel.angle = new tannus_geom_CAngle(this.vel[0]);
			p.vel.speed = this.vel[1];
			p.money = this.money;
			var inv = haxe_Unserializer.run(this.inventory);
			inv.owner = p;
			p.inventory = inv;
		}
	}
	,hxSerialize: function(s) {
		war_npc_OrganismData.prototype.hxSerialize.call(this,s);
		var w = (function(f) {
			return function(v) {
				f(v);
			};
		})($bind(s,s.serialize));
		w(this.vel);
		w(this.skill);
		w(this.money);
		w(this.inventory);
	}
	,hxUnserialize: function(u) {
		war_npc_OrganismData.prototype.hxUnserialize.call(this,u);
		var r;
		var f1 = (function(f) {
			return function() {
				return f();
			};
		})($bind(u,u.unserialize));
		r = f1;
		this.vel = r();
		this.skill = r();
		this.money = r();
		this.inventory = r();
	}
	,__class__: war_player_PlayerData
});
var war_player_Skill = function() {
	this._xp = 0;
	this._lvl = 1;
	this.increase = new tannus_io_VoidSignal();
};
$hxClasses["war.player.Skill"] = war_player_Skill;
war_player_Skill.__name__ = ["war","player","Skill"];
war_player_Skill.prototype = {
	grant_xp: function(amount) {
		this._xp += amount;
		if(this._xp >= 25 * (this._lvl - 1) + 100) {
			this._xp -= 25 * (this._lvl - 1) + 100;
			this.level_up();
		}
	}
	,level_up: function() {
		this._lvl++;
		this.increase.call();
	}
	,get_xp: function() {
		return this._xp;
	}
	,get_level: function() {
		return this._lvl;
	}
	,get_xp_needed: function() {
		return 25 * (this._lvl - 1) + 100;
	}
	,__class__: war_player_Skill
	,__properties__: {get_xp_needed:"get_xp_needed",get_level:"get_level",get_xp:"get_xp"}
};
var war_ui_HUDItem = function(s,w) {
	gryffin_ui_ListItem.call(this);
	this.stage = s;
	this.world = w;
	this.margin = new gryffin_ui_Padding();
	this.set_x(0);
	this.set_y(0);
};
$hxClasses["war.ui.HUDItem"] = war_ui_HUDItem;
war_ui_HUDItem.__name__ = ["war","ui","HUDItem"];
war_ui_HUDItem.__super__ = gryffin_ui_ListItem;
war_ui_HUDItem.prototype = $extend(gryffin_ui_ListItem.prototype,{
	get_centerX: function() {
		return this.get_x() + this.get_w() / 2;
	}
	,set_centerX: function(v) {
		this.set_x(v - this.get_w() / 2);
		return v;
	}
	,get_centerY: function() {
		return this.get_y() + this.get_h() / 2;
	}
	,set_centerY: function(v) {
		this.set_y(v - this.get_h() / 2);
		return v;
	}
	,get_center: function() {
		var _g = this;
		var x = new tannus_io__$Pointer_Ref(function() {
			return _g.get_centerX();
		},function(v) {
			return _g.set_centerX(v);
		});
		var y = new tannus_io__$Pointer_Ref(function() {
			return _g.get_centerY();
		},function(v1) {
			return _g.set_centerY(v1);
		});
		return new tannus_geom_LinkedPoint(x,y,null);
	}
	,__class__: war_ui_HUDItem
	,__properties__: $extend(gryffin_ui_ListItem.prototype.__properties__,{get_center:"get_center",set_centerY:"set_centerY",get_centerY:"get_centerY",set_centerX:"set_centerX",get_centerX:"get_centerX"})
});
var war_ui_CashDisplay = function(p) {
	war_ui_HUDItem.call(this,p.game.stage,p.game.world);
	this.player = p;
	this.box = new gryffin_display_TextBox();
	this.box.set_fontFamily("Ubuntu");
};
$hxClasses["war.ui.CashDisplay"] = war_ui_CashDisplay;
war_ui_CashDisplay.__name__ = ["war","ui","CashDisplay"];
war_ui_CashDisplay.__super__ = war_ui_HUDItem;
war_ui_CashDisplay.prototype = $extend(war_ui_HUDItem.prototype,{
	update: function(s) {
		war_ui_HUDItem.prototype.update.call(this,s);
		this.set_h(30);
		var txt = "Cash $" + this.player.money;
		if(this.box.get_text() != txt) {
			this.box.set_text(txt);
			this.box.autoScale(null,this.get_h());
		}
	}
	,render: function(s,c) {
		c.drawComponent(this.box,0,0,this.box.get_width(),this.box.get_height(),this.get_x(),this.get_y(),this.box.get_width(),this.box.get_height());
	}
	,__class__: war_ui_CashDisplay
});
var war_ui_EquippedDisplay = function(p) {
	war_ui_HUDItem.call(this,p.game.stage,p.game.world);
	this.player = p;
	this.box = new gryffin_display_TextBox();
	this.box.multiline = true;
	this.box.set_fontFamily("Ubuntu");
	this.icon = null;
	this.lastItem = null;
	this.margin.top = 20;
};
$hxClasses["war.ui.EquippedDisplay"] = war_ui_EquippedDisplay;
war_ui_EquippedDisplay.__name__ = ["war","ui","EquippedDisplay"];
war_ui_EquippedDisplay.__super__ = war_ui_HUDItem;
war_ui_EquippedDisplay.prototype = $extend(war_ui_HUDItem.prototype,{
	update: function(stage) {
		war_ui_HUDItem.prototype.update.call(this,stage);
		var i = this.player.inventory.get_equippedItem();
		if(i == null) {
			this.box.set_text("None");
			this.icon = gryffin_display_Canvas.create(100,100);
		} else {
			var _txt = this.box.get_text();
			this.box.set_text(i.hudText());
			if(i != this.lastItem) this.icon = i.draw(100,100);
		}
		this.lastItem = i;
	}
	,render: function(stage,c) {
		war_ui_HUDItem.prototype.render.call(this,stage,c);
		if(this.icon == null) return;
		var br = this.boxRect();
		var ir = this.iconRect();
		c.drawComponent(this.icon,0,0,this.icon.canvas.width,this.icon.canvas.height,ir.x,ir.y,ir.width,ir.height);
		c.beginPath();
		c.set_strokeStyle("#666");
		c.set_lineWidth(2);
		c.rect(ir.x,ir.y,ir.width,ir.height);
		c.closePath();
		c.stroke();
		c.drawComponent(this.box,0,0,this.box.get_width(),this.box.get_height(),br.x,br.y,br.width,br.height);
	}
	,boxRect: function() {
		var _x = this.get_x();
		var _y = this.get_y() + this.margin.top + this.icon.canvas.height + 8;
		var _width = this.box.get_width();
		var _height = this.box.get_height();
		return new tannus_geom_CRectangle(_x,_y,_width,_height);
	}
	,iconRect: function() {
		var _x = this.get_x() + (this.get_w() - this.icon.canvas.width) / 2;
		var _y = this.get_y();
		return new tannus_geom_CRectangle(_x,_y,this.icon.canvas.width,this.icon.canvas.height);
	}
	,get_w: function() {
		return this.margin.get_horizontal() + tannus_math_TMath.max(this.box.get_width(),this.icon != null?this.icon.canvas.width:0);
	}
	,get_h: function() {
		return 8 + this.margin.get_vertical() + this.box.get_height() + (this.icon != null?this.icon.canvas.height:0);
	}
	,containsPoint: function(p) {
		return this.boxRect().containsPoint(p) || this.iconRect().containsPoint(p);
	}
	,click: function(e) {
		var kbe = new tannus_events_KeyboardEvent("keyfake",69);
		this.player.pressedQ(kbe);
	}
	,get_inv: function() {
		return this.player.inventory;
	}
	,get_item: function() {
		return this.player.inventory.get_equippedItem();
	}
	,__class__: war_ui_EquippedDisplay
	,__properties__: $extend(war_ui_HUDItem.prototype.__properties__,{get_item:"get_item",get_inv:"get_inv"})
});
var war_ui_HUD = function(s,g) {
	gryffin_ui_List.call(this);
	this.stage = s;
	this.world = g.world;
	this.x = 0;
	this.y = 25;
};
$hxClasses["war.ui.HUD"] = war_ui_HUD;
war_ui_HUD.__name__ = ["war","ui","HUD"];
war_ui_HUD.__super__ = gryffin_ui_List;
war_ui_HUD.prototype = $extend(gryffin_ui_List.prototype,{
	firstPos: function() {
		return new tannus_geom_TPoint(this.x,this.y,0);
	}
	,update: function(stage) {
		var _x = this.world.get_x() + this.world.get_w();
		var _width = stage.canvas.width - (this.world.get_x() + this.world.get_w());
		this.contentRect = new tannus_geom_CRectangle(_x,0,_width,stage.canvas.height);
		gryffin_ui_List.prototype.update.call(this,stage);
	}
	,render: function(s,c) {
		gryffin_ui_List.prototype.render.call(this,s,c);
	}
	,updateItem: function(stage,item) {
		gryffin_ui_List.prototype.updateItem.call(this,stage,item);
		item.contentRect = this.contentRect;
	}
	,positionItem: function(p,item) {
		var ny = p.get_y() + item.margin.top;
		p.set_y(ny);
		item.set_centerX(this.contentRect.get_centerX());
		item.set_y(p.get_y());
		var ny1 = p.get_y() + item.get_h();
		p.set_y(ny1);
		var ny2 = p.get_y() + item.margin.bottom;
		p.set_y(ny2);
	}
	,__class__: war_ui_HUD
});
var war_ui_HealthBar = function(o) {
	war_core_Ent.call(this);
	this.owner = o;
	this.full_color = tannus_graphics__$Color_TColor.fromString("#F00");
	this.empty_color = tannus_graphics__$Color_TColor.fromString("#0F0");
	this.set_h(15);
	this.__listen();
};
$hxClasses["war.ui.HealthBar"] = war_ui_HealthBar;
war_ui_HealthBar.__name__ = ["war","ui","HealthBar"];
war_ui_HealthBar.__super__ = war_core_Ent;
war_ui_HealthBar.prototype = $extend(war_core_Ent.prototype,{
	render: function(s,c) {
		war_core_Ent.prototype.render.call(this,s,c);
		c.set_strokeStyle("black");
		c.strokeRect(this.get_x(),this.get_y(),this.get_w(),this.get_h());
		c.set_fillStyle("#F00");
		c.fillRect(this.get_x(),this.get_y(),this.get_w() * ((function($this) {
			var $r;
			var this1 = tannus_math__$Percent_Percent_$Impl_$.percent($this.owner.health,$this.owner.max_health);
			$r = this1;
			return $r;
		}(this)) / 100),this.get_h());
	}
	,__listen: function() {
		var _g = this;
		this.owner.addSibling(this);
		this.owner.on("death",function(e) {
			_g["delete"]();
		});
	}
	,get_perc: function() {
		return tannus_math__$Percent_Percent_$Impl_$.percent(this.owner.health,this.owner.max_health);
	}
	,__class__: war_ui_HealthBar
	,__properties__: $extend(war_core_Ent.prototype.__properties__,{get_perc:"get_perc"})
});
var war_ui_InventoryView = function(p) {
	gryffin_ui_Page.call(this);
	this.player = p;
	this.items = new war_ui_ItemList(this.player.inventory);
	this.items.itemPadding.set_horizontal(100);
	this.items.itemPadding.set_vertical(6);
	this.items.padding.bottom = 4;
	this.hud = new war_ui_HUD(p.game.stage,p.game);
	this.hud.addItem(new war_ui_CashDisplay(p));
	this.generate();
};
$hxClasses["war.ui.InventoryView"] = war_ui_InventoryView;
war_ui_InventoryView.__name__ = ["war","ui","InventoryView"];
war_ui_InventoryView.__super__ = gryffin_ui_Page;
war_ui_InventoryView.prototype = $extend(gryffin_ui_Page.prototype,{
	generate: function() {
		this.addChild(this.items);
		this.addChild(this.hud);
	}
	,close: function() {
		gryffin_ui_Page.prototype.close.call(this);
		if(this.prev_page != null) this.prev_page.open();
	}
	,get_contentRect: function() {
		var _height = this.items.contentHeight();
		return new tannus_geom_CRectangle(0,0,this.stage.canvas.width,_height);
	}
	,__class__: war_ui_InventoryView
});
var war_ui_ItemList = function(i) {
	gryffin_ui_List.call(this);
	this.itemList = i;
	this.padding = new gryffin_ui_Padding();
	this.itemPadding = new gryffin_ui_Padding();
	this.pos = new tannus_geom_TPoint(0,0,0);
	this.max_width = 0;
	this.genViews();
};
$hxClasses["war.ui.ItemList"] = war_ui_ItemList;
war_ui_ItemList.__name__ = ["war","ui","ItemList"];
war_ui_ItemList.__super__ = gryffin_ui_List;
war_ui_ItemList.prototype = $extend(gryffin_ui_List.prototype,{
	firstPos: function() {
		return this.pos.clone();
	}
	,positionItem: function(p,item) {
		item.padding.copyFrom(this.itemPadding);
		var ny = p.get_y() + this.padding.top;
		p.set_y(ny);
		item.set_x(p.get_x());
		item.set_y(p.get_y());
		this.max_width = tannus_math_TMath.max(this.max_width,item.get_w());
		var ny1 = p.get_y() + item.get_h();
		p.set_y(ny1);
		var ny2 = p.get_y() + this.padding.bottom;
		p.set_y(ny2);
	}
	,genViews: function() {
		var $it0 = this.itemList.iterator();
		while( $it0.hasNext() ) {
			var slot = $it0.next();
			var item = new war_ui_ItemListItem(slot);
			item.padding.copyFrom(this.itemPadding);
			this.addItem(item);
		}
	}
	,closeAllMenus: function() {
		var _g = 0;
		var _g1 = this.items;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			if(item.menu != null) {
				item.menu["delete"]();
				item.menu = null;
			}
		}
	}
	,contentHeight: function() {
		return tannus_math_TMath.sum_Float(this.items.map(function(item) {
			return item.get_h();
		}));
	}
	,containsPoint: function(p) {
		var _g = 0;
		var _g1 = this.items;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(i.containsPoint(p)) return true;
		}
		return false;
	}
	,__class__: war_ui_ItemList
});
var war_ui_ItemListItem = function(s) {
	gryffin_ui_ListItem.call(this);
	this.slot = s;
	this.padding = new gryffin_ui_Padding();
	this.nameBox = new gryffin_display_TextBox();
	this.hovered = false;
	this.menu = null;
	this.initBox(this.nameBox);
	this.on("contextmenu",$bind(this,this.ctxMenu));
};
$hxClasses["war.ui.ItemListItem"] = war_ui_ItemListItem;
war_ui_ItemListItem.__name__ = ["war","ui","ItemListItem"];
war_ui_ItemListItem.click = function(self,e) {
	console.log("you clicked me!");
};
war_ui_ItemListItem.__super__ = gryffin_ui_ListItem;
war_ui_ItemListItem.prototype = $extend(gryffin_ui_ListItem.prototype,{
	update: function(stage) {
		gryffin_ui_ListItem.prototype.update.call(this,stage);
		if(!(this.slot.get_item() == null)) {
			var txt;
			txt = (this.slot.get_item().get_canStack()?this.slot.get_item().count + "":"") + " " + this.slot.get_item().name;
			if(Std["is"](this.slot.get_item(),war_weapons_Weapon)) {
				var wep = this.slot.get_item();
				txt += "\ndmg: " + wep._damage.get();
			}
			this.nameBox.set_text(txt);
		} else this.nameBox.set_text("Empty");
		var mp = stage.getMousePosition();
		if(mp != null) {
			this.hovered = this.containsPoint(mp);
			if(this.hovered) stage.set_cursor("pointer");
		} else this.hovered = false;
	}
	,render: function(stage,c) {
		gryffin_ui_ListItem.prototype.render.call(this,stage,c);
		c.save();
		c.beginPath();
		c.set_strokeStyle("#666");
		c.set_fillStyle("#FFFFCC");
		c.rect(this.get_x(),this.get_y(),this.get_w(),this.get_h());
		c.closePath();
		c.fill();
		c.stroke();
		c.drawComponent(this.nameBox,0,0,this.nameBox.get_width(),this.nameBox.get_height(),this.padding.left + this.get_x(),this.padding.top + this.get_y(),this.nameBox.get_width(),this.nameBox.get_height());
		c.restore();
	}
	,containsPoint: function(p) {
		if(this.menu != null && this.menu.containsPoint(p)) return false; else return gryffin_ui_ListItem.prototype.containsPoint.call(this,p);
	}
	,ctxMenu: function(e) {
		var _g = this;
		e.cancel();
		if(this.menu != null) {
			this.menu["delete"]();
			this.menu = null;
		}
		this.menu = new war_ui_ItemMenu(this);
		this.menu.target = e.position;
		var outsideMenu;
		var outsideMenu1 = null;
		outsideMenu1 = function(e1) {
			if(!_g.menu.containsPoint(e1.position)) {
				_g.menu["delete"]();
				_g.menu = null;
				_g.stage.off("click",outsideMenu1);
				_g.stage.off("contextmenu",outsideMenu1);
			}
		};
		outsideMenu = outsideMenu1;
		this.stage.on("click",outsideMenu);
		this.stage.on("contextmenu",outsideMenu);
		this.parent.addSibling(this.menu);
	}
	,initBox: function(box) {
		box.set_fontFamily("Ubuntu");
		box.multiline = true;
	}
	,get_w: function() {
		var res = this.padding.get_horizontal() + this.nameBox.get_width();
		return res;
	}
	,get_h: function() {
		var res = this.padding.top + this.nameBox.get_height() + this.padding.bottom;
		return res;
	}
	,get_item: function() {
		return this.slot.get_item();
	}
	,__class__: war_ui_ItemListItem
	,__properties__: $extend(gryffin_ui_ListItem.prototype.__properties__,{get_item:"get_item"})
});
var war_ui_ItemMenu = function(i) {
	gryffin_ui_ContextMenu.call(this);
	this.itm = i;
	this.generate();
};
$hxClasses["war.ui.ItemMenu"] = war_ui_ItemMenu;
war_ui_ItemMenu.__name__ = ["war","ui","ItemMenu"];
war_ui_ItemMenu.__super__ = gryffin_ui_ContextMenu;
war_ui_ItemMenu.prototype = $extend(gryffin_ui_ContextMenu.prototype,{
	generate: function() {
		if(!(this.itm.slot.get_item() == null)) {
			this.sellButton();
			this.dropButton();
			if(Std["is"](this.itm.slot.get_item(),war_weapons_Weapon)) this.weaponButtons(this.itm.slot.get_item());
		}
	}
	,sellButton: function() {
		var _g = this;
		var i = this.itm.slot.get_item();
		var value;
		value = i.base_value() * (i.stackable > 0?i.count:1);
		this.button("Sell for $" + value,function() {
			(js_Boot.__cast((js_Boot.__cast(_g.itm.slot.get_item().storage , war_items_Inventory)).owner , war_player_Avatar)).money += value;
			_g.itm.slot.set_item(null);
		});
	}
	,dropButton: function() {
		var _g = this;
		this.button("Drop",function() {
			var d = (js_Boot.__cast(_g.itm.slot.get_item().storage , war_items_Inventory)).drop((js_Boot.__cast(_g.itm.slot.get_item().storage , war_items_Inventory)).indexOf(_g.itm.slot));
			d.set_pos((function($this) {
				var $r;
				var this1 = (js_Boot.__cast((js_Boot.__cast(_g.itm.slot.get_item().storage , war_items_Inventory)).owner , war_player_Avatar)).get_pos();
				var other = tannus_geom_TPoint.fromFloatArray([40,40]);
				$r = this1.plusPoint(other);
				return $r;
			}(this)));
			(js_Boot.__cast((js_Boot.__cast(_g.itm.slot.get_item().storage , war_items_Inventory)).owner , war_player_Avatar)).game.stage.addChild(d);
			_g.itm.slot.set_item(null);
		});
	}
	,weaponButtons: function(w) {
		var lvlup = new war_weapons_WeaponLevelPurchase(w);
		war_ds_PurchaseTools.addPurchase(this,lvlup,js_Boot.__cast((js_Boot.__cast(this.itm.slot.get_item().storage , war_items_Inventory)).owner , war_player_Avatar));
	}
	,get_inv: function() {
		return js_Boot.__cast(this.itm.slot.get_item().storage , war_items_Inventory);
	}
	,get_player: function() {
		return js_Boot.__cast((js_Boot.__cast(this.itm.slot.get_item().storage , war_items_Inventory)).owner , war_player_Avatar);
	}
	,__class__: war_ui_ItemMenu
	,__properties__: $extend(gryffin_ui_ContextMenu.prototype.__properties__,{get_player:"get_player",get_inv:"get_inv"})
});
var war_ui_PauseMenu = function(p) {
	gryffin_ui_Page.call(this);
	this.player = p;
	this.resumeButton = new war_ui_ResumeButton(this);
	this.quitButton = new war_ui_QuitButton(this);
	this.addChild(this.resumeButton);
	this.addChild(this.quitButton);
};
$hxClasses["war.ui.PauseMenu"] = war_ui_PauseMenu;
war_ui_PauseMenu.__name__ = ["war","ui","PauseMenu"];
war_ui_PauseMenu.__super__ = gryffin_ui_Page;
war_ui_PauseMenu.prototype = $extend(gryffin_ui_Page.prototype,{
	open: function() {
		gryffin_ui_Page.prototype.open.call(this);
	}
	,close: function() {
		var _g = this;
		gryffin_ui_Page.prototype.close.call(this);
		this["delete"]();
		if(this.prev_page != null) this.prev_page.open();
		gryffin_Tools.defer(function() {
			_g.player.controls.keysig(27).once(($_=_g.player,$bind($_,$_.pressedEsc)));
		});
	}
	,update: function(stage) {
		gryffin_ui_Page.prototype.update.call(this,stage);
		this.resumeButton.set_centerX(new tannus_geom_CRectangle(0,0,stage.canvas.width,stage.canvas.height).get_centerX());
		this.quitButton.set_centerX(new tannus_geom_CRectangle(0,0,stage.canvas.width,stage.canvas.height).get_centerX());
	}
	,__class__: war_ui_PauseMenu
});
var war_ui_PlayerHealthBar = function(s,p) {
	war_ui_HUDItem.call(this,s,p.game.world);
	this.box = new gryffin_display_TextBox();
	this.box.set_fontFamily("Ubuntu");
	this.contentRect = new tannus_geom_CRectangle(0,0,0,0);
	this.player = p;
	var this1 = window;
	var self = tannus_ds_CObj.create(this1);
	var val = this;
	self.set("healthbar",val);
};
$hxClasses["war.ui.PlayerHealthBar"] = war_ui_PlayerHealthBar;
war_ui_PlayerHealthBar.__name__ = ["war","ui","PlayerHealthBar"];
war_ui_PlayerHealthBar.__super__ = war_ui_HUDItem;
war_ui_PlayerHealthBar.prototype = $extend(war_ui_HUDItem.prototype,{
	update: function(s) {
		war_ui_HUDItem.prototype.update.call(this,s);
		this.set_w(this.contentRect.width * 0.85);
		this.set_h(20);
		var txt = "" + this.player.health + "hp / " + this.player.max_health + "hp";
		if(this.box.get_text() != txt) {
			this.box.set_text(txt);
			this.box.autoScale(this.get_w(),this.get_h());
		}
	}
	,render: function(s,c) {
		c.set_strokeStyle("#000");
		c.strokeRect(this.get_x(),this.get_y(),this.get_w(),this.get_h());
		var perc = tannus_math__$Percent_Percent_$Impl_$.percent(this.player.health,this.player.max_health);
		c.set_fillStyle("#F00");
		c.fillRect(this.get_x(),this.get_y(),this.get_w() * (perc / 100),this.get_h());
		c.drawComponent(this.box,0,0,this.box.get_width(),this.box.get_height(),this.get_x(),this.get_y(),this.box.get_width(),this.box.get_height());
	}
	,__class__: war_ui_PlayerHealthBar
});
var war_ui_PlayerLevelBar = function(s,p) {
	war_ui_HUDItem.call(this,s,p.game.world);
	this.box = new gryffin_display_TextBox();
	this.box.set_fontFamily("Ubuntu");
	this.contentRect = new tannus_geom_CRectangle(0,0,0,0);
	this.player = p;
	this.margin.top = 18;
	var this1 = window;
	var self = tannus_ds_CObj.create(this1);
	var val = this;
	self.set("healthbar",val);
};
$hxClasses["war.ui.PlayerLevelBar"] = war_ui_PlayerLevelBar;
war_ui_PlayerLevelBar.__name__ = ["war","ui","PlayerLevelBar"];
war_ui_PlayerLevelBar.__super__ = war_ui_HUDItem;
war_ui_PlayerLevelBar.prototype = $extend(war_ui_HUDItem.prototype,{
	update: function(s) {
		war_ui_HUDItem.prototype.update.call(this,s);
		this.set_w(this.contentRect.width * 0.85);
		this.set_h(20);
		var txt = "Level " + this.player.skill._lvl + "  (" + this.player.skill._xp + "xp / " + (25 * (this.player.skill._lvl - 1) + 100) + "xp)";
		if(this.box.get_text() != txt) {
			this.box.set_text(txt);
			this.box.autoScale(this.get_w(),this.get_h());
		}
	}
	,render: function(s,c) {
		c.set_strokeStyle("#000");
		c.strokeRect(this.get_x(),this.get_y(),this.get_w(),this.get_h());
		var perc = tannus_math__$Percent_Percent_$Impl_$.percent(this.player.skill._xp,25 * (this.player.skill._lvl - 1) + 100);
		c.set_fillStyle("#3399FF");
		c.fillRect(this.get_x(),this.get_y(),this.get_w() * (perc / 100),this.get_h());
		c.drawComponent(this.box,0,0,this.box.get_width(),this.box.get_height(),this.get_x(),this.get_y(),this.box.get_width(),this.box.get_height());
	}
	,__class__: war_ui_PlayerLevelBar
});
var war_ui_TextButton = function() {
	war_core_Ent.call(this);
	this.box = new gryffin_display_TextBox();
	this.hovered = false;
	this.on("click",$bind(this,this.click));
};
$hxClasses["war.ui.TextButton"] = war_ui_TextButton;
war_ui_TextButton.__name__ = ["war","ui","TextButton"];
war_ui_TextButton.__super__ = war_core_Ent;
war_ui_TextButton.prototype = $extend(war_core_Ent.prototype,{
	update: function(stage) {
		war_core_Ent.prototype.update.call(this,stage);
		var mp = stage.getMousePosition();
		if(mp != null) this.hovered = this.containsPoint(mp);
		if(this.hovered) stage.set_cursor("pointer");
	}
	,render: function(stage,c) {
		war_core_Ent.prototype.render.call(this,stage,c);
		c.drawComponent(this.box,0,0,this.get_w(),this.get_h(),this.get_x(),this.get_y(),this.get_w(),this.get_h());
	}
	,click: function(e) {
		e.preventDefault();
	}
	,get_text: function() {
		return this.box.get_text();
	}
	,set_text: function(v) {
		return this.box.set_text(v);
	}
	,get_fontFamily: function() {
		return this.box.get_fontFamily();
	}
	,set_fontFamily: function(v) {
		return this.box.set_fontFamily(v);
	}
	,get_fontSize: function() {
		return this.box.get_fontSize();
	}
	,set_fontSize: function(v) {
		return this.box.set_fontSize(v);
	}
	,get_w: function() {
		return this.box.get_width();
	}
	,get_h: function() {
		return this.box.get_height();
	}
	,__class__: war_ui_TextButton
	,__properties__: $extend(war_core_Ent.prototype.__properties__,{set_fontSize:"set_fontSize",get_fontSize:"get_fontSize",set_fontFamily:"set_fontFamily",get_fontFamily:"get_fontFamily",set_text:"set_text",get_text:"get_text"})
});
var war_ui_QuitButton = function(pm) {
	war_ui_TextButton.call(this);
	this.menu = pm;
	this.box.set_text("Quit Game");
	this.box.set_fontFamily("Ubuntu");
	this.box.set_fontSize(24);
	this.set_y(84);
};
$hxClasses["war.ui.QuitButton"] = war_ui_QuitButton;
war_ui_QuitButton.__name__ = ["war","ui","QuitButton"];
war_ui_QuitButton.__super__ = war_ui_TextButton;
war_ui_QuitButton.prototype = $extend(war_ui_TextButton.prototype,{
	click: function(e) {
		war_ui_TextButton.prototype.click.call(this,e);
		var game = this.menu.prev_page;
		game.save(function() {
			var appw = chrome_Windows.lib.current();
			appw.close();
		});
	}
	,__class__: war_ui_QuitButton
});
var war_ui_ResumeButton = function(pm) {
	war_ui_TextButton.call(this);
	this.menu = pm;
	this.box.set_text("Resume Game");
	this.box.set_fontFamily("Ubuntu");
	this.box.set_fontSize(24);
	this.set_y(25);
};
$hxClasses["war.ui.ResumeButton"] = war_ui_ResumeButton;
war_ui_ResumeButton.__name__ = ["war","ui","ResumeButton"];
war_ui_ResumeButton.__super__ = war_ui_TextButton;
war_ui_ResumeButton.prototype = $extend(war_ui_TextButton.prototype,{
	click: function(e) {
		war_ui_TextButton.prototype.click.call(this,e);
		this.menu.close();
	}
	,__class__: war_ui_ResumeButton
});
var war_ui_WaveDisplay = function(s,w) {
	war_ui_HUDItem.call(this,s,w);
	this.box = new gryffin_display_TextBox();
	this.box.set_fontFamily("Ubuntu");
	this.contentRect = new tannus_geom_CRectangle(0,0,0,0);
	this.margin.top = 18;
};
$hxClasses["war.ui.WaveDisplay"] = war_ui_WaveDisplay;
war_ui_WaveDisplay.__name__ = ["war","ui","WaveDisplay"];
war_ui_WaveDisplay.__super__ = war_ui_HUDItem;
war_ui_WaveDisplay.prototype = $extend(war_ui_HUDItem.prototype,{
	update: function(s) {
		war_ui_HUDItem.prototype.update.call(this,s);
		this.set_w(this.contentRect.width * 0.85);
		this.set_h(20);
		var wave = this.world.wave;
		var count = wave.zombies.length;
		var txt = "Wave " + wave.level + "  (" + count + " / " + wave.count + ")";
		if(this.box.get_text() != txt) {
			this.box.set_text(txt);
			this.box.autoScale(this.get_w(),this.get_h());
		}
	}
	,render: function(s,c) {
		c.set_strokeStyle("#000");
		c.strokeRect(this.get_x(),this.get_y(),this.get_w(),this.get_h());
		var perc = tannus_math__$Percent_Percent_$Impl_$.percent(this.world.wave.count - this.world.wave.zombies.length,this.world.wave.count);
		c.set_fillStyle("#0F0");
		c.fillRect(this.get_x(),this.get_y(),this.get_w() * (perc / 100),this.get_h());
		c.drawComponent(this.box,0,0,this.box.get_width(),this.box.get_height(),this.get_x(),this.get_y(),this.box.get_width(),this.box.get_height());
	}
	,__class__: war_ui_WaveDisplay
});
var war_ui_ZombieHealthBar = function(z) {
	war_ui_HealthBar.call(this,z);
};
$hxClasses["war.ui.ZombieHealthBar"] = war_ui_ZombieHealthBar;
war_ui_ZombieHealthBar.__name__ = ["war","ui","ZombieHealthBar"];
war_ui_ZombieHealthBar.__super__ = war_ui_HealthBar;
war_ui_ZombieHealthBar.prototype = $extend(war_ui_HealthBar.prototype,{
	update: function(s) {
		war_ui_HealthBar.prototype.update.call(this,s);
		this.set_w(this.owner.get_w() + 0.65 * this.owner.get_w());
		this.set_h(6);
		var dw = this.get_w() - this.owner.get_w();
		this.set_x(this.owner.get_x() - dw / 2);
		this.set_y(this.owner.get_y() - this.get_h() - 4);
	}
	,__class__: war_ui_ZombieHealthBar
});
var war_utils_FPS = function() {
	gryffin_core_Entity.call(this);
	this.counts = [];
	this.lastTime = null;
	this.framesThisSecond = 0;
};
$hxClasses["war.utils.FPS"] = war_utils_FPS;
war_utils_FPS.__name__ = ["war","utils","FPS"];
war_utils_FPS.__super__ = gryffin_core_Entity;
war_utils_FPS.prototype = $extend(gryffin_core_Entity.prototype,{
	render: function(s,c) {
		var fps = Math.round(tannus_math_TMath.average(this.counts));
		var text = "FPS: " + fps;
		c.save();
		c.set_fillStyle("black");
		var mesur = c.measureText(text);
		c.set_font("12pt Monospace");
		c.fillText(text,0,20);
		c.restore();
	}
	,update: function(s) {
		var now = new Date().getTime();
		if(this.lastTime != null) {
			if(now - this.lastTime <= 1000) this.framesThisSecond++; else {
				this.counts.push(this.framesThisSecond);
				this.framesThisSecond = 0;
				this.lastTime = now;
			}
		} else this.lastTime = now;
	}
	,getNow: function() {
		return new Date().getTime();
	}
	,__class__: war_utils_FPS
});
var war_weapons_Ammo = function() {
	war_items_Item.call(this);
	this.type = "supply/ammunition";
	this.name = "Ammo";
	this.description = "used by guns";
	this.equippable = false;
	this.useType = -1;
	this.stackable = 100000;
	this.icon = gryffin_display_Image.load("../assets/images/ammo.png");
};
$hxClasses["war.weapons.Ammo"] = war_weapons_Ammo;
war_weapons_Ammo.__name__ = ["war","weapons","Ammo"];
war_weapons_Ammo.__super__ = war_items_Item;
war_weapons_Ammo.prototype = $extend(war_items_Item.prototype,{
	draw: function(w,h) {
		var c = gryffin_display_Canvas.create(w,h);
		c._ctx.get().drawComponent(this.icon,0,0,this.icon.img.naturalWidth,this.icon.img.naturalHeight,0,0,w,h);
		return c;
	}
	,base_value: function() {
		return 2;
	}
	,__class__: war_weapons_Ammo
});
var war_weapons_Projectile = function(gun,origin,angle) {
	this.pos = origin;
	this.vel = new tannus_geom_CVelocity(0,angle);
	this.size = 5;
	this.vel.speed = 10;
	this.weapon = gun;
	this.in_flight = false;
	this.targets = [];
};
$hxClasses["war.weapons.Projectile"] = war_weapons_Projectile;
war_weapons_Projectile.__name__ = ["war","weapons","Projectile"];
war_weapons_Projectile.prototype = {
	move: function() {
		var p = this.vel.get_vector();
		this.pos.moveByPoint(p);
		this.collisions();
	}
	,fire: function() {
		this.in_flight = true;
		this.targets = this.owner.stage.get("war.npc.Zombie!:dead").selected;
		while(this.in_flight) this.move();
	}
	,collisions: function() {
		var w = this.owner.game.world;
		if(!w.containsPoint(this.pos)) {
			this.in_flight = false;
			return;
		}
		var _g = 0;
		var _g1 = this.targets;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(this.hitting(e)) {
				this.hit(e);
				return;
			}
		}
	}
	,hit: function(o) {
		this.weapon.attack(o);
		this.in_flight = false;
	}
	,hitting: function(o) {
		return o.containsPoint(this.pos);
	}
	,stop: function() {
		this.in_flight = false;
	}
	,get_speed: function() {
		return this.vel.speed;
	}
	,set_speed: function(v) {
		return this.vel.speed = v;
	}
	,get_stage: function() {
		return this.owner.stage;
	}
	,__class__: war_weapons_Projectile
	,__properties__: {get_stage:"get_stage",set_speed:"set_speed",get_speed:"get_speed"}
};
var war_weapons_Bullet = function(gun,origin,angle) {
	war_weapons_Projectile.call(this,gun,origin,angle);
	this.damage = new tannus_ds__$Value_CVal(function() {
		return 0;
	});
};
$hxClasses["war.weapons.Bullet"] = war_weapons_Bullet;
war_weapons_Bullet.__name__ = ["war","weapons","Bullet"];
war_weapons_Bullet.__super__ = war_weapons_Projectile;
war_weapons_Bullet.prototype = $extend(war_weapons_Projectile.prototype,{
	hit: function(o) {
		o.hurt(this.weapon._damage.get() + this.damage.get());
		this.in_flight = false;
	}
	,mod_damage: function() {
		null;
	}
	,__class__: war_weapons_Bullet
});
var war_weapons_Weapon = function() {
	var _g = this;
	war_items_Item.call(this);
	this.type = "weapon";
	this.equippable = true;
	this.level = 1;
	this.base_damage = 1;
	this._damage = new tannus_ds__$Value_CVal(function() {
		return _g.base_damage;
	});
};
$hxClasses["war.weapons.Weapon"] = war_weapons_Weapon;
war_weapons_Weapon.__name__ = ["war","weapons","Weapon"];
war_weapons_Weapon.__super__ = war_items_Item;
war_weapons_Weapon.prototype = $extend(war_items_Item.prototype,{
	canPickup: function(o) {
		return js_Boot.__instanceof(o,war_player_Avatar);
	}
	,draw: function(w,h) {
		var icon = gryffin_display_Image.load("../assets/images/weapons/" + this.iconName + ".png");
		var c = gryffin_display_Canvas.create(w,h);
		c._ctx.get().drawComponent(icon,0,0,icon.img.naturalWidth,icon.img.naturalHeight,0,0,w,h);
		if(!icon.img.complete) icon.ready.once(function() {
			c._ctx.get().drawComponent(icon,0,0,icon.img.naturalWidth,icon.img.naturalHeight,0,0,w,h);
		});
		return c;
	}
	,attack: function(victim) {
		victim.hurt(this._damage.get());
	}
	,levelUpCost: function() {
		return 75 + (this.level - 1) * 20;
	}
	,data: function() {
		var o = war_items_Item.prototype.data.call(this);
		{
			Reflect.setProperty(o,"level",this.level);
			Reflect.getProperty(o,"level");
		}
		{
			Reflect.setProperty(o,"base_damage",this.base_damage);
			Reflect.getProperty(o,"base_damage");
		}
		{
			Reflect.setProperty(o,"iconName",this.iconName);
			Reflect.getProperty(o,"iconName");
		}
		return o;
	}
	,hxUnserialize: function(u) {
		var _g = this;
		war_items_Item.prototype.hxUnserialize.call(this,u);
		this._damage = new tannus_ds__$Value_CVal(function() {
			return _g.base_damage;
		});
	}
	,get_damage: function() {
		return this._damage.get();
	}
	,__class__: war_weapons_Weapon
	,__properties__: $extend(war_items_Item.prototype.__properties__,{get_damage:"get_damage"})
});
var war_weapons_Gun = function() {
	war_weapons_Weapon.call(this);
	this.type = "" + this.type + "/gun";
	this.fire_delay = 0;
	this.last_fire = null;
	this.projectile_class = war_weapons_Projectile;
	this.mod_damage();
};
$hxClasses["war.weapons.Gun"] = war_weapons_Gun;
war_weapons_Gun.__name__ = ["war","weapons","Gun"];
war_weapons_Gun.__super__ = war_weapons_Weapon;
war_weapons_Gun.prototype = $extend(war_weapons_Weapon.prototype,{
	usable: function() {
		return this.get_sinceLastFire() >= this.fire_delay && this.hasAmmo();
	}
	,hasAmmo: function() {
		var amm = this.ammoItem();
		return amm != null && amm.count > 0;
	}
	,ammoItem: function() {
		if(this.storage != null) return this.storage.slotByType("supply/ammunition").get_item(); else return null;
	}
	,ammoCount: function() {
		var ai = this.ammoItem();
		if(ai == null) return 0; else return ai.count;
	}
	,'use': function(data) {
		var ammoi = this.ammoItem();
		ammoi.count--;
		if(ammoi.count == 0) this.storage.itemSlot(ammoi).set_item(null);
		var proj = this.createProjectile(data);
		proj.owner = data.user;
		proj.fire();
		this.last_fire = new Date().getTime();
	}
	,hudText: function() {
		return ["lvl " + this.level + " " + this.name,"ammo: " + this.ammoCount()].join("\n");
	}
	,createProjectile: function(data) {
		var angle = data.origin.angleTo(data.target);
		var p = Type.createInstance(this.projectile_class,[this,data.origin,angle]);
		return p;
	}
	,mod_damage: function() {
		var _g = this;
		this._damage.modify(function(v) {
			if(_g.storage != null) {
				var inv = _g.storage;
				var player = inv.owner;
				return v + 5 * (_g.level - 1 + (player.skill._lvl - 1));
			}
			return v + 5 * (_g.level - 1);
		});
	}
	,data: function() {
		var o = war_weapons_Weapon.prototype.data.call(this);
		{
			Reflect.setProperty(o,"fire_delay",this.fire_delay);
			Reflect.getProperty(o,"fire_delay");
		}
		var value = Type.getClassName(this.projectile_class);
		Reflect.setProperty(o,"projectile_class",value);
		Reflect.getProperty(o,"projectile_class");
		return o;
	}
	,apply: function(o) {
		war_weapons_Weapon.prototype.apply.call(this,o);
		this.projectile_class = Type.resolveClass((function($this) {
			var $r;
			var this1 = Reflect.getProperty(o,"projectile_class");
			$r = this1 != null?this1:this1;
			return $r;
		}(this)));
	}
	,hxUnserialize: function(u) {
		war_weapons_Weapon.prototype.hxUnserialize.call(this,u);
		gryffin_Tools.defer((function(f) {
			return function() {
				f();
			};
		})($bind(this,this.mod_damage)));
	}
	,get_now: function() {
		return new Date().getTime();
	}
	,get_sinceLastFire: function() {
		if(this.last_fire != null) return new Date().getTime() - this.last_fire; else return 0;
	}
	,get_ammo: function() {
		return this.ammoCount();
	}
	,__class__: war_weapons_Gun
	,__properties__: $extend(war_weapons_Weapon.prototype.__properties__,{get_ammo:"get_ammo",get_sinceLastFire:"get_sinceLastFire",get_now:"get_now"})
});
var war_weapons_Pistol = function() {
	war_weapons_Gun.call(this);
	this.type = "" + this.type + "+pistol";
	this.name = "Pistol";
	this.description = "A generic handgun";
	this.base_damage = 18;
	this.iconName = "pistol";
	this.projectile_class = war_weapons_Bullet;
};
$hxClasses["war.weapons.Pistol"] = war_weapons_Pistol;
war_weapons_Pistol.__name__ = ["war","weapons","Pistol"];
war_weapons_Pistol.__super__ = war_weapons_Gun;
war_weapons_Pistol.prototype = $extend(war_weapons_Gun.prototype,{
	base_value: function() {
		return Math.floor(250 + 75 * (this.level - 1));
	}
	,__class__: war_weapons_Pistol
});
var war_weapons_WeaponLevelPurchase = function(w) {
	war_ds_Purchase.call(this);
	this.weapon = w;
	this.name = "Level Up ($" + w.levelUpCost() + ")";
	this.description = "advance " + w.name + " to the next level";
};
$hxClasses["war.weapons.WeaponLevelPurchase"] = war_weapons_WeaponLevelPurchase;
war_weapons_WeaponLevelPurchase.__name__ = ["war","weapons","WeaponLevelPurchase"];
war_weapons_WeaponLevelPurchase.__super__ = war_ds_Purchase;
war_weapons_WeaponLevelPurchase.prototype = $extend(war_ds_Purchase.prototype,{
	canAfford: function(p) {
		return p.money >= this.weapon.levelUpCost();
	}
	,make: function(p) {
		p.money -= this.weapon.levelUpCost();
		this.weapon.level++;
	}
	,__class__: war_weapons_WeaponLevelPurchase
});
var war_world_Chunk = function(w,x,y,size) {
	this.world = w;
	this.x = x;
	this.y = y;
	this.size = size;
	this.generated = false;
};
$hxClasses["war.world.Chunk"] = war_world_Chunk;
war_world_Chunk.__name__ = ["war","world","Chunk"];
war_world_Chunk.prototype = {
	generate: function() {
		this.tiles = new tannus_ds_Grid(this.size,this.size);
		this.__generateDefault();
		this.canvas = gryffin_display_Canvas.create(Math.floor(this.world.get_w()),Math.floor(this.world.get_h()));
		var $it0 = this.tiles.iterator();
		while( $it0.hasNext() ) {
			var tile = $it0.next();
			tile.left = this.tiles.valueAt(new tannus_ds_GridPos(tile.data.x,tile.data.y).left());
			tile.right = this.tiles.valueAt(new tannus_ds_GridPos(tile.data.x,tile.data.y).right());
			tile.top = this.tiles.valueAt(new tannus_ds_GridPos(tile.data.x,tile.data.y).top());
			tile.bottom = this.tiles.valueAt(new tannus_ds_GridPos(tile.data.x,tile.data.y).bottom());
		}
		var $it1 = this.tiles.iterator();
		while( $it1.hasNext() ) {
			var tile1 = $it1.next();
			this.updateTile(tile1);
		}
		this.generated = true;
		this.world.on("resize",$bind(this,this.onresize));
	}
	,__generateDefault: function() {
		var $it0 = this.tiles.positions();
		while( $it0.hasNext() ) {
			var pos = $it0.next();
			var t = this.tiles.at(pos);
			var tile = new war_world_Tile(this);
			tile.data.x = pos._x;
			tile.data.y = pos._y;
			t.set(tile);
		}
	}
	,updateTile: function(tile) {
		tile.render(this.canvas);
	}
	,tileAt: function(x,y) {
		var ix = Math.floor(x / this.world.get_tileWidth());
		var iy = Math.floor(y / this.world.get_tileHeight());
		var $it0 = this.tiles.iterator();
		while( $it0.hasNext() ) {
			var tile = $it0.next();
			if(tile.data.x == ix && tile.data.y == iy) return tile;
		}
		return null;
	}
	,encode: function() {
		var data;
		var this1;
		this1 = tannus_io_impl_JavaScriptBinary.alloc(0);
		data = this1;
		var $it0 = this.tiles.iterator();
		while( $it0.hasNext() ) {
			var tile = $it0.next();
			data.append(tile.data.encode());
		}
		return data;
	}
	,onresize: function(e) {
		var csize = Math.floor(this.world.get_tileWidth() * this.size);
		this.canvas.resize(csize,csize);
		var $it0 = this.tiles.iterator();
		while( $it0.hasNext() ) {
			var t = $it0.next();
			t.render(this.canvas);
		}
	}
	,get_width: function() {
		return this.world.get_w();
	}
	,get_height: function() {
		return this.world.get_h();
	}
	,get_tileWidth: function() {
		return this.world.get_tileWidth();
	}
	,get_tileHeight: function() {
		return this.world.get_tileHeight();
	}
	,get_dataSize: function() {
		return this.size * this.size * 6;
	}
	,__class__: war_world_Chunk
	,__properties__: {get_dataSize:"get_dataSize",get_tileHeight:"get_tileHeight",get_tileWidth:"get_tileWidth",get_height:"get_height",get_width:"get_width"}
};
var war_world_ChunkGenerator = function(c) {
	this.chunk = c;
	this.grid = this.chunk.tiles;
	this.r = new tannus_math_Random();
};
$hxClasses["war.world.ChunkGenerator"] = war_world_ChunkGenerator;
war_world_ChunkGenerator.__name__ = ["war","world","ChunkGenerator"];
war_world_ChunkGenerator.prototype = {
	generate: function() {
		var hasWater = true;
		if(hasWater) {
			var start = this.grid.get(this.r.randint(0,this.grid.w),this.r.randint(0,this.grid.h));
			var full = this.withinRadiusOf(start,5);
			start.set_type(war_world_Terrain.Water);
			var _g = 0;
			while(_g < full.length) {
				var item2 = full[_g];
				++_g;
				item2.set_type(war_world_Terrain.Water);
			}
			var edges = full.filter(function(item) {
				return item.touching(war_world_Terrain.Grass);
			});
			var toGrow = this.r.sample(edges);
			var _g1 = 0;
			while(_g1 < toGrow.length) {
				var tile1 = toGrow[_g1];
				++_g1;
				var dicks = this.grow(tile1,this.r.randint(1,7),0);
				var _g11 = 0;
				while(_g11 < dicks.length) {
					var item3 = dicks[_g11];
					++_g11;
					item3.set_type(war_world_Terrain.Water);
				}
			}
			full = this.getAllOfType(war_world_Terrain.Water);
			var grassByWater = tannus_ds_ArrayTools.unique(tannus_ds_ArrayTools.flatten(full.map(function(item1) {
				return item1.neighborsOfType(war_world_Terrain.Grass);
			})));
			var noms = tannus_ds_ArrayTools.splitfilter(grassByWater,function(tile) {
				return tile.surroundedBy(war_world_Terrain.Water);
			});
			var _g2 = 0;
			var _g12 = noms.pass;
			while(_g2 < _g12.length) {
				var item4 = _g12[_g2];
				++_g2;
				item4.set_type(war_world_Terrain.Water);
			}
			var beach = noms.fail;
			beach = tannus_ds_ArrayTools.flatten(beach.map(function(item5) {
				return item5.neighborsOfType(war_world_Terrain.Grass);
			}));
			var _g3 = 0;
			while(_g3 < beach.length) {
				var item6 = beach[_g3];
				++_g3;
				item6.set_type(war_world_Terrain.Sand);
			}
		}
	}
	,grow: function(tile,max_recursion,level,collection) {
		if(collection == null) collection = [];
		if(level == max_recursion) return collection; else {
			collection.push(tile);
			var friends = tile.neighborhood();
			var nextGrow;
			do nextGrow = this.r.choice(friends); while(Lambda.has(collection,nextGrow));
			this.grow(nextGrow,max_recursion,++level,collection);
			return collection;
		}
	}
	,withinRadiusOf: function(t,dis) {
		var results = [];
		var origin = new tannus_geom_TPoint(t.data.x,t.data.y,0);
		var surrounding;
		var surrounding1 = null;
		surrounding1 = function(tile) {
			if(tile != t) results.push(tile);
			var friends = tile.neighbors();
			var _g = 0;
			while(_g < friends.length) {
				var n = friends[_g];
				++_g;
				if(!Lambda.has(results,n)) {
					var npos = new tannus_geom_TPoint(n.data.x,n.data.y,0);
					if(npos.distanceFrom(origin) <= dis) surrounding1(n);
				}
			}
		};
		surrounding = surrounding1;
		surrounding(t);
		return results;
	}
	,getAllOfType: function(type) {
		var res = [];
		var $it0 = this.grid.iterator();
		while( $it0.hasNext() ) {
			var t = $it0.next();
			if(Type.enumEq(t.data.type,type)) res.push(t);
		}
		return res;
	}
	,__class__: war_world_ChunkGenerator
};
var war_world_Terrain = $hxClasses["war.world.Terrain"] = { __ename__ : ["war","world","Terrain"], __constructs__ : ["Grass","Dirt","Stone","Sand","Water"] };
war_world_Terrain.Grass = ["Grass",0];
war_world_Terrain.Grass.toString = $estr;
war_world_Terrain.Grass.__enum__ = war_world_Terrain;
war_world_Terrain.Dirt = ["Dirt",1];
war_world_Terrain.Dirt.toString = $estr;
war_world_Terrain.Dirt.__enum__ = war_world_Terrain;
war_world_Terrain.Stone = ["Stone",2];
war_world_Terrain.Stone.toString = $estr;
war_world_Terrain.Stone.__enum__ = war_world_Terrain;
war_world_Terrain.Sand = ["Sand",3];
war_world_Terrain.Sand.toString = $estr;
war_world_Terrain.Sand.__enum__ = war_world_Terrain;
war_world_Terrain.Water = ["Water",4];
war_world_Terrain.Water.toString = $estr;
war_world_Terrain.Water.__enum__ = war_world_Terrain;
var war_world_TerrainTools = function() { };
$hxClasses["war.world.TerrainTools"] = war_world_TerrainTools;
war_world_TerrainTools.__name__ = ["war","world","TerrainTools"];
war_world_TerrainTools.color = function(t) {
	switch(t[1]) {
	case 0:
		return new tannus_graphics__$Color_TColor(0,128,0,null);
	case 1:
		return new tannus_graphics__$Color_TColor(51,26,0,null);
	case 2:
		return new tannus_graphics__$Color_TColor(64,64,64,null);
	case 3:
		var min = new tannus_graphics__$Color_TColor(153,102,0,null);
		var max = new tannus_graphics__$Color_TColor(255,255,102,null);
		return max;
	case 4:
		var min1 = new tannus_graphics__$Color_TColor(0,153,255,null);
		var max1 = new tannus_graphics__$Color_TColor(0,0,255,null);
		return min1;
	}
};
var war_world_Tile = function(c) {
	gryffin_core_EventDispatcher.call(this);
	this.chunk = c;
	this.data = new war_world_TileData();
};
$hxClasses["war.world.Tile"] = war_world_Tile;
war_world_Tile.__name__ = ["war","world","Tile"];
war_world_Tile.__super__ = gryffin_core_EventDispatcher;
war_world_Tile.prototype = $extend(gryffin_core_EventDispatcher.prototype,{
	update: function() {
		this.chunk.updateTile(this);
	}
	,render: function(canvas) {
		var c = canvas._ctx.get();
		c.save();
		c.set_fillStyle((function($this) {
			var $r;
			var this1 = war_world_TerrainTools.color($this.data.type);
			$r = this1.toString();
			return $r;
		}(this)));
		c.beginPath();
		c.rect(this.data.x * this.chunk.world.get_tileWidth(),this.data.y * this.chunk.world.get_tileHeight(),this.chunk.world.get_tileWidth(),this.chunk.world.get_tileHeight());
		c.closePath();
		c.fill();
		c.restore();
	}
	,contains: function(x,y) {
		var inX = x > this.data.x * this.chunk.world.get_tileWidth() && x < this.data.x * this.chunk.world.get_tileWidth() + this.chunk.world.get_tileWidth();
		var inY = y > this.data.y * this.chunk.world.get_tileHeight() && y < this.data.y * this.chunk.world.get_tileHeight() + this.chunk.world.get_tileHeight();
		return inX && inY;
	}
	,neighbors: function() {
		var res = [];
		if(this.left != null) res.push(this.left);
		if(this.right != null) res.push(this.right);
		if(this.top != null) res.push(this.top);
		if(this.bottom != null) res.push(this.bottom);
		return res;
	}
	,neighborhood: function() {
		var res = [];
		if(this.left != null) res.push(this.left);
		if(this.right != null) res.push(this.right);
		if(this.top != null) res = res.concat([this.top,this.top.left,this.top.right]);
		if(this.bottom != null) res = res.concat([this.bottom,this.bottom.left,this.bottom.right]);
		return res.filter(function(item) {
			return item != null;
		});
	}
	,touching: function(t) {
		var _g = 0;
		var _g1 = this.neighbors();
		while(_g < _g1.length) {
			var tile = _g1[_g];
			++_g;
			if(Type.enumEq(tile.data.type,t)) return true;
		}
		return false;
	}
	,surroundedBy: function(type) {
		if(this.left != null && this.right != null) return Type.enumEq(this.left.data.type,type) && Type.enumEq(this.right.data.type,type); else if(this.top != null && this.bottom != null) return Type.enumEq(this.top.data.type,type) && Type.enumEq(this.bottom.data.type,type); else return false;
	}
	,neighborsOfType: function(t) {
		return this.neighborhood().filter(function(item) {
			return Type.enumEq(item.data.type,t);
		});
	}
	,neighborsNotOfType: function(types) {
		return this.neighborhood().filter(function(tile) {
			var _g = 0;
			while(_g < types.length) {
				var t = types[_g];
				++_g;
				if(Type.enumEq(t,tile.data.type)) return false;
			}
			return true;
		});
	}
	,encode: function() {
		return this.data.encode();
	}
	,decode: function(b) {
		this.data.decode(b);
		this.update();
	}
	,get_x: function() {
		return this.data.x;
	}
	,set_x: function(v) {
		return this.data.x = v;
	}
	,get_y: function() {
		return this.data.y;
	}
	,set_y: function(v) {
		return this.data.y = v;
	}
	,get_chunkX: function() {
		return this.data.x * this.chunk.world.get_tileWidth();
	}
	,get_chunkY: function() {
		return this.data.y * this.chunk.world.get_tileHeight();
	}
	,get_pos: function() {
		return new tannus_ds_GridPos(this.data.x,this.data.y);
	}
	,get_solid: function() {
		return this.data.solid;
	}
	,set_solid: function(v) {
		return this.data.solid = v;
	}
	,get_breakable: function() {
		return this.data.breakable;
	}
	,set_breakable: function(v) {
		return this.data.breakable = v;
	}
	,get_health: function() {
		return this.data.health;
	}
	,set_health: function(v) {
		return this.data.health = v;
	}
	,get_type: function() {
		return this.data.type;
	}
	,set_type: function(v) {
		var _t = this.data.type;
		this.data.type = v;
		if(!Type.enumEq(v,_t)) this.update();
		return v;
	}
	,__class__: war_world_Tile
	,__properties__: {set_type:"set_type",get_type:"get_type",set_health:"set_health",get_health:"get_health",set_breakable:"set_breakable",get_breakable:"get_breakable",set_solid:"set_solid",get_solid:"get_solid",get_pos:"get_pos",get_chunkY:"get_chunkY",get_chunkX:"get_chunkX",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"}
});
var war_world_TileData = function() {
	this.x = 0;
	this.y = 0;
	this.solid = false;
	this.breakable = false;
	this.health = 100;
	this.type = war_world_Terrain.Grass;
};
$hxClasses["war.world.TileData"] = war_world_TileData;
war_world_TileData.__name__ = ["war","world","TileData"];
war_world_TileData.prototype = {
	encode: function() {
		var data;
		var this1;
		this1 = tannus_io_impl_JavaScriptBinary.alloc(6);
		data = this1;
		data.position = 0;
		data.set(data.position++,this.x);
		data.set(data.position++,this.y);
		data.set(data.position++,this.type[1]);
		data.set(data.position++,this.solid?1:0);
		data.set(data.position++,this.breakable?1:0);
		data.set(data.position++,this.health);
		return data;
	}
	,decode: function(b) {
		b.position = 0;
		this.x = b.get(b.position++);
		this.y = b.get(b.position++);
		var index = b.get(b.position++);
		this.type = Type.createEnumIndex(war_world_Terrain,index,null);
		var this1 = b.get(b.position++);
		this.solid = this1 == 1;
		var this2 = b.get(b.position++);
		this.breakable = this2 == 1;
		this.health = b.get(b.position++);
	}
	,__class__: war_world_TileData
};
var war_world_World = function(g,size) {
	war_core_Ent.call(this);
	this.game = g;
	this.priority = -1;
	this.size = size;
	this.chunk = new war_world_Chunk(this,0,0,size);
	this.updated = false;
	this.firstUpdate = new tannus_io_VoidSignal();
	this.wave = new war_npc_Wave(this,1);
	this.addSibling(this.wave);
	g.stage.on("resize",$bind(this,this.onresize));
};
$hxClasses["war.world.World"] = war_world_World;
war_world_World.__name__ = ["war","world","World"];
war_world_World.__super__ = war_core_Ent;
war_world_World.prototype = $extend(war_core_Ent.prototype,{
	init: function(s) {
		this.set_w(this.set_h(s.canvas.height));
	}
	,render: function(s,c) {
		if(this.chunk.generated) c.drawComponent(this.chunk.canvas,0,0,this.chunk.canvas.canvas.width,this.chunk.canvas.canvas.height,this.get_x(),this.get_y(),this.get_w(),this.get_h());
	}
	,update: function(s) {
		this.set_w(this.set_h(Math.ceil(this.stage.canvas.height / this.size) * this.size));
		this.set_x(s.canvas.width / 2 - this.get_w() / 2);
		if(!this.updated) {
			this.firstUpdate.call();
			this.updated = true;
		}
		var lastResize = s.mostRecentOccurrenceTime("resize");
		var now = new Date().getTime();
		var since = now - lastResize;
		if(since >= 500) {
			if(!this.chunk.generated) this.chunk.generate();
		}
	}
	,onresize: function(e) {
		var osize = Math.ceil(e.delta[1][1] / this.size) * this.size;
		var nsize = Math.ceil(this.stage.canvas.height / this.size) * this.size;
		var event = new tannus_events_ResizeEvent([osize,osize],[nsize,nsize]);
		this.dispatch("resize",event);
	}
	,tileAt: function(tx,ty) {
		var p = new tannus_geom_TPoint(tx,ty,0);
		if(this.containsPoint(p)) {
			var p1 = this.get_pos();
			p.iminusPoint(p1);
			return this.chunk.tileAt(p.get_x(),p.get_y());
		} else return null;
	}
	,state: function() {
		return new war_world_WorldData(this);
	}
	,patch: function(data) {
		data.apply(this);
	}
	,get_tileWidth: function() {
		return Math.ceil(this.stage.canvas.height / this.size);
	}
	,get_tileHeight: function() {
		return Math.ceil(this.stage.canvas.height / this.size);
	}
	,__class__: war_world_World
	,__properties__: $extend(war_core_Ent.prototype.__properties__,{get_tileHeight:"get_tileHeight",get_tileWidth:"get_tileWidth"})
});
var war_world_WorldData = function(w) {
	this.wave = w.wave.level;
};
$hxClasses["war.world.WorldData"] = war_world_WorldData;
war_world_WorldData.__name__ = ["war","world","WorldData"];
war_world_WorldData.prototype = {
	hxSerialize: function(s) {
		var w = (function(f) {
			return function(v) {
				f(v);
			};
		})($bind(s,s.serialize));
		w(this.wave);
	}
	,hxUnserialize: function(u) {
		var n;
		var f1 = (function(f) {
			return function() {
				return f();
			};
		})($bind(u,u.unserialize));
		n = f1;
		this.wave = n();
	}
	,apply: function(w) {
		w.wave.stop();
		w.wave = new war_npc_Wave(w,this.wave);
		w.addSibling(w.wave);
	}
	,__class__: war_world_WorldData
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
function $arrayPushClosure(a) { return function(x) { a.push(x); }; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
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
var q = window.jQuery;
var js = js || {}
js.JQuery = q;
var ArrayBuffer = typeof(window) != "undefined" && window.ArrayBuffer || typeof(global) != "undefined" && global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = typeof(window) != "undefined" && window.DataView || typeof(global) != "undefined" && global.DataView || js_html_compat_DataView;
var Uint8Array = typeof(window) != "undefined" && window.Uint8Array || typeof(global) != "undefined" && global.Uint8Array || js_html_compat_Uint8Array._new;
chrome_Windows.lib = chrome.app.window;
gryffin_Tools.used_idents = [];
gryffin_core_Stage.selectorCache = new haxe_ds_StringMap();
gryffin_core_StageFiller.addedStyleSheet = false;
gryffin_display_Image.registry = new haxe_ds_StringMap();
gryffin_fx_Animations.registry = [];
gryffin_ui_ContextMenuItem.__meta__ = { statics : { click : { on : ["click"]}}};
haxe_Serializer.USE_CACHE = false;
haxe_Serializer.USE_ENUM_INDEX = false;
haxe_Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
tannus_css_vals__$Unit_Unit_$Impl_$.Em = "em";
tannus_css_vals__$Unit_Unit_$Impl_$.Ex = "ex";
tannus_css_vals__$Unit_Unit_$Impl_$.Ch = "ch";
tannus_css_vals__$Unit_Unit_$Impl_$.Rem = "rem";
tannus_css_vals__$Unit_Unit_$Impl_$.Vpw = "vw";
tannus_css_vals__$Unit_Unit_$Impl_$.Vph = "vh";
tannus_css_vals__$Unit_Unit_$Impl_$.Perc = "%";
tannus_css_vals__$Unit_Unit_$Impl_$.Cm = "cm";
tannus_css_vals__$Unit_Unit_$Impl_$.Mm = "mm";
tannus_css_vals__$Unit_Unit_$Impl_$.In = "in";
tannus_css_vals__$Unit_Unit_$Impl_$.Px = "px";
tannus_css_vals__$Unit_Unit_$Impl_$.Pt = "pt";
tannus_css_vals__$Unit_Unit_$Impl_$.Pc = "pc";
tannus_dom_CData.DATAKEY = "__tandata";
tannus_dom_CElement.DATAKEY = "__tandata";
tannus_ds_Memory.state = 0;
tannus_ds_Memory.used = [];
tannus_events__$Key_Key_$Impl_$.CapsLock = 20;
tannus_events__$Key_Key_$Impl_$.NumpadDot = 110;
tannus_events__$Key_Key_$Impl_$.NumpadForwardSlash = 111;
tannus_events__$Key_Key_$Impl_$.Command = 91;
tannus_events__$Key_Key_$Impl_$.ForwardSlash = 191;
tannus_events__$Key_Key_$Impl_$.Enter = 13;
tannus_events__$Key_Key_$Impl_$.Shift = 16;
tannus_events__$Key_Key_$Impl_$.Space = 32;
tannus_events__$Key_Key_$Impl_$.PageUp = 33;
tannus_events__$Key_Key_$Impl_$.Backspace = 8;
tannus_events__$Key_Key_$Impl_$.Tab = 9;
tannus_events__$Key_Key_$Impl_$.NumpadPlus = 107;
tannus_events__$Key_Key_$Impl_$.Dot = 190;
tannus_events__$Key_Key_$Impl_$.OpenBracket = 219;
tannus_events__$Key_Key_$Impl_$.Home = 36;
tannus_events__$Key_Key_$Impl_$.Left = 37;
tannus_events__$Key_Key_$Impl_$.Equals = 187;
tannus_events__$Key_Key_$Impl_$.Apostrophe = 222;
tannus_events__$Key_Key_$Impl_$.Right = 39;
tannus_events__$Key_Key_$Impl_$.CloseBracket = 221;
tannus_events__$Key_Key_$Impl_$.NumLock = 144;
tannus_events__$Key_Key_$Impl_$.BackSlash = 220;
tannus_events__$Key_Key_$Impl_$.PageDown = 34;
tannus_events__$Key_Key_$Impl_$.End = 35;
tannus_events__$Key_Key_$Impl_$.Minus = 189;
tannus_events__$Key_Key_$Impl_$.SemiColon = 186;
tannus_events__$Key_Key_$Impl_$.Down = 40;
tannus_events__$Key_Key_$Impl_$.Esc = 27;
tannus_events__$Key_Key_$Impl_$.Comma = 188;
tannus_events__$Key_Key_$Impl_$.Delete = 46;
tannus_events__$Key_Key_$Impl_$.NumpadAsterisk = 106;
tannus_events__$Key_Key_$Impl_$.BackTick = 192;
tannus_events__$Key_Key_$Impl_$.Ctrl = 17;
tannus_events__$Key_Key_$Impl_$.Insert = 45;
tannus_events__$Key_Key_$Impl_$.ScrollLock = 145;
tannus_events__$Key_Key_$Impl_$.NumpadMinus = 109;
tannus_events__$Key_Key_$Impl_$.Up = 38;
tannus_events__$Key_Key_$Impl_$.Alt = 18;
tannus_events__$Key_Key_$Impl_$.LetterA = 65;
tannus_events__$Key_Key_$Impl_$.LetterB = 66;
tannus_events__$Key_Key_$Impl_$.LetterC = 67;
tannus_events__$Key_Key_$Impl_$.LetterD = 68;
tannus_events__$Key_Key_$Impl_$.LetterE = 69;
tannus_events__$Key_Key_$Impl_$.LetterF = 70;
tannus_events__$Key_Key_$Impl_$.LetterG = 71;
tannus_events__$Key_Key_$Impl_$.LetterH = 72;
tannus_events__$Key_Key_$Impl_$.LetterI = 73;
tannus_events__$Key_Key_$Impl_$.LetterJ = 74;
tannus_events__$Key_Key_$Impl_$.LetterK = 75;
tannus_events__$Key_Key_$Impl_$.LetterL = 76;
tannus_events__$Key_Key_$Impl_$.LetterM = 77;
tannus_events__$Key_Key_$Impl_$.LetterN = 78;
tannus_events__$Key_Key_$Impl_$.LetterO = 79;
tannus_events__$Key_Key_$Impl_$.LetterP = 80;
tannus_events__$Key_Key_$Impl_$.LetterQ = 81;
tannus_events__$Key_Key_$Impl_$.LetterR = 82;
tannus_events__$Key_Key_$Impl_$.LetterS = 83;
tannus_events__$Key_Key_$Impl_$.LetterT = 84;
tannus_events__$Key_Key_$Impl_$.LetterU = 85;
tannus_events__$Key_Key_$Impl_$.LetterV = 86;
tannus_events__$Key_Key_$Impl_$.LetterW = 87;
tannus_events__$Key_Key_$Impl_$.LetterX = 88;
tannus_events__$Key_Key_$Impl_$.LetterY = 89;
tannus_events__$Key_Key_$Impl_$.LetterZ = 90;
tannus_events__$Key_Key_$Impl_$.raw = { };
tannus_geom_Matrix.__identity = new tannus_geom_Matrix();
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
tannus_sys_Mimes.initted = false;
tannus_sys_Mimes.primitive = { '3dml' : "text/vnd.in3d.3dml", '3ds' : "image/x-3ds", '3g2' : "video/3gpp2", '3gp' : "video/3gpp", '7z' : "application/x-7z-compressed", 'aab' : "application/x-authorware-bin", 'aac' : "audio/x-aac", 'aam' : "application/x-authorware-map", 'aas' : "application/x-authorware-seg", 'abw' : "application/x-abiword", 'ac' : "application/pkix-attr-cert", 'acc' : "application/vnd.americandynamics.acc", 'ace' : "application/x-ace-compressed", 'acu' : "application/vnd.acucobol", 'acutc' : "application/vnd.acucorp", 'adp' : "audio/adpcm", 'aep' : "application/vnd.audiograph", 'afm' : "application/x-font-type1", 'afp' : "application/vnd.ibm.modcap", 'ahead' : "application/vnd.ahead.space", 'ai' : "application/postscript", 'aif' : "audio/x-aiff", 'aifc' : "audio/x-aiff", 'aiff' : "audio/x-aiff", 'air' : "application/vnd.adobe.air-application-installer-package+zip", 'ait' : "application/vnd.dvb.ait", 'ami' : "application/vnd.amiga.ami", 'apk' : "application/vnd.android.package-archive", 'appcache' : "text/cache-manifest", 'application' : "application/x-ms-application", 'apr' : "application/vnd.lotus-approach", 'arc' : "application/x-freearc", 'asa' : "text/plain", 'asax' : "application/octet-stream", 'asc' : "application/pgp-signature", 'ascx' : "text/plain", 'asf' : "video/x-ms-asf", 'ashx' : "text/plain", 'asm' : "text/x-asm", 'asmx' : "text/plain", 'aso' : "application/vnd.accpac.simply.aso", 'asp' : "text/plain", 'aspx' : "text/plain", 'asx' : "video/x-ms-asf", 'atc' : "application/vnd.acucorp", 'atom' : "application/atom+xml", 'atomcat' : "application/atomcat+xml", 'atomsvc' : "application/atomsvc+xml", 'atx' : "application/vnd.antix.game-component", 'au' : "audio/basic", 'avi' : "video/x-msvideo", 'aw' : "application/applixware", 'axd' : "text/plain", 'azf' : "application/vnd.airzip.filesecure.azf", 'azs' : "application/vnd.airzip.filesecure.azs", 'azw' : "application/vnd.amazon.ebook", 'bat' : "application/x-msdownload", 'bcpio' : "application/x-bcpio", 'bdf' : "application/x-font-bdf", 'bdm' : "application/vnd.syncml.dm+wbxml", 'bed' : "application/vnd.realvnc.bed", 'bh2' : "application/vnd.fujitsu.oasysprs", 'bin' : "application/octet-stream", 'blb' : "application/x-blorb", 'blorb' : "application/x-blorb", 'bmi' : "application/vnd.bmi", 'bmp' : "image/bmp", 'book' : "application/vnd.framemaker", 'box' : "application/vnd.previewsystems.box", 'boz' : "application/x-bzip2", 'bpk' : "application/octet-stream", 'btif' : "image/prs.btif", 'bz' : "application/x-bzip", 'bz2' : "application/x-bzip2", 'c' : "text/x-c", 'c11amc' : "application/vnd.cluetrust.cartomobile-config", 'c11amz' : "application/vnd.cluetrust.cartomobile-config-pkg", 'c4d' : "application/vnd.clonk.c4group", 'c4f' : "application/vnd.clonk.c4group", 'c4g' : "application/vnd.clonk.c4group", 'c4p' : "application/vnd.clonk.c4group", 'c4u' : "application/vnd.clonk.c4group", 'cab' : "application/vnd.ms-cab-compressed", 'caf' : "audio/x-caf", 'cap' : "application/vnd.tcpdump.pcap", 'car' : "application/vnd.curl.car", 'cat' : "application/vnd.ms-pki.seccat", 'cb7' : "application/x-cbr", 'cba' : "application/x-cbr", 'cbr' : "application/x-cbr", 'cbt' : "application/x-cbr", 'cbz' : "application/x-cbr", 'cc' : "text/x-c", 'cct' : "application/x-director", 'ccxml' : "application/ccxml+xml", 'cdbcmsg' : "application/vnd.contact.cmsg", 'cdf' : "application/x-netcdf", 'cdkey' : "application/vnd.mediastation.cdkey", 'cdmia' : "application/cdmi-capability", 'cdmic' : "application/cdmi-container", 'cdmid' : "application/cdmi-domain", 'cdmio' : "application/cdmi-object", 'cdmiq' : "application/cdmi-queue", 'cdx' : "chemical/x-cdx", 'cdxml' : "application/vnd.chemdraw+xml", 'cdy' : "application/vnd.cinderella", 'cer' : "application/pkix-cert", 'cfc' : "application/x-coldfusion", 'cfm' : "application/x-coldfusion", 'cfs' : "application/x-cfs-compressed", 'cgm' : "image/cgm", 'chat' : "application/x-chat", 'chm' : "application/vnd.ms-htmlhelp", 'chrt' : "application/vnd.kde.kchart", 'cif' : "chemical/x-cif", 'cii' : "application/vnd.anser-web-certificate-issue-initiation", 'cil' : "application/vnd.ms-artgalry", 'cla' : "application/vnd.claymore", 'class' : "application/java-vm", 'clkk' : "application/vnd.crick.clicker.keyboard", 'clkp' : "application/vnd.crick.clicker.palette", 'clkt' : "application/vnd.crick.clicker.template", 'clkw' : "application/vnd.crick.clicker.wordbank", 'clkx' : "application/vnd.crick.clicker", 'clp' : "application/x-msclip", 'cmc' : "application/vnd.cosmocaller", 'cmdf' : "chemical/x-cmdf", 'cml' : "chemical/x-cml", 'cmp' : "application/vnd.yellowriver-custom-menu", 'cmx' : "image/x-cmx", 'cod' : "application/vnd.rim.cod", 'coffee' : "text/coffeescript", 'com' : "application/x-msdownload", 'conf' : "text/plain", 'cpio' : "application/x-cpio", 'cpp' : "text/x-c", 'cpt' : "application/mac-compactpro", 'crd' : "application/x-mscardfile", 'crl' : "application/pkix-crl", 'crt' : "application/x-x509-ca-cert", 'crx' : "application/octet-stream", 'cryptonote' : "application/vnd.rig.cryptonote", 'cs' : "text/plain", 'csh' : "application/x-csh", 'csml' : "chemical/x-csml", 'csp' : "application/vnd.commonspace", 'css' : "text/css", 'cst' : "application/x-director", 'csv' : "text/csv", 'cu' : "application/cu-seeme", 'curl' : "text/vnd.curl", 'cww' : "application/prs.cww", 'cxt' : "application/x-director", 'cxx' : "text/x-c", 'dae' : "model/vnd.collada+xml", 'daf' : "application/vnd.mobius.daf", 'dart' : "application/vnd.dart", 'dataless' : "application/vnd.fdsn.seed", 'davmount' : "application/davmount+xml", 'dbk' : "application/docbook+xml", 'dcr' : "application/x-director", 'dcurl' : "text/vnd.curl.dcurl", 'dd2' : "application/vnd.oma.dd2+xml", 'ddd' : "application/vnd.fujixerox.ddd", 'deb' : "application/x-debian-package", 'def' : "text/plain", 'deploy' : "application/octet-stream", 'der' : "application/x-x509-ca-cert", 'dfac' : "application/vnd.dreamfactory", 'dgc' : "application/x-dgc-compressed", 'dic' : "text/x-c", 'dir' : "application/x-director", 'dis' : "application/vnd.mobius.dis", 'dist' : "application/octet-stream", 'distz' : "application/octet-stream", 'djv' : "image/vnd.djvu", 'djvu' : "image/vnd.djvu", 'dll' : "application/x-msdownload", 'dmg' : "application/x-apple-diskimage", 'dmp' : "application/vnd.tcpdump.pcap", 'dms' : "application/octet-stream", 'dna' : "application/vnd.dna", 'doc' : "application/msword", 'docm' : "application/vnd.ms-word.document.macroenabled.12", 'docx' : "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 'dot' : "application/msword", 'dotm' : "application/vnd.ms-word.template.macroenabled.12", 'dotx' : "application/vnd.openxmlformats-officedocument.wordprocessingml.template", 'dp' : "application/vnd.osgi.dp", 'dpg' : "application/vnd.dpgraph", 'dra' : "audio/vnd.dra", 'dsc' : "text/prs.lines.tag", 'dssc' : "application/dssc+der", 'dtb' : "application/x-dtbook+xml", 'dtd' : "application/xml-dtd", 'dts' : "audio/vnd.dts", 'dtshd' : "audio/vnd.dts.hd", 'dump' : "application/octet-stream", 'dvb' : "video/vnd.dvb.file", 'dvi' : "application/x-dvi", 'dwf' : "model/vnd.dwf", 'dwg' : "image/vnd.dwg", 'dxf' : "image/vnd.dxf", 'dxp' : "application/vnd.spotfire.dxp", 'dxr' : "application/x-director", 'ecelp4800' : "audio/vnd.nuera.ecelp4800", 'ecelp7470' : "audio/vnd.nuera.ecelp7470", 'ecelp9600' : "audio/vnd.nuera.ecelp9600", 'ecma' : "application/ecmascript", 'edm' : "application/vnd.novadigm.edm", 'edx' : "application/vnd.novadigm.edx", 'efif' : "application/vnd.picsel", 'ei6' : "application/vnd.pg.osasli", 'elc' : "application/octet-stream", 'emf' : "application/x-msmetafile", 'eml' : "message/rfc822", 'emma' : "application/emma+xml", 'emz' : "application/x-msmetafile", 'eol' : "audio/vnd.digital-winds", 'eot' : "application/vnd.ms-fontobject", 'eps' : "application/postscript", 'epub' : "application/epub+zip", 'es3' : "application/vnd.eszigno3+xml", 'esa' : "application/vnd.osgi.subsystem", 'esf' : "application/vnd.epson.esf", 'et3' : "application/vnd.eszigno3+xml", 'etx' : "text/x-setext", 'eva' : "application/x-eva", 'evy' : "application/x-envoy", 'exe' : "application/x-msdownload", 'exi' : "application/exi", 'ext' : "application/vnd.novadigm.ext", 'ez' : "application/andrew-inset", 'ez2' : "application/vnd.ezpix-album", 'ez3' : "application/vnd.ezpix-package", 'f' : "text/x-fortran", 'f4v' : "video/x-f4v", 'f77' : "text/x-fortran", 'f90' : "text/x-fortran", 'fbs' : "image/vnd.fastbidsheet", 'fcdt' : "application/vnd.adobe.formscentral.fcdt", 'fcs' : "application/vnd.isac.fcs", 'fdf' : "application/vnd.fdf", 'fe_launch' : "application/vnd.denovo.fcselayout-link", 'fg5' : "application/vnd.fujitsu.oasysgp", 'fgd' : "application/x-director", 'fh' : "image/x-freehand", 'fh4' : "image/x-freehand", 'fh5' : "image/x-freehand", 'fh7' : "image/x-freehand", 'fhc' : "image/x-freehand", 'fig' : "application/x-xfig", 'flac' : "audio/x-flac", 'fli' : "video/x-fli", 'flo' : "application/vnd.micrografx.flo", 'flv' : "video/x-flv", 'flw' : "application/vnd.kde.kivio", 'flx' : "text/vnd.fmi.flexstor", 'fly' : "text/vnd.fly", 'fm' : "application/vnd.framemaker", 'fnc' : "application/vnd.frogans.fnc", 'for' : "text/x-fortran", 'fpx' : "image/vnd.fpx", 'frame' : "application/vnd.framemaker", 'fsc' : "application/vnd.fsc.weblaunch", 'fst' : "image/vnd.fst", 'ftc' : "application/vnd.fluxtime.clip", 'fti' : "application/vnd.anser-web-funds-transfer-initiation", 'fvt' : "video/vnd.fvt", 'fxp' : "application/vnd.adobe.fxp", 'fxpl' : "application/vnd.adobe.fxp", 'fzs' : "application/vnd.fuzzysheet", 'g2w' : "application/vnd.geoplan", 'g3' : "image/g3fax", 'g3w' : "application/vnd.geospace", 'gac' : "application/vnd.groove-account", 'gam' : "application/x-tads", 'gbr' : "application/rpki-ghostbusters", 'gca' : "application/x-gca-compressed", 'gdl' : "model/vnd.gdl", 'geo' : "application/vnd.dynageo", 'gex' : "application/vnd.geometry-explorer", 'ggb' : "application/vnd.geogebra.file", 'ggt' : "application/vnd.geogebra.tool", 'ghf' : "application/vnd.groove-help", 'gif' : "image/gif", 'gim' : "application/vnd.groove-identity-message", 'gml' : "application/gml+xml", 'gmx' : "application/vnd.gmx", 'gnumeric' : "application/x-gnumeric", 'gph' : "application/vnd.flographit", 'gpx' : "application/gpx+xml", 'gqf' : "application/vnd.grafeq", 'gqs' : "application/vnd.grafeq", 'gram' : "application/srgs", 'gramps' : "application/x-gramps-xml", 'gre' : "application/vnd.geometry-explorer", 'grv' : "application/vnd.groove-injector", 'grxml' : "application/srgs+xml", 'gsf' : "application/x-font-ghostscript", 'gtar' : "application/x-gtar", 'gtm' : "application/vnd.groove-tool-message", 'gtw' : "model/vnd.gtw", 'gv' : "text/vnd.graphviz", 'gxf' : "application/gxf", 'gxt' : "application/vnd.geonext", 'gz' : "application/x-gzip", 'h' : "text/x-c", 'h261' : "video/h261", 'h263' : "video/h263", 'h264' : "video/h264", 'hal' : "application/vnd.hal+xml", 'hbci' : "application/vnd.hbci", 'hdf' : "application/x-hdf", 'hh' : "text/x-c", 'hlp' : "application/winhlp", 'hpgl' : "application/vnd.hp-hpgl", 'hpid' : "application/vnd.hp-hpid", 'hps' : "application/vnd.hp-hps", 'hqx' : "application/mac-binhex40", 'hta' : "application/octet-stream", 'htc' : "text/html", 'htke' : "application/vnd.kenameaapp", 'htm' : "text/html", 'html' : "text/html", 'hvd' : "application/vnd.yamaha.hv-dic", 'hvp' : "application/vnd.yamaha.hv-voice", 'hvs' : "application/vnd.yamaha.hv-script", 'hx' : "text/haxe", 'hxml' : "text/haxe.hxml", 'i2g' : "application/vnd.intergeo", 'icc' : "application/vnd.iccprofile", 'ice' : "x-conference/x-cooltalk", 'icm' : "application/vnd.iccprofile", 'ico' : "image/x-icon", 'ics' : "text/calendar", 'ief' : "image/ief", 'ifb' : "text/calendar", 'ifm' : "application/vnd.shana.informed.formdata", 'iges' : "model/iges", 'igl' : "application/vnd.igloader", 'igm' : "application/vnd.insors.igm", 'igs' : "model/iges", 'igx' : "application/vnd.micrografx.igx", 'iif' : "application/vnd.shana.informed.interchange", 'imp' : "application/vnd.accpac.simply.imp", 'ims' : "application/vnd.ms-ims", 'in' : "text/plain", 'ini' : "text/plain", 'ink' : "application/inkml+xml", 'inkml' : "application/inkml+xml", 'install' : "application/x-install-instructions", 'iota' : "application/vnd.astraea-software.iota", 'ipa' : "application/octet-stream", 'ipfix' : "application/ipfix", 'ipk' : "application/vnd.shana.informed.package", 'irm' : "application/vnd.ibm.rights-management", 'irp' : "application/vnd.irepository.package+xml", 'iso' : "application/x-iso9660-image", 'itp' : "application/vnd.shana.informed.formtemplate", 'ivp' : "application/vnd.immervision-ivp", 'ivu' : "application/vnd.immervision-ivu", 'jad' : "text/vnd.sun.j2me.app-descriptor", 'jam' : "application/vnd.jam", 'jar' : "application/java-archive", 'java' : "text/x-java-source", 'jisp' : "application/vnd.jisp", 'jlt' : "application/vnd.hp-jlyt", 'jnlp' : "application/x-java-jnlp-file", 'joda' : "application/vnd.joost.joda-archive", 'jpe' : "image/jpeg", 'jpeg' : "image/jpeg", 'jpg' : "image/jpeg", 'jpgm' : "video/jpm", 'jpgv' : "video/jpeg", 'jpm' : "video/jpm", 'js' : "text/javascript", 'json' : "application/json", 'jsonml' : "application/jsonml+json", 'kar' : "audio/midi", 'karbon' : "application/vnd.kde.karbon", 'kfo' : "application/vnd.kde.kformula", 'kia' : "application/vnd.kidspiration", 'kml' : "application/vnd.google-earth.kml+xml", 'kmz' : "application/vnd.google-earth.kmz", 'kne' : "application/vnd.kinar", 'knp' : "application/vnd.kinar", 'kon' : "application/vnd.kde.kontour", 'kpr' : "application/vnd.kde.kpresenter", 'kpt' : "application/vnd.kde.kpresenter", 'kpxx' : "application/vnd.ds-keypoint", 'ksp' : "application/vnd.kde.kspread", 'ktr' : "application/vnd.kahootz", 'ktx' : "image/ktx", 'ktz' : "application/vnd.kahootz", 'kwd' : "application/vnd.kde.kword", 'kwt' : "application/vnd.kde.kword", 'lasxml' : "application/vnd.las.las+xml", 'latex' : "application/x-latex", 'lbd' : "application/vnd.llamagraphics.life-balance.desktop", 'lbe' : "application/vnd.llamagraphics.life-balance.exchange+xml", 'les' : "application/vnd.hhe.lesson-player", 'less' : "text/less", 'lha' : "application/x-lzh-compressed", 'link66' : "application/vnd.route66.link66+xml", 'list' : "text/plain", 'list3820' : "application/vnd.ibm.modcap", 'listafp' : "application/vnd.ibm.modcap", 'lnk' : "application/x-ms-shortcut", 'log' : "text/plain", 'lostxml' : "application/lost+xml", 'lrf' : "application/octet-stream", 'lrm' : "application/vnd.ms-lrm", 'ltf' : "application/vnd.frogans.ltf", 'lvp' : "audio/vnd.lucent.voice", 'lwp' : "application/vnd.lotus-wordpro", 'lz' : "application/x-lzip", 'lzh' : "application/x-lzh-compressed", 'lzma' : "application/x-lzma", 'lzo' : "application/x-lzop", 'm13' : "application/x-msmediaview", 'm14' : "application/x-msmediaview", 'm1v' : "video/mpeg", 'm21' : "application/mp21", 'm2a' : "audio/mpeg", 'm2v' : "video/mpeg", 'm3a' : "audio/mpeg", 'm3u' : "audio/x-mpegurl", 'm3u8' : "application/vnd.apple.mpegurl", 'm4a' : "audio/mp4", 'm4u' : "video/vnd.mpegurl", 'm4v' : "video/mp4", 'ma' : "application/mathematica", 'mads' : "application/mads+xml", 'mag' : "application/vnd.ecowin.chart", 'maker' : "application/vnd.framemaker", 'man' : "text/troff", 'mar' : "application/octet-stream", 'mathml' : "application/mathml+xml", 'mb' : "application/mathematica", 'mbk' : "application/vnd.mobius.mbk", 'mbox' : "application/mbox", 'mc1' : "application/vnd.medcalcdata", 'mcd' : "application/vnd.mcd", 'mcurl' : "text/vnd.curl.mcurl", 'mdb' : "application/x-msaccess", 'mdi' : "image/vnd.ms-modi", 'md' : "text/markdown", 'me' : "text/troff", 'mesh' : "model/mesh", 'meta4' : "application/metalink4+xml", 'metalink' : "application/metalink+xml", 'mets' : "application/mets+xml", 'mfm' : "application/vnd.mfmp", 'mft' : "application/rpki-manifest", 'mgp' : "application/vnd.osgeo.mapguide.package", 'mgz' : "application/vnd.proteus.magazine", 'mid' : "audio/midi", 'midi' : "audio/midi", 'mie' : "application/x-mie", 'mif' : "application/vnd.mif", 'mime' : "message/rfc822", 'mj2' : "video/mj2", 'mjp2' : "video/mj2", 'mk3d' : "video/x-matroska", 'mka' : "audio/x-matroska", 'mks' : "video/x-matroska", 'mkv' : "video/x-matroska", 'mlp' : "application/vnd.dolby.mlp", 'mmd' : "application/vnd.chipnuts.karaoke-mmd", 'mmf' : "application/vnd.smaf", 'mmr' : "image/vnd.fujixerox.edmics-mmr", 'mng' : "video/x-mng", 'mny' : "application/x-msmoney", 'mobi' : "application/x-mobipocket-ebook", 'mods' : "application/mods+xml", 'mov' : "video/quicktime", 'movie' : "video/x-sgi-movie", 'mp2' : "audio/mpeg", 'mp21' : "application/mp21", 'mp2a' : "audio/mpeg", 'mp3' : "audio/mpeg", 'mp4' : "video/mp4", 'mp4a' : "audio/mp4", 'mp4s' : "application/mp4", 'mp4v' : "video/mp4", 'mpc' : "application/vnd.mophun.certificate", 'mpe' : "video/mpeg", 'mpeg' : "video/mpeg", 'mpg' : "video/mpeg", 'mpg4' : "video/mp4", 'mpga' : "audio/mpeg", 'mpkg' : "application/vnd.apple.installer+xml", 'mpm' : "application/vnd.blueice.multipass", 'mpn' : "application/vnd.mophun.application", 'mpp' : "application/vnd.ms-project", 'mpt' : "application/vnd.ms-project", 'mpy' : "application/vnd.ibm.minipay", 'mqy' : "application/vnd.mobius.mqy", 'mrc' : "application/marc", 'mrcx' : "application/marcxml+xml", 'ms' : "text/troff", 'mscml' : "application/mediaservercontrol+xml", 'mseed' : "application/vnd.fdsn.mseed", 'mseq' : "application/vnd.mseq", 'msf' : "application/vnd.epson.msf", 'msh' : "model/mesh", 'msi' : "application/x-msdownload", 'msl' : "application/vnd.mobius.msl", 'msty' : "application/vnd.muvee.style", 'mts' : "model/vnd.mts", 'mus' : "application/vnd.musician", 'musicxml' : "application/vnd.recordare.musicxml+xml", 'mvb' : "application/x-msmediaview", 'mwf' : "application/vnd.mfer", 'mxf' : "application/mxf", 'mxl' : "application/vnd.recordare.musicxml", 'mxml' : "application/xv+xml", 'mxs' : "application/vnd.triscape.mxs", 'mxu' : "video/vnd.mpegurl", 'n-gage' : "application/vnd.nokia.n-gage.symbian.install", 'n3' : "text/n3", 'nb' : "application/mathematica", 'nbp' : "application/vnd.wolfram.player", 'nc' : "application/x-netcdf", 'ncx' : "application/x-dtbncx+xml", 'nfo' : "text/x-nfo", 'ngdat' : "application/vnd.nokia.n-gage.data", 'nitf' : "application/vnd.nitf", 'nlu' : "application/vnd.neurolanguage.nlu", 'nml' : "application/vnd.enliven", 'nnd' : "application/vnd.noblenet-directory", 'nns' : "application/vnd.noblenet-sealer", 'nnw' : "application/vnd.noblenet-web", 'npx' : "image/vnd.net-fpx", 'nsc' : "application/x-conference", 'nsf' : "application/vnd.lotus-notes", 'ntf' : "application/vnd.nitf", 'nzb' : "application/x-nzb", 'oa2' : "application/vnd.fujitsu.oasys2", 'oa3' : "application/vnd.fujitsu.oasys3", 'oas' : "application/vnd.fujitsu.oasys", 'obd' : "application/x-msbinder", 'obj' : "application/x-tgif", 'oda' : "application/oda", 'odb' : "application/vnd.oasis.opendocument.database", 'odc' : "application/vnd.oasis.opendocument.chart", 'odf' : "application/vnd.oasis.opendocument.formula", 'odft' : "application/vnd.oasis.opendocument.formula-template", 'odg' : "application/vnd.oasis.opendocument.graphics", 'odi' : "application/vnd.oasis.opendocument.image", 'odm' : "application/vnd.oasis.opendocument.text-master", 'odp' : "application/vnd.oasis.opendocument.presentation", 'ods' : "application/vnd.oasis.opendocument.spreadsheet", 'odt' : "application/vnd.oasis.opendocument.text", 'oga' : "audio/ogg", 'ogg' : "audio/ogg", 'ogv' : "video/ogg", 'ogx' : "application/ogg", 'omdoc' : "application/omdoc+xml", 'onepkg' : "application/onenote", 'onetmp' : "application/onenote", 'onetoc' : "application/onenote", 'onetoc2' : "application/onenote", 'opf' : "application/oebps-package+xml", 'opml' : "text/x-opml", 'oprc' : "application/vnd.palm", 'org' : "application/vnd.lotus-organizer", 'osf' : "application/vnd.yamaha.openscoreformat", 'osfpvg' : "application/vnd.yamaha.openscoreformat.osfpvg+xml", 'otc' : "application/vnd.oasis.opendocument.chart-template", 'otf' : "application/x-font-otf", 'otg' : "application/vnd.oasis.opendocument.graphics-template", 'oth' : "application/vnd.oasis.opendocument.text-web", 'oti' : "application/vnd.oasis.opendocument.image-template", 'otp' : "application/vnd.oasis.opendocument.presentation-template", 'ots' : "application/vnd.oasis.opendocument.spreadsheet-template", 'ott' : "application/vnd.oasis.opendocument.text-template", 'oxps' : "application/oxps", 'oxt' : "application/vnd.openofficeorg.extension", 'p' : "text/x-pascal", 'py' : "application/python", 'p10' : "application/pkcs10", 'p12' : "application/x-pkcs12", 'p7b' : "application/x-pkcs7-certificates", 'p7c' : "application/pkcs7-mime", 'p7m' : "application/pkcs7-mime", 'p7r' : "application/x-pkcs7-certreqresp", 'p7s' : "application/pkcs7-signature", 'p8' : "application/pkcs8", 'pas' : "text/x-pascal", 'paw' : "application/vnd.pawaafile", 'pbd' : "application/vnd.powerbuilder6", 'pbm' : "image/x-portable-bitmap", 'pcap' : "application/vnd.tcpdump.pcap", 'pcf' : "application/x-font-pcf", 'pcl' : "application/vnd.hp-pcl", 'pclxl' : "application/vnd.hp-pclxl", 'pct' : "image/x-pict", 'pcurl' : "application/vnd.curl.pcurl", 'pcx' : "image/x-pcx", 'pdb' : "application/vnd.palm", 'pdf' : "application/pdf", 'pfa' : "application/x-font-type1", 'pfb' : "application/x-font-type1", 'pfm' : "application/x-font-type1", 'pfr' : "application/font-tdpfr", 'pfx' : "application/x-pkcs12", 'pgm' : "image/x-portable-graymap", 'pgn' : "application/x-chess-pgn", 'pgp' : "application/pgp-encrypted", 'phar' : "application/octet-stream", 'php' : "text/plain", 'phps' : "application/x-httpd-phps", 'pic' : "image/x-pict", 'pkg' : "application/octet-stream", 'pki' : "application/pkixcmp", 'pkipath' : "application/pkix-pkipath", 'plb' : "application/vnd.3gpp.pic-bw-large", 'plc' : "application/vnd.mobius.plc", 'plf' : "application/vnd.pocketlearn", 'plist' : "application/x-plist", 'pls' : "application/pls+xml", 'pml' : "application/vnd.ctc-posml", 'png' : "image/png", 'pnm' : "image/x-portable-anymap", 'portpkg' : "application/vnd.macports.portpkg", 'pot' : "application/vnd.ms-powerpoint", 'potm' : "application/vnd.ms-powerpoint.template.macroenabled.12", 'potx' : "application/vnd.openxmlformats-officedocument.presentationml.template", 'ppam' : "application/vnd.ms-powerpoint.addin.macroenabled.12", 'ppd' : "application/vnd.cups-ppd", 'ppm' : "image/x-portable-pixmap", 'pps' : "application/vnd.ms-powerpoint", 'ppsm' : "application/vnd.ms-powerpoint.slideshow.macroenabled.12", 'ppsx' : "application/vnd.openxmlformats-officedocument.presentationml.slideshow", 'ppt' : "application/vnd.ms-powerpoint", 'pptm' : "application/vnd.ms-powerpoint.presentation.macroenabled.12", 'pptx' : "application/vnd.openxmlformats-officedocument.presentationml.presentation", 'pqa' : "application/vnd.palm", 'prc' : "application/x-mobipocket-ebook", 'pre' : "application/vnd.lotus-freelance", 'prf' : "application/pics-rules", 'ps' : "application/postscript", 'psb' : "application/vnd.3gpp.pic-bw-small", 'psd' : "image/vnd.adobe.photoshop", 'psf' : "application/x-font-linux-psf", 'pskcxml' : "application/pskc+xml", 'ptid' : "application/vnd.pvi.ptid1", 'pub' : "application/x-mspublisher", 'pvb' : "application/vnd.3gpp.pic-bw-var", 'pwn' : "application/vnd.3m.post-it-notes", 'pya' : "audio/vnd.ms-playready.media.pya", 'pyv' : "video/vnd.ms-playready.media.pyv", 'qam' : "application/vnd.epson.quickanime", 'qbo' : "application/vnd.intu.qbo", 'qfx' : "application/vnd.intu.qfx", 'qps' : "application/vnd.publishare-delta-tree", 'qt' : "video/quicktime", 'qwd' : "application/vnd.quark.quarkxpress", 'qwt' : "application/vnd.quark.quarkxpress", 'qxb' : "application/vnd.quark.quarkxpress", 'qxd' : "application/vnd.quark.quarkxpress", 'qxl' : "application/vnd.quark.quarkxpress", 'qxt' : "application/vnd.quark.quarkxpress", 'ra' : "audio/x-pn-realaudio", 'ram' : "audio/x-pn-realaudio", 'rar' : "application/x-rar-compressed", 'ras' : "image/x-cmu-raster", 'rb' : "text/plain", 'rcprofile' : "application/vnd.ipunplugged.rcprofile", 'rdf' : "application/rdf+xml", 'rdz' : "application/vnd.data-vision.rdz", 'rep' : "application/vnd.businessobjects", 'res' : "application/x-dtbresource+xml", 'resx' : "text/xml", 'rgb' : "image/x-rgb", 'rif' : "application/reginfo+xml", 'rip' : "audio/vnd.rip", 'ris' : "application/x-research-info-systems", 'rl' : "application/resource-lists+xml", 'rlc' : "image/vnd.fujixerox.edmics-rlc", 'rld' : "application/resource-lists-diff+xml", 'rm' : "application/vnd.rn-realmedia", 'rmi' : "audio/midi", 'rmp' : "audio/x-pn-realaudio-plugin", 'rms' : "application/vnd.jcp.javame.midlet-rms", 'rmvb' : "application/vnd.rn-realmedia-vbr", 'rnc' : "application/relax-ng-compact-syntax", 'roa' : "application/rpki-roa", 'roff' : "text/troff", 'rp9' : "application/vnd.cloanto.rp9", 'rpm' : "application/x-rpm", 'rpss' : "application/vnd.nokia.radio-presets", 'rpst' : "application/vnd.nokia.radio-preset", 'rq' : "application/sparql-query", 'rs' : "application/rls-services+xml", 'rsd' : "application/rsd+xml", 'rss' : "application/rss+xml", 'rtf' : "application/rtf", 'rtx' : "text/richtext", 's' : "text/x-asm", 's3m' : "audio/s3m", 's7z' : "application/x-7z-compressed", 'saf' : "application/vnd.yamaha.smaf-audio", 'safariextz' : "application/octet-stream", 'sass' : "text/x-sass", 'sbml' : "application/sbml+xml", 'sc' : "application/vnd.ibm.secure-container", 'scd' : "application/x-msschedule", 'scm' : "application/vnd.lotus-screencam", 'scq' : "application/scvp-cv-request", 'scs' : "application/scvp-cv-response", 'scss' : "text/x-scss", 'scurl' : "text/vnd.curl.scurl", 'sda' : "application/vnd.stardivision.draw", 'sdc' : "application/vnd.stardivision.calc", 'sdd' : "application/vnd.stardivision.impress", 'sdkd' : "application/vnd.solent.sdkm+xml", 'sdkm' : "application/vnd.solent.sdkm+xml", 'sdp' : "application/sdp", 'sdw' : "application/vnd.stardivision.writer", 'see' : "application/vnd.seemail", 'seed' : "application/vnd.fdsn.seed", 'sema' : "application/vnd.sema", 'semd' : "application/vnd.semd", 'semf' : "application/vnd.semf", 'ser' : "application/java-serialized-object", 'setpay' : "application/set-payment-initiation", 'setreg' : "application/set-registration-initiation", 'sfd-hdstx' : "application/vnd.hydrostatix.sof-data", 'sfs' : "application/vnd.spotfire.sfs", 'sfv' : "text/x-sfv", 'sgi' : "image/sgi", 'sgl' : "application/vnd.stardivision.writer-global", 'sgm' : "text/sgml", 'sgml' : "text/sgml", 'sh' : "application/x-sh", 'shar' : "application/x-shar", 'shf' : "application/shf+xml", 'sid' : "image/x-mrsid-image", 'sig' : "application/pgp-signature", 'sil' : "audio/silk", 'silo' : "model/mesh", 'sis' : "application/vnd.symbian.install", 'sisx' : "application/vnd.symbian.install", 'sit' : "application/x-stuffit", 'sitx' : "application/x-stuffitx", 'skd' : "application/vnd.koan", 'skm' : "application/vnd.koan", 'skp' : "application/vnd.koan", 'skt' : "application/vnd.koan", 'sldm' : "application/vnd.ms-powerpoint.slide.macroenabled.12", 'sldx' : "application/vnd.openxmlformats-officedocument.presentationml.slide", 'slt' : "application/vnd.epson.salt", 'sm' : "application/vnd.stepmania.stepchart", 'smf' : "application/vnd.stardivision.math", 'smi' : "application/smil+xml", 'smil' : "application/smil+xml", 'smv' : "video/x-smv", 'smzip' : "application/vnd.stepmania.package", 'snd' : "audio/basic", 'snf' : "application/x-font-snf", 'so' : "application/octet-stream", 'spc' : "application/x-pkcs7-certificates", 'spf' : "application/vnd.yamaha.smaf-phrase", 'spl' : "application/x-futuresplash", 'spot' : "text/vnd.in3d.spot", 'spp' : "application/scvp-vp-response", 'spq' : "application/scvp-vp-request", 'spx' : "audio/ogg", 'sql' : "application/x-sql", 'src' : "application/x-wais-source", 'srt' : "application/x-subrip", 'sru' : "application/sru+xml", 'srx' : "application/sparql-results+xml", 'ssdl' : "application/ssdl+xml", 'sse' : "application/vnd.kodak-descriptor", 'ssf' : "application/vnd.epson.ssf", 'ssml' : "application/ssml+xml", 'st' : "application/vnd.sailingtracker.track", 'stc' : "application/vnd.sun.xml.calc.template", 'std' : "application/vnd.sun.xml.draw.template", 'stf' : "application/vnd.wt.stf", 'sti' : "application/vnd.sun.xml.impress.template", 'stk' : "application/hyperstudio", 'stl' : "application/vnd.ms-pki.stl", 'str' : "application/vnd.pg.format", 'stw' : "application/vnd.sun.xml.writer.template", 'styl' : "text/x-styl", 'sub' : "image/vnd.dvb.subtitle", 'sus' : "application/vnd.sus-calendar", 'susp' : "application/vnd.sus-calendar", 'sv4cpio' : "application/x-sv4cpio", 'sv4crc' : "application/x-sv4crc", 'svc' : "application/vnd.dvb.service", 'svd' : "application/vnd.svd", 'svg' : "image/svg+xml", 'svgz' : "image/svg+xml", 'swa' : "application/x-director", 'swf' : "application/x-shockwave-flash", 'swi' : "application/vnd.aristanetworks.swi", 'sxc' : "application/vnd.sun.xml.calc", 'sxd' : "application/vnd.sun.xml.draw", 'sxg' : "application/vnd.sun.xml.writer.global", 'sxi' : "application/vnd.sun.xml.impress", 'sxm' : "application/vnd.sun.xml.math", 'sxw' : "application/vnd.sun.xml.writer", 't' : "text/troff", 't3' : "application/x-t3vm-image", 'taglet' : "application/vnd.mynfc", 'tao' : "application/vnd.tao.intent-module-archive", 'tar' : "application/x-tar", 'tcap' : "application/vnd.3gpp2.tcap", 'tcl' : "application/x-tcl", 'teacher' : "application/vnd.smart.teacher", 'tei' : "application/tei+xml", 'teicorpus' : "application/tei+xml", 'tex' : "application/x-tex", 'texi' : "application/x-texinfo", 'texinfo' : "application/x-texinfo", 'text' : "text/plain", 'tfi' : "application/thraud+xml", 'tfm' : "application/x-tex-tfm", 'tga' : "image/x-tga", 'tgz' : "application/x-gzip", 'thmx' : "application/vnd.ms-officetheme", 'tif' : "image/tiff", 'tiff' : "image/tiff", 'tmo' : "application/vnd.tmobile-livetv", 'torrent' : "application/x-bittorrent", 'tpl' : "application/vnd.groove-tool-template", 'tpt' : "application/vnd.trid.tpt", 'tr' : "text/troff", 'tra' : "application/vnd.trueapp", 'trm' : "application/x-msterminal", 'tsd' : "application/timestamped-data", 'tsv' : "text/tab-separated-values", 'ttc' : "application/x-font-ttf", 'ttf' : "application/x-font-ttf", 'ttl' : "text/turtle", 'twd' : "application/vnd.simtech-mindmapper", 'twds' : "application/vnd.simtech-mindmapper", 'txd' : "application/vnd.genomatix.tuxedo", 'txf' : "application/vnd.mobius.txf", 'txt' : "text/plain", 'u32' : "application/x-authorware-bin", 'udeb' : "application/x-debian-package", 'ufd' : "application/vnd.ufdl", 'ufdl' : "application/vnd.ufdl", 'ulx' : "application/x-glulx", 'umj' : "application/vnd.umajin", 'unityweb' : "application/vnd.unity", 'uoml' : "application/vnd.uoml+xml", 'uri' : "text/uri-list", 'uris' : "text/uri-list", 'urls' : "text/uri-list", 'ustar' : "application/x-ustar", 'utz' : "application/vnd.uiq.theme", 'uu' : "text/x-uuencode", 'uva' : "audio/vnd.dece.audio", 'uvd' : "application/vnd.dece.data", 'uvf' : "application/vnd.dece.data", 'uvg' : "image/vnd.dece.graphic", 'uvh' : "video/vnd.dece.hd", 'uvi' : "image/vnd.dece.graphic", 'uvm' : "video/vnd.dece.mobile", 'uvp' : "video/vnd.dece.pd", 'uvs' : "video/vnd.dece.sd", 'uvt' : "application/vnd.dece.ttml+xml", 'uvu' : "video/vnd.uvvu.mp4", 'uvv' : "video/vnd.dece.video", 'uvva' : "audio/vnd.dece.audio", 'uvvd' : "application/vnd.dece.data", 'uvvf' : "application/vnd.dece.data", 'uvvg' : "image/vnd.dece.graphic", 'uvvh' : "video/vnd.dece.hd", 'uvvi' : "image/vnd.dece.graphic", 'uvvm' : "video/vnd.dece.mobile", 'uvvp' : "video/vnd.dece.pd", 'uvvs' : "video/vnd.dece.sd", 'uvvt' : "application/vnd.dece.ttml+xml", 'uvvu' : "video/vnd.uvvu.mp4", 'uvvv' : "video/vnd.dece.video", 'uvvx' : "application/vnd.dece.unspecified", 'uvvz' : "application/vnd.dece.zip", 'uvx' : "application/vnd.dece.unspecified", 'uvz' : "application/vnd.dece.zip", 'vcard' : "text/vcard", 'vcd' : "application/x-cdlink", 'vcf' : "text/x-vcard", 'vcg' : "application/vnd.groove-vcard", 'vcs' : "text/x-vcalendar", 'vcx' : "application/vnd.vcx", 'vis' : "application/vnd.visionary", 'viv' : "video/vnd.vivo", 'vob' : "video/x-ms-vob", 'vor' : "application/vnd.stardivision.writer", 'vox' : "application/x-authorware-bin", 'vrml' : "model/vrml", 'vsd' : "application/vnd.visio", 'vsf' : "application/vnd.vsf", 'vss' : "application/vnd.visio", 'vst' : "application/vnd.visio", 'vsw' : "application/vnd.visio", 'vtu' : "model/vnd.vtu", 'vxml' : "application/voicexml+xml", 'w3d' : "application/x-director", 'wad' : "application/x-doom", 'wav' : "audio/x-wav", 'wax' : "audio/x-ms-wax", 'wbmp' : "image/vnd.wap.wbmp", 'wbs' : "application/vnd.criticaltools.wbs+xml", 'wbxml' : "application/vnd.wap.wbxml", 'wcm' : "application/vnd.ms-works", 'wdb' : "application/vnd.ms-works", 'wdp' : "image/vnd.ms-photo", 'weba' : "audio/webm", 'webm' : "video/webm", 'webp' : "image/webp", 'wg' : "application/vnd.pmi.widget", 'wgt' : "application/widget", 'wks' : "application/vnd.ms-works", 'wm' : "video/x-ms-wm", 'wma' : "audio/x-ms-wma", 'wmd' : "application/x-ms-wmd", 'wmf' : "application/x-msmetafile", 'wml' : "text/vnd.wap.wml", 'wmlc' : "application/vnd.wap.wmlc", 'wmls' : "text/vnd.wap.wmlscript", 'wmlsc' : "application/vnd.wap.wmlscriptc", 'wmv' : "video/x-ms-wmv", 'wmx' : "video/x-ms-wmx", 'wmz' : "application/x-ms-wmz", 'woff' : "application/x-font-woff", 'wpd' : "application/vnd.wordperfect", 'wpl' : "application/vnd.ms-wpl", 'wps' : "application/vnd.ms-works", 'wqd' : "application/vnd.wqd", 'wri' : "application/x-mswrite", 'wrl' : "model/vrml", 'wsdl' : "application/wsdl+xml", 'wspolicy' : "application/wspolicy+xml", 'wtb' : "application/vnd.webturbo", 'wvx' : "video/x-ms-wvx", 'x32' : "application/x-authorware-bin", 'x3d' : "model/x3d+xml", 'x3db' : "model/x3d+binary", 'x3dbz' : "model/x3d+binary", 'x3dv' : "model/x3d+vrml", 'x3dvz' : "model/x3d+vrml", 'x3dz' : "model/x3d+xml", 'xaml' : "application/xaml+xml", 'xap' : "application/x-silverlight-app", 'xar' : "application/vnd.xara", 'xbap' : "application/x-ms-xbap", 'xbd' : "application/vnd.fujixerox.docuworks.binder", 'xbm' : "image/x-xbitmap", 'xdf' : "application/xcap-diff+xml", 'xdm' : "application/vnd.syncml.dm+xml", 'xdp' : "application/vnd.adobe.xdp+xml", 'xdssc' : "application/dssc+xml", 'xdw' : "application/vnd.fujixerox.docuworks", 'xenc' : "application/xenc+xml", 'xer' : "application/patch-ops-error+xml", 'xfdf' : "application/vnd.adobe.xfdf", 'xfdl' : "application/vnd.xfdl", 'xht' : "application/xhtml+xml", 'xhtml' : "application/xhtml+xml", 'xhvml' : "application/xv+xml", 'xif' : "image/vnd.xiff", 'xla' : "application/vnd.ms-excel", 'xlam' : "application/vnd.ms-excel.addin.macroenabled.12", 'xlc' : "application/vnd.ms-excel", 'xlf' : "application/x-xliff+xml", 'xlm' : "application/vnd.ms-excel", 'xls' : "application/vnd.ms-excel", 'xlsb' : "application/vnd.ms-excel.sheet.binary.macroenabled.12", 'xlsm' : "application/vnd.ms-excel.sheet.macroenabled.12", 'xlsx' : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 'xlt' : "application/vnd.ms-excel", 'xltm' : "application/vnd.ms-excel.template.macroenabled.12", 'xltx' : "application/vnd.openxmlformats-officedocument.spreadsheetml.template", 'xlw' : "application/vnd.ms-excel", 'xm' : "audio/xm", 'xml' : "application/xml", 'xo' : "application/vnd.olpc-sugar", 'xop' : "application/xop+xml", 'xpi' : "application/x-xpinstall", 'xpl' : "application/xproc+xml", 'xpm' : "image/x-xpixmap", 'xpr' : "application/vnd.is-xpr", 'xps' : "application/vnd.ms-xpsdocument", 'xpw' : "application/vnd.intercon.formnet", 'xpx' : "application/vnd.intercon.formnet", 'xsl' : "application/xml", 'xslt' : "application/xslt+xml", 'xsm' : "application/vnd.syncml+xml", 'xspf' : "application/xspf+xml", 'xul' : "application/vnd.mozilla.xul+xml", 'xvm' : "application/xv+xml", 'xvml' : "application/xv+xml", 'xwd' : "image/x-xwindowdump", 'xyz' : "chemical/x-xyz", 'xz' : "application/x-xz", 'yaml' : "text/yaml", 'yang' : "application/yang", 'yin' : "application/yin+xml", 'yml' : "text/yaml", 'z' : "application/x-compress", 'z1' : "application/x-zmachine", 'z2' : "application/x-zmachine", 'z3' : "application/x-zmachine", 'z4' : "application/x-zmachine", 'z5' : "application/x-zmachine", 'z6' : "application/x-zmachine", 'z7' : "application/x-zmachine", 'z8' : "application/x-zmachine", 'zaz' : "application/vnd.zzazz.deck+xml", 'zip' : "application/zip", 'zir' : "application/vnd.zul", 'zirz' : "application/vnd.zul", 'zmm' : "application/vnd.handheld-entertainment+xml", '123' : "application/vnd.lotus-1-2-3"};
war_ui_ItemListItem.__meta__ = { statics : { click : { on : ["click"]}}};
GameMain.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
