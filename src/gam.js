(function (console) { "use strict";
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
var Game = function() {
	var canvas = window.document.getElementById("stage");
	this.stage = new gryffin_core_Stage(canvas);
	var t = new war_world_Tile("assets/images/grass.png");
	this.stage.addChild(t);
};
$hxClasses["Game"] = Game;
Game.__name__ = ["Game"];
Game.main = function() {
	new Game();
};
Game.prototype = {
	__class__: Game
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
var gryffin_Tools = function() { };
$hxClasses["gryffin.Tools"] = gryffin_Tools;
gryffin_Tools.__name__ = ["gryffin","Tools"];
gryffin_Tools.__properties__ = {get_win:"get_win"}
gryffin_Tools.defer = function(f) {
	window.setTimeout(f,5);
};
gryffin_Tools.get_win = function() {
	return window;
};
var gryffin_core_EventDispatcher = function() {
	this.__sigs = new haxe_ds_StringMap();
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
	,__class__: gryffin_core_EventDispatcher
};
var gryffin_core_Entity = function() {
	gryffin_core_EventDispatcher.call(this);
	this._cached = false;
	this._hidden = false;
	this.destroyed = false;
	this.priority = 0;
	this.once("activated",$bind(this,this.init));
};
$hxClasses["gryffin.core.Entity"] = gryffin_core_Entity;
gryffin_core_Entity.__name__ = ["gryffin","core","Entity"];
gryffin_core_Entity.__super__ = gryffin_core_EventDispatcher;
gryffin_core_Entity.prototype = $extend(gryffin_core_EventDispatcher.prototype,{
	'delete': function() {
		this.destroyed = true;
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
	,init: function(s) {
		console.log(tannus_internal_TypeTools.typename(this) + " has been initialized");
	}
	,update: function(s) {
		null;
	}
	,render: function(s,c) {
		null;
	}
	,containsPoint: function(p) {
		return false;
	}
	,__class__: gryffin_core_Entity
});
var gryffin_core_Stage = function(can) {
	gryffin_core_EventDispatcher.call(this);
	this.canvas = can;
	this.ctx = this.canvas.getContext("2d",null);
	this.children = [];
	this.manager = new gryffin_events_FrameManager();
	this.mouseManager = new gryffin_events_MouseListener(this);
	this.__init();
};
$hxClasses["gryffin.core.Stage"] = gryffin_core_Stage;
gryffin_core_Stage.__name__ = ["gryffin","core","Stage"];
gryffin_core_Stage.__super__ = gryffin_core_EventDispatcher;
gryffin_core_Stage.prototype = $extend(gryffin_core_EventDispatcher.prototype,{
	resize: function(w,h) {
		this.canvas.width = w;
		this.canvas.height = h;
		this.ctx = this.canvas.getContext("2d",null);
	}
	,addChild: function(child) {
		if(!Lambda.has(this.children,child)) {
			this.children.push(child);
			child.stage = this;
			child.dispatch("activated",this);
		}
	}
	,frame: function(delta) {
		this.children = this.children.filter(function(e) {
			return !e.destroyed;
		});
		haxe_ds_ArraySort.sort(this.children,function(a,b) {
			return b.priority - a.priority;
		});
		var this1 = this.ctx;
		this1.clearRect(0,0,this1.canvas.width,this1.canvas.height);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(!child._cached) child.update(this);
			if(!child._hidden) child.render(this,this.ctx);
		}
	}
	,get: function(sel) {
		var s;
		var this1;
		var b = tannus_nore_ORegEx.compile(sel);
		this1 = [sel,b];
		s = this1;
		return this.children.filter(s[1]);
	}
	,mouseEvent: function(e) {
		this.dispatch(e.type,e);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.containsPoint(e.position)) child.dispatch(e.type,e);
		}
	}
	,__init: function() {
		this.__events();
	}
	,__events: function() {
		this.manager.frame.listen($bind(this,this.frame),false);
		this.manager.start();
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
	,__class__: gryffin_core_Stage
	,__properties__: {set_rect:"set_rect",get_rect:"get_rect",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width"}
});
var gryffin_display_Paintable = function() { };
$hxClasses["gryffin.display.Paintable"] = gryffin_display_Paintable;
gryffin_display_Paintable.__name__ = ["gryffin","display","Paintable"];
gryffin_display_Paintable.prototype = {
	__class__: gryffin_display_Paintable
};
var gryffin_display_Canvas = function(c) {
	if(c != null) this.canvas = c; else {
		var _this = window.document;
		this.canvas = _this.createElement("canvas");
	}
	var r = (function(f,a1) {
		return function() {
			return f(a1);
		};
	})(($_=this.canvas,$bind($_,$_.getContext)),"2d");
	this._ctx = new tannus_ds_CRef(r);
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
		this.canvas.width = w;
		this.canvas.height = h;
		var r = (function(f,a1) {
			return function() {
				return f(a1);
			};
		})(($_=this.canvas,$bind($_,$_.getContext)),"2d");
		this._ctx = new tannus_ds_CRef(r);
	}
	,paint: function(c,src,dest) {
		c.drawImage(this.canvas,src.x,src.y,src.width,src.height,dest.x,dest.y,dest.width,dest.height);
	}
	,dataURI: function(type) {
		return this.canvas.toDataURL(type);
	}
	,getImage: function(cb) {
		gryffin_display_Image.load(this.dataURI(),cb);
	}
	,pixels: function(x,y,w,h) {
		var idata = this._ctx.get().getImageData(x,y,w,h);
		var pos = new tannus_geom_TPoint(x,y,0);
		return new gryffin_display_Pixels(this,pos,idata);
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
var gryffin_display__$Ctx_Ctx_$Impl_$ = {};
$hxClasses["gryffin.display._Ctx.Ctx_Impl_"] = gryffin_display__$Ctx_Ctx_$Impl_$;
gryffin_display__$Ctx_Ctx_$Impl_$.__name__ = ["gryffin","display","_Ctx","Ctx_Impl_"];
gryffin_display__$Ctx_Ctx_$Impl_$.__properties__ = {get_height:"get_height",get_width:"get_width"}
gryffin_display__$Ctx_Ctx_$Impl_$._new = function(c) {
	return c;
};
gryffin_display__$Ctx_Ctx_$Impl_$.erase = function(this1) {
	this1.clearRect(0,0,this1.canvas.width,this1.canvas.height);
};
gryffin_display__$Ctx_Ctx_$Impl_$.paint = function(this1,comp,src,dest) {
	comp.paint(this1,src,dest);
};
gryffin_display__$Ctx_Ctx_$Impl_$.drawComponent = function(this1,comp,sx,sy,sw,sh,dx,dy,dw,dh) {
	var src = new tannus_geom_CRectangle(sx,sy,sw,sh);
	var dest = new tannus_geom_CRectangle(dx,dy,dw,dh);
	comp.paint(this1,src,dest);
};
gryffin_display__$Ctx_Ctx_$Impl_$.setMatrix = function(this1,m) {
	gryffin_display_CtxTools.applyMatrix(this1,m);
};
gryffin_display__$Ctx_Ctx_$Impl_$.getMatrix = function(this1) {
	return gryffin_display_CtxTools.obtainMatrix(this1);
};
gryffin_display__$Ctx_Ctx_$Impl_$.get_width = function(this1) {
	return this1.canvas.width;
};
gryffin_display__$Ctx_Ctx_$Impl_$.get_height = function(this1) {
	return this1.canvas.height;
};
var gryffin_display_CtxTools = function() { };
$hxClasses["gryffin.display.CtxTools"] = gryffin_display_CtxTools;
gryffin_display_CtxTools.__name__ = ["gryffin","display","CtxTools"];
gryffin_display_CtxTools.drawVertices = function(c,vertices,closed) {
	if(closed == null) closed = true;
	var points;
	{
		var _g = [];
		var $it0 = vertices.iterator();
		while( $it0.hasNext() ) {
			var p = $it0.next();
			_g.push((function($this) {
				var $r;
				var x = p.get_x();
				var y = p.get_y();
				var z = p.get_z();
				$r = new tannus_geom_TPoint(x,y,z);
				return $r;
			}(this)));
		}
		points = _g;
	}
	var first = points.shift();
	c.beginPath();
	c.moveTo(first.get_x(),first.get_y());
	var _g1 = 0;
	while(_g1 < points.length) {
		var p1 = points[_g1];
		++_g1;
		c.lineTo(p1.get_x(),p1.get_y());
	}
	c.lineTo(first.get_x(),first.get_y());
	if(closed) {
		c.closePath();
		c.stroke();
	} else {
		c.stroke();
		c.closePath();
	}
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
	var img = new gryffin_display_Image();
	img.img.src = src;
	if(cb != null) img.ready.once((function(f,a1) {
		return function() {
			f(a1);
		};
	})(cb,img));
	return img;
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
		if(this.img.complete) window.setTimeout(($_=this.ready,$bind($_,$_.fire)),5);
	}
	,toCanvas: function() {
		var _g = this;
		var can = gryffin_display_Canvas.create(this.targetWidth,this.targetHeight);
		var c = can._ctx.get();
		if(this.img.complete) {
			can.resize(this.img.naturalWidth,this.img.naturalHeight);
			c = can._ctx.get();
			var src = new tannus_geom_CRectangle(0,0,this.img.naturalWidth,this.img.naturalHeight);
			var dest = new tannus_geom_CRectangle(0,0,this.img.naturalWidth,this.img.naturalHeight);
			this.paint(c,src,dest);
			console.log("Image already loaded");
		} else {
			console.log("Image not loaded");
			c.save();
			c.fillStyle = "#000000";
			c.fillRect(0,0,this.targetWidth,this.targetHeight);
			c.restore();
			this.ready.once(function() {
				console.log("Image now loaded");
				console.log([_g.img.naturalWidth,_g.img.naturalHeight]);
				can.resize(_g.img.naturalWidth,_g.img.naturalHeight);
				c = can._ctx.get();
				var src1 = new tannus_geom_CRectangle(0,0,_g.img.naturalWidth,_g.img.naturalHeight);
				var dest1 = new tannus_geom_CRectangle(0,0,_g.img.naturalWidth,_g.img.naturalHeight);
				_g.paint(c,src1,dest1);
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
	,get_complete: function() {
		return this.img.complete;
	}
	,__class__: gryffin_display_Image
	,__properties__: {get_complete:"get_complete",get_height:"get_height",get_width:"get_width",set_src:"set_src",get_src:"get_src"}
};
var gryffin_display_Pixels = function(owner,position,dat) {
	this.canvas = owner;
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
		target._ctx.get().putImageData(this.idata,x,y,sx,sy,sw != null?sw:this.idata.width,sh != null?sh:this.idata.height);
	}
	,save: function() {
		this.write(this.canvas,this.pos.get_x(),this.pos.get_y());
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
var gryffin_events_MouseListener = function(s) {
	this.stage = s;
	this.canvas = this.stage.canvas;
	this.bind();
};
$hxClasses["gryffin.events.MouseListener"] = gryffin_events_MouseListener;
gryffin_events_MouseListener.__name__ = ["gryffin","events","MouseListener"];
gryffin_events_MouseListener.__interfaces__ = [tannus_events_EventCreator];
gryffin_events_MouseListener.prototype = {
	bind: function() {
		var relevant = ["click","mouseup","mousedown","mousemove"];
		var _g = 0;
		while(_g < relevant.length) {
			var name = relevant[_g];
			++_g;
			this.canvas.addEventListener(name,$bind(this,this.handle));
		}
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
		event.onDefaultPrevented.listen($bind(e,e.preventDefault),true);
		event.onPropogationStopped.listen($bind(e,e.stopPropagation),true);
		this.stage.mouseEvent(event);
	}
	,__class__: gryffin_events_MouseListener
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
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
haxe_io_Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getFloat: function(pos) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		return this.data.getFloat32(pos,true);
	}
	,setFloat: function(pos,v) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		this.data.setFloat32(pos,v,true);
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
var tannus_ds_IntRange = function(mi,ma) {
	tannus_ds_Range.call(this,mi,ma);
};
$hxClasses["tannus.ds.IntRange"] = tannus_ds_IntRange;
tannus_ds_IntRange.__name__ = ["tannus","ds","IntRange"];
tannus_ds_IntRange.__super__ = tannus_ds_Range;
tannus_ds_IntRange.prototype = $extend(tannus_ds_Range.prototype,{
	iterator: function() {
		return new IntIterator(this.min,this.max);
	}
	,__class__: tannus_ds_IntRange
});
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
	var sel;
	{
		var this2;
		var b = tannus_nore_ORegEx.compile(oreg);
		this2 = [oreg,b];
		sel = this2;
	}
	return sel[1](this1);
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
		if(this._value == null) {
			console.log("first get");
			return this._value = this.getter();
		} else return this._value;
	}
	,__class__: tannus_ds_CRef
};
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
	,copy: function() {
		return new tannus_ds_Stack(this.data.slice());
	}
	,get_empty: function() {
		return this.data.length == 0;
	}
	,__class__: tannus_ds_Stack
	,__properties__: {get_empty:"get_empty"}
};
var tannus_ds_Stack_$tannus_$geom_$Line = function(dat) {
	if(dat != null) this.data = dat; else this.data = [];
};
$hxClasses["tannus.ds.Stack_tannus_geom_Line"] = tannus_ds_Stack_$tannus_$geom_$Line;
tannus_ds_Stack_$tannus_$geom_$Line.__name__ = ["tannus","ds","Stack_tannus_geom_Line"];
tannus_ds_Stack_$tannus_$geom_$Line.prototype = {
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
	,copy: function() {
		return new tannus_ds_Stack_$tannus_$geom_$Line(this.data.slice());
	}
	,get_empty: function() {
		return this.data.length == 0;
	}
	,__class__: tannus_ds_Stack_$tannus_$geom_$Line
	,__properties__: {get_empty:"get_empty"}
};
var tannus_ds_Stack_$tannus_$geom_$Point = function(dat) {
	if(dat != null) this.data = dat; else this.data = [];
};
$hxClasses["tannus.ds.Stack_tannus_geom_Point"] = tannus_ds_Stack_$tannus_$geom_$Point;
tannus_ds_Stack_$tannus_$geom_$Point.__name__ = ["tannus","ds","Stack_tannus_geom_Point"];
tannus_ds_Stack_$tannus_$geom_$Point.prototype = {
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
	,copy: function() {
		return new tannus_ds_Stack_$tannus_$geom_$Point(this.data.slice());
	}
	,get_empty: function() {
		return this.data.length == 0;
	}
	,__class__: tannus_ds_Stack_$tannus_$geom_$Point
	,__properties__: {get_empty:"get_empty"}
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
tannus_ds_StringUtils.after = function(s,del) {
	if(tannus_ds_StringUtils.has(s,del)) return s.substring(s.indexOf(del) + 1); else return s;
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
var tannus_events_Event = function(variety,bubbls) {
	if(bubbls == null) bubbls = false;
	this.type = variety;
	this._bubbles = bubbls;
	this._defaultPrevented = false;
	this.onDefaultPrevented = new tannus_io_Signal();
	this.onPropogationStopped = new tannus_io_Signal();
};
$hxClasses["tannus.events.Event"] = tannus_events_Event;
tannus_events_Event.__name__ = ["tannus","events","Event"];
tannus_events_Event.prototype = {
	preventDefault: function() {
		this._defaultPrevented = true;
		this.onDefaultPrevented.broadcast(this._defaultPrevented);
	}
	,stopPropogation: function() {
		this.onPropogationStopped.broadcast(true);
	}
	,get_bubbles: function() {
		return this._bubbles;
	}
	,get_defaultPrevented: function() {
		return this._defaultPrevented;
	}
	,__class__: tannus_events_Event
	,__properties__: {get_defaultPrevented:"get_defaultPrevented",get_bubbles:"get_bubbles"}
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
	res.onDefaultPrevented.listen($bind(e,e.preventDefault),true);
	res.onPropogationStopped.listen($bind(e,e.stopPropagation),true);
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
	result.onDefaultPrevented.listen(function(x) {
		event.preventDefault();
	},true);
	result.onPropogationStopped.listen(function(x1) {
		event.stopPropagation();
	},true);
	return result;
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
var tannus_geom__$Angle_Angle_$Impl_$ = {};
$hxClasses["tannus.geom._Angle.Angle_Impl_"] = tannus_geom__$Angle_Angle_$Impl_$;
tannus_geom__$Angle_Angle_$Impl_$.__name__ = ["tannus","geom","_Angle","Angle_Impl_"];
tannus_geom__$Angle_Angle_$Impl_$.__properties__ = {set_radians:"set_radians",get_radians:"get_radians",set_degrees:"set_degrees",get_degrees:"get_degrees"}
tannus_geom__$Angle_Angle_$Impl_$._new = function(degs) {
	return degs;
};
tannus_geom__$Angle_Angle_$Impl_$.compliment = function(this1) {
	return 360 - this1;
};
tannus_geom__$Angle_Angle_$Impl_$.postincrement = function(this1) {
	var degs = this1++;
	return degs;
};
tannus_geom__$Angle_Angle_$Impl_$.preincrement = function(this1) {
	var degs = ++this1;
	return degs;
};
tannus_geom__$Angle_Angle_$Impl_$.get_degrees = function(this1) {
	return this1;
};
tannus_geom__$Angle_Angle_$Impl_$.set_degrees = function(this1,v) {
	return v < 0?this1 = 0:v > 360?this1 = 360:this1 = v;
};
tannus_geom__$Angle_Angle_$Impl_$.get_radians = function(this1) {
	return this1 * 3.141592653589793 / 180;
};
tannus_geom__$Angle_Angle_$Impl_$.set_radians = function(this1,v) {
	var v1 = v * 180 / 3.141592653589793;
	if(v1 < 0) return this1 = 0; else if(v1 > 360) return this1 = 360; else return this1 = v1;
};
tannus_geom__$Angle_Angle_$Impl_$.toString = function(this1) {
	return this1 + "°";
};
tannus_geom__$Angle_Angle_$Impl_$.fromDegrees = function(fl) {
	return fl;
};
tannus_geom__$Angle_Angle_$Impl_$.fromRadians = function(fl) {
	return fl * 0.0174532925199432955;
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
var tannus_geom_Bezier = function(start,ctrl1,ctrl2,end) {
	this.start = start;
	this.ctrl1 = ctrl1;
	this.ctrl2 = ctrl2;
	this.end = end;
};
$hxClasses["tannus.geom.Bezier"] = tannus_geom_Bezier;
tannus_geom_Bezier.__name__ = ["tannus","geom","Bezier"];
tannus_geom_Bezier.prototype = {
	clone: function() {
		return new tannus_geom_Bezier(this.start,this.ctrl1,this.ctrl2,this.end);
	}
	,equals: function(other) {
		return (function($this) {
			var $r;
			var this1 = $this.start;
			var other1 = other.start;
			$r = this1.get_x() == other1.get_x() && this1.get_y() == other1.get_y() && this1.get_z() == other1.get_z();
			return $r;
		}(this)) && (function($this) {
			var $r;
			var this2 = $this.ctrl1;
			var other2 = other.ctrl1;
			$r = this2.get_x() == other2.get_x() && this2.get_y() == other2.get_y() && this2.get_z() == other2.get_z();
			return $r;
		}(this)) && (function($this) {
			var $r;
			var this3 = $this.ctrl2;
			var other3 = other.ctrl2;
			$r = this3.get_x() == other3.get_x() && this3.get_y() == other3.get_y() && this3.get_z() == other3.get_z();
			return $r;
		}(this)) && (function($this) {
			var $r;
			var this4 = $this.end;
			var other4 = other.end;
			$r = this4.get_x() == other4.get_x() && this4.get_y() == other4.get_y() && this4.get_z() == other4.get_z();
			return $r;
		}(this));
	}
	,flip: function() {
		var temp = this.start.get_x();
		var nx = this.end.get_x();
		this.start.set_x(nx);
		this.end.set_x(temp);
		temp = this.ctrl1.get_x();
		var nx1 = this.ctrl2.get_x();
		this.ctrl1.set_x(nx1);
		this.ctrl2.set_x(temp);
		temp = this.start.get_y();
		var ny = this.end.get_y();
		this.start.set_y(ny);
		this.end.set_y(temp);
		temp = this.ctrl1.get_y();
		var ny1 = this.ctrl2.get_y();
		this.ctrl1.set_y(ny1);
		this.ctrl2.set_y(temp);
	}
	,getPointX: function(pt) {
		var t = pt / 100;
		if(t == 0) return this.start.get_x(); else if(t == 1) return this.end.get_x();
		var lerp = (function(f) {
			return function(a,b,x) {
				return f(a,b,x);
			};
		})(tannus_math_TMath.lerp);
		var ix0 = lerp(this.start.get_x(),this.ctrl1.get_x(),t);
		var ix1 = lerp(this.ctrl1.get_x(),this.ctrl2.get_x(),t);
		var ix2 = lerp(this.ctrl2.get_x(),this.end.get_x(),t);
		ix0 = lerp(ix0,ix1,t);
		ix1 = lerp(ix1,ix2,t);
		return lerp(ix0,ix1,t);
	}
	,getPointY: function(pt) {
		var t = pt / 100;
		if(t == 0) return this.start.get_y(); else if(t == 1) return this.end.get_y();
		var lerp = (function(f) {
			return function(a,b,x) {
				return f(a,b,x);
			};
		})(tannus_math_TMath.lerp);
		var iy0 = lerp(this.start.get_y(),this.ctrl1.get_y(),t);
		var iy1 = lerp(this.ctrl1.get_y(),this.ctrl2.get_y(),t);
		var iy2 = lerp(this.ctrl2.get_y(),this.end.get_y(),t);
		iy0 = lerp(iy0,iy1,t);
		iy1 = lerp(iy1,iy2,t);
		return lerp(iy0,iy1,t);
	}
	,getPoint: function(t) {
		var x = this.getPointX(t);
		var y = this.getPointY(t);
		return new tannus_geom_TPoint(x,y,0);
	}
	,getPoints: function(prec) {
		var results = [];
		var precision;
		if(prec != null) precision = prec; else precision = tannus_geom_Bezier.PRECISION;
		var i = 0;
		while(i < precision) {
			var pt = this.getPoint(i / precision * 100);
			results.push(pt);
			i++;
		}
		return results;
	}
	,__class__: tannus_geom_Bezier
};
var tannus_geom_Shape = function() { };
$hxClasses["tannus.geom.Shape"] = tannus_geom_Shape;
tannus_geom_Shape.__name__ = ["tannus","geom","Shape"];
tannus_geom_Shape.prototype = {
	__class__: tannus_geom_Shape
};
var tannus_geom_Ellipse = function(x,y,w,h) {
	this.pos = new tannus_geom_TPoint(x,y,0);
	this.width = w;
	this.height = h;
};
$hxClasses["tannus.geom.Ellipse"] = tannus_geom_Ellipse;
tannus_geom_Ellipse.__name__ = ["tannus","geom","Ellipse"];
tannus_geom_Ellipse.__interfaces__ = [tannus_geom_Shape];
tannus_geom_Ellipse.prototype = {
	calculateCurves: function() {
		var center = this.get_rect().get_center();
		var x = this.pos.get_x();
		var y = this.pos.get_y();
		var aX = x;
		var aY = y;
		var hB = this.width / 2 * tannus_math_TMath.KAPPA;
		var vB = this.height / 2 * tannus_math_TMath.KAPPA;
		var eX = x + this.width;
		var eY = y + this.height;
		var mX = x + this.width / 2;
		var mY = y + this.height / 2;
		var p = function(x1,y1) {
			return new tannus_geom_TPoint(x1,y1,0);
		};
		var one = new tannus_geom_Bezier(p(aX,mY),p(aX,mY - vB),p(mX - hB,aY),p(mX,aY));
		var two = new tannus_geom_Bezier(p(mX,aY),p(mX + hB,aY),p(eX,mY - vB),p(eX,mY));
		var three = new tannus_geom_Bezier(p(eX,mY),p(eX,mY + vB),p(mX + hB,eY),p(mX,eY));
		var four = new tannus_geom_Bezier(p(mX,eY),p(mX - hB,eY),p(aX,mY + vB),p(aX,mY));
		return [one,two,three,four];
	}
	,getPoints: function() {
		var curves = this.calculateCurves();
		var points = [];
		var _g = 0;
		while(_g < curves.length) {
			var curve = curves[_g];
			++_g;
			points = points.concat(curve.getPoints(null));
		}
		return points;
	}
	,getVertices: function() {
		var v = this.getPoints();
		return new tannus_geom_VertexArray(v);
	}
	,get_rect: function() {
		var _x = this.pos.get_x();
		var _y = this.pos.get_y();
		return new tannus_geom_CRectangle(_x,_y,this.width,this.height);
	}
	,set_rect: function(nr) {
		this.pos.set_x(nr.x);
		this.pos.set_y(nr.y);
		this.width = nr.width;
		this.height = nr.height;
		return this.get_rect();
	}
	,get_center: function() {
		return this.get_rect().get_center();
	}
	,__class__: tannus_geom_Ellipse
	,__properties__: {get_center:"get_center",set_rect:"set_rect",get_rect:"get_rect"}
};
var tannus_geom_Line = function(o,t) {
	this.one = o;
	this.two = t;
};
$hxClasses["tannus.geom.Line"] = tannus_geom_Line;
tannus_geom_Line.__name__ = ["tannus","geom","Line"];
tannus_geom_Line.prototype = {
	toString: function() {
		return "Line<(" + this.one.get_x() + ", " + this.one.get_y() + ") => (" + this.two.get_x() + ", " + this.two.get_y() + ")>";
	}
	,getPoint: function(d) {
		var dist = d;
		var vel;
		var angle = tannus_geom__$Point_Point_$Impl_$.angleTo(this.one,this.two);
		vel = [dist,angle];
		var res;
		var x = Math.cos(vel[1] * 3.141592653589793 / 180) * vel[0];
		var y = Math.sin(vel[1] * 3.141592653589793 / 180) * vel[0];
		res = new tannus_geom_TPoint(x,y,0);
		res = tannus_geom__$Point_Point_$Impl_$.plus(res,this.one);
		res.set_x(tannus_math_TMath.i(res.get_x()));
		res.set_y(tannus_math_TMath.i(res.get_y()));
		res.set_z(tannus_math_TMath.i(res.get_z()));
		return res;
	}
	,getVertices: function() {
		var pts = [];
		var this1 = this.one;
		this1.set_x(tannus_math_TMath.i(this1.get_x()));
		this1.set_y(tannus_math_TMath.i(this1.get_y()));
		this1.set_z(tannus_math_TMath.i(this1.get_z()));
		var this2 = this.two;
		this2.set_x(tannus_math_TMath.i(this2.get_x()));
		this2.set_y(tannus_math_TMath.i(this2.get_y()));
		this2.set_z(tannus_math_TMath.i(this2.get_z()));
		var _g1 = 0;
		var _g = Math.round(tannus_geom__$Point_Point_$Impl_$.distanceFrom(this.one,this.two));
		while(_g1 < _g) {
			var i = _g1++;
			pts.push(this.getPoint(i));
		}
		return new tannus_geom_VertexArray(pts);
	}
	,get_length: function() {
		return tannus_geom__$Point_Point_$Impl_$.distanceFrom(this.one,this.two);
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
	,get_rectangle: function() {
		var min;
		if(tannus_geom__$Point_Point_$Impl_$.distanceFrom(this.one,new tannus_geom_TPoint(0,0,0)) > tannus_geom__$Point_Point_$Impl_$.distanceFrom(this.two,new tannus_geom_TPoint(0,0,0))) min = this.two; else min = this.one;
		var max;
		if(tannus_geom__$Point_Point_$Impl_$.distanceFrom(this.one,new tannus_geom_TPoint(0,0,0)) > tannus_geom__$Point_Point_$Impl_$.distanceFrom(this.two,new tannus_geom_TPoint(0,0,0))) max = this.one; else max = this.two;
		var _x = min.get_x();
		var _y = min.get_y();
		var _width = max.get_x() - min.get_x();
		var _height = max.get_y() - min.get_y();
		return new tannus_geom_CRectangle(_x,_y,_width,_height);
	}
	,__class__: tannus_geom_Line
	,__properties__: {get_rectangle:"get_rectangle",set_end:"set_end",get_end:"get_end",set_start:"set_start",get_start:"get_start",get_length:"get_length"}
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
	return tannus_geom__$Point_Point_$Impl_$.distanceFrom(this1,new tannus_geom_TPoint(0,0,0));
};
tannus_geom__$Point_Point_$Impl_$.distanceFrom = function(this1,other) {
	return Math.sqrt(Math.pow(Math.abs(this1.get_x() - other.get_x()),2) + Math.pow(Math.abs(this1.get_y() - other.get_y()),2));
};
tannus_geom__$Point_Point_$Impl_$.transform = function(this1,m) {
	return m.transformPoint((function($this) {
		var $r;
		var x = this1.get_x();
		var y = this1.get_y();
		var z = this1.get_z();
		$r = new tannus_geom_TPoint(x,y,z);
		return $r;
	}(this)));
};
tannus_geom__$Point_Point_$Impl_$.rotate = function(this1,a,origin) {
	if(origin == null) origin = new tannus_geom_TPoint(0,0,0);
	var s = Math.sin(a * 3.141592653589793 / 180);
	var c = Math.cos(a * 3.141592653589793 / 180);
	var nx = c * (this1.get_x() - origin.get_x()) - s * (this1.get_y() - origin.get_y());
	var ny = s * (this1.get_x() - origin.get_x()) + c * (this1.get_y() - origin.get_y());
	return new tannus_geom_TPoint(nx,ny,0);
};
tannus_geom__$Point_Point_$Impl_$.copyFrom = function(this1,p) {
	var nx = p.get_x();
	this1.set_x(nx);
	var ny = p.get_y();
	this1.set_y(ny);
	var nz = p.get_z();
	this1.set_z(nz);
};
tannus_geom__$Point_Point_$Impl_$.plus = function(this1,other) {
	var x = this1.get_x() + other.get_x();
	var y = this1.get_y() + other.get_y();
	var z = this1.get_z() + other.get_z();
	return new tannus_geom_TPoint(x,y,z);
};
tannus_geom__$Point_Point_$Impl_$.minus = function(this1,other) {
	var x = this1.get_x() - other.get_x();
	var y = this1.get_y() - other.get_y();
	var z = this1.get_z() - other.get_z();
	return new tannus_geom_TPoint(x,y,z);
};
tannus_geom__$Point_Point_$Impl_$.minusFloat = function(this1,n) {
	var x = this1.get_x() - n;
	var y = this1.get_y() - n;
	var z = this1.get_z() - n;
	return new tannus_geom_TPoint(x,y,z);
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
	return this1.multFloat(-1);
};
tannus_geom__$Point_Point_$Impl_$.greaterThan = function(this1,other) {
	return tannus_geom__$Point_Point_$Impl_$.distanceFrom(this1,new tannus_geom_TPoint(0,0,0)) > tannus_geom__$Point_Point_$Impl_$.distanceFrom(other,new tannus_geom_TPoint(0,0,0));
};
tannus_geom__$Point_Point_$Impl_$.lessThan = function(this1,other) {
	return !(tannus_geom__$Point_Point_$Impl_$.distanceFrom(this1,new tannus_geom_TPoint(0,0,0)) > tannus_geom__$Point_Point_$Impl_$.distanceFrom(other,new tannus_geom_TPoint(0,0,0)));
};
tannus_geom__$Point_Point_$Impl_$.equals = function(this1,other) {
	return this1.get_x() == other.get_x() && this1.get_y() == other.get_y() && this1.get_z() == other.get_z();
};
tannus_geom__$Point_Point_$Impl_$.nequals = function(this1,other) {
	return !(this1.get_x() == other.get_x() && this1.get_y() == other.get_y() && this1.get_z() == other.get_z());
};
tannus_geom__$Point_Point_$Impl_$.angleTo = function(this1,other) {
	var angl = tannus_math_TMath.angleBetween(this1.get_x(),this1.get_y(),other.get_x(),other.get_y());
	return angl;
};
tannus_geom__$Point_Point_$Impl_$.clone = function(this1) {
	var x = this1.get_x();
	var y = this1.get_y();
	var z = this1.get_z();
	return new tannus_geom_TPoint(x,y,z);
};
tannus_geom__$Point_Point_$Impl_$.clamp = function(this1) {
	this1.set_x(tannus_math_TMath.i(this1.get_x()));
	this1.set_y(tannus_math_TMath.i(this1.get_y()));
	this1.set_z(tannus_math_TMath.i(this1.get_z()));
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
	return "Point(" + this1.get_x() + ", " + this1.get_y() + ", " + this1.get_z() + ")";
};
tannus_geom__$Point_Point_$Impl_$.toArray = function(this1) {
	return [this1.get_x(),this1.get_y(),this1.get_z()];
};
tannus_geom__$Point_Point_$Impl_$.fromFloatArray = function(a) {
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
tannus_geom__$Point_Point_$Impl_$.fromIntArray = function(a) {
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
tannus_geom__$Point_Point_$Impl_$.perc = function(what,of) {
	return tannus_math__$Percent_Percent_$Impl_$.percent(what,of);
};
var tannus_geom_TPoint = function(x,y,z) {
	this._x = x;
	this._y = y;
	this._z = z;
};
$hxClasses["tannus.geom.TPoint"] = tannus_geom_TPoint;
tannus_geom_TPoint.__name__ = ["tannus","geom","TPoint"];
tannus_geom_TPoint.prototype = {
	dividePoint: function(d) {
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
		var _g = 0;
		var _g1 = o.get_corners();
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(this.contains(p.get_x(),p.get_y())) return true;
		}
		return false;
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
	,get_center: function() {
		return new tannus_geom_TPoint(this.x + this.width / 2,this.y + this.height / 2,0);
	}
	,set_center: function(nc) {
		this.x = nc.get_x() - this.width / 2;
		this.y = nc.get_y() - this.height / 2;
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
	,__properties__: {set_d:"set_d",get_d:"get_d",set_h:"set_h",get_h:"get_h",set_w:"set_w",get_w:"get_w",get_bottomRight:"get_bottomRight",get_bottomLeft:"get_bottomLeft",get_topLeft:"get_topLeft",get_topRight:"get_topRight",set_center:"set_center",get_center:"get_center",get_area:"get_area",get_corners:"get_corners",set_position:"set_position",get_position:"get_position"}
};
var tannus_geom__$Velocity_Velocity_$Impl_$ = {};
$hxClasses["tannus.geom._Velocity.Velocity_Impl_"] = tannus_geom__$Velocity_Velocity_$Impl_$;
tannus_geom__$Velocity_Velocity_$Impl_$.__name__ = ["tannus","geom","_Velocity","Velocity_Impl_"];
tannus_geom__$Velocity_Velocity_$Impl_$.__properties__ = {set_vector:"set_vector",get_vector:"get_vector",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",set_angle:"set_angle",get_angle:"get_angle",set_speed:"set_speed",get_speed:"get_speed"}
tannus_geom__$Velocity_Velocity_$Impl_$._new = function(speed,angle) {
	return [speed,angle];
};
tannus_geom__$Velocity_Velocity_$Impl_$.setVector = function(this1,vx,vy) {
	var e = new tannus_geom_TPoint(vx,vy,0);
	var l = new tannus_geom_Line(tannus_geom__$Point_Point_$Impl_$.fromIntArray([0,0]),e);
	var ns = tannus_geom__$Point_Point_$Impl_$.distanceFrom(l.one,l.two);
	this1[0] = ns;
	var ns1 = tannus_math_TMath.angleBetween(0.0,0.0,e.get_x(),e.get_y());
	this1[1] = ns1;
};
tannus_geom__$Velocity_Velocity_$Impl_$.clone = function(this1) {
	return [this1[0],this1[1]];
};
tannus_geom__$Velocity_Velocity_$Impl_$.inverted = function(this1) {
	return tannus_geom__$Velocity_Velocity_$Impl_$.fromVector(Math.cos(this1[1] * 3.141592653589793 / 180) * this1[0] * -1,Math.sin(this1[1] * 3.141592653589793 / 180) * this1[0] * -1);
};
tannus_geom__$Velocity_Velocity_$Impl_$.plus = function(this1,that) {
	var vec = tannus_geom__$Point_Point_$Impl_$.plus((function($this) {
		var $r;
		var x = Math.cos(this1[1] * 3.141592653589793 / 180) * this1[0];
		var y = Math.sin(this1[1] * 3.141592653589793 / 180) * this1[0];
		$r = new tannus_geom_TPoint(x,y,0);
		return $r;
	}(this)),(function($this) {
		var $r;
		var x1 = Math.cos(that[1] * 3.141592653589793 / 180) * that[0];
		var y1 = Math.sin(that[1] * 3.141592653589793 / 180) * that[0];
		$r = new tannus_geom_TPoint(x1,y1,0);
		return $r;
	}(this)));
	return tannus_geom__$Velocity_Velocity_$Impl_$.fromVector(vec.get_x(),vec.get_y());
};
tannus_geom__$Velocity_Velocity_$Impl_$.minus = function(this1,that) {
	var vec = tannus_geom__$Point_Point_$Impl_$.minus((function($this) {
		var $r;
		var x = Math.cos(this1[1] * 3.141592653589793 / 180) * this1[0];
		var y = Math.sin(this1[1] * 3.141592653589793 / 180) * this1[0];
		$r = new tannus_geom_TPoint(x,y,0);
		return $r;
	}(this)),(function($this) {
		var $r;
		var x1 = Math.cos(that[1] * 3.141592653589793 / 180) * that[0];
		var y1 = Math.sin(that[1] * 3.141592653589793 / 180) * that[0];
		$r = new tannus_geom_TPoint(x1,y1,0);
		return $r;
	}(this)));
	return tannus_geom__$Velocity_Velocity_$Impl_$.fromVector(vec.get_x(),vec.get_y());
};
tannus_geom__$Velocity_Velocity_$Impl_$.get_speed = function(this1) {
	return this1[0];
};
tannus_geom__$Velocity_Velocity_$Impl_$.set_speed = function(this1,ns) {
	return this1[0] = ns;
};
tannus_geom__$Velocity_Velocity_$Impl_$.get_angle = function(this1) {
	return this1[1];
};
tannus_geom__$Velocity_Velocity_$Impl_$.set_angle = function(this1,ns) {
	return this1[1] = ns;
};
tannus_geom__$Velocity_Velocity_$Impl_$.get_x = function(this1) {
	return Math.cos(this1[1] * 3.141592653589793 / 180) * this1[0];
};
tannus_geom__$Velocity_Velocity_$Impl_$.set_x = function(this1,nx) {
	tannus_geom__$Velocity_Velocity_$Impl_$.setVector(this1,nx,Math.sin(this1[1] * 3.141592653589793 / 180) * this1[0]);
	return nx;
};
tannus_geom__$Velocity_Velocity_$Impl_$.get_y = function(this1) {
	return Math.sin(this1[1] * 3.141592653589793 / 180) * this1[0];
};
tannus_geom__$Velocity_Velocity_$Impl_$.set_y = function(this1,ny) {
	tannus_geom__$Velocity_Velocity_$Impl_$.setVector(this1,Math.cos(this1[1] * 3.141592653589793 / 180) * this1[0],ny);
	return ny;
};
tannus_geom__$Velocity_Velocity_$Impl_$.get_vector = function(this1) {
	var x = Math.cos(this1[1] * 3.141592653589793 / 180) * this1[0];
	var y = Math.sin(this1[1] * 3.141592653589793 / 180) * this1[0];
	return new tannus_geom_TPoint(x,y,0);
};
tannus_geom__$Velocity_Velocity_$Impl_$.set_vector = function(this1,nv) {
	tannus_geom__$Velocity_Velocity_$Impl_$.setVector(this1,nv.get_x(),nv.get_y());
	var x = Math.cos(this1[1] * 3.141592653589793 / 180) * this1[0];
	var y = Math.sin(this1[1] * 3.141592653589793 / 180) * this1[0];
	return new tannus_geom_TPoint(x,y,0);
};
tannus_geom__$Velocity_Velocity_$Impl_$.fromVector = function(x,y) {
	var v = [0,0];
	tannus_geom__$Velocity_Velocity_$Impl_$.set_vector(v,new tannus_geom_TPoint(x,y,0));
	return v;
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
		} else {
			var x = p.get_x();
			var y = p.get_y();
			var z = p.get_z();
			return new tannus_geom_TPoint(x,y,z);
		}
	}
	,toMutable: function(p) {
		if(js_Boot.__instanceof(p,tannus_geom_ImmutablePoint)) {
			var np = new tannus_geom_TPoint(0,0,0);
			var nx = p.get_x();
			np.set_x(nx);
			var ny = p.get_y();
			np.set_y(ny);
			var nz = p.get_z();
			np.set_z(nz);
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
		return new tannus_ds_Stack_$tannus_$geom_$Line(this.calculateLines(close));
	}
	,pointStack: function() {
		var rdat = this.data.slice();
		rdat.reverse();
		return new tannus_ds_Stack_$tannus_$geom_$Point(rdat);
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
		while(!(s.data.length == 0)) {
			var x1 = s.pop();
			var y = s.peek();
			if(Math.round(tannus_geom__$Point_Point_$Impl_$.distanceFrom(x1,y)) < threshold) s.add(y); else pass(x1);
		}
		if(this.data.length != ndata.length) {
			this.data = ndata;
			this.resetCache();
		}
	}
	,each: function(f) {
		var points = this.pointStack();
		while(!(points.data.length == 0)) {
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
		_g.push((function($this) {
			var $r;
			var x = p.get_x();
			var y = p.get_y();
			var z = p.get_z();
			$r = new tannus_geom_TPoint(x,y,z);
			return $r;
		}(this)));
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
		var ba = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
		tannus_io__$ByteArray_ByteArray_$Impl_$.writeString(ba,s);
		return ba;
	}
};
tannus_graphics__$Color_Color_$Impl_$.toInt = function(this1) {
	return this1.toInt();
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
		return this._red == other._red && this._green == other._green && this._blue == other._blue && this._alpha == other._alpha;
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
tannus_html__$Win_Win_$Impl_$.get_viewport = function(this1) {
	return new tannus_geom_CRectangle(this1.scrollX,this1.scrollY,this1.innerWidth,this1.innerHeight);
};
tannus_html__$Win_Win_$Impl_$.get_current = function() {
	return window;
};
var tannus_internal_CompileTime = function() { };
$hxClasses["tannus.internal.CompileTime"] = tannus_internal_CompileTime;
tannus_internal_CompileTime.__name__ = ["tannus","internal","CompileTime"];
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
var tannus_io__$Blob_Blob_$Impl_$ = {};
$hxClasses["tannus.io._Blob.Blob_Impl_"] = tannus_io__$Blob_Blob_$Impl_$;
tannus_io__$Blob_Blob_$Impl_$.__name__ = ["tannus","io","_Blob","Blob_Impl_"];
tannus_io__$Blob_Blob_$Impl_$._new = function(name,mime,dat) {
	return new tannus_io_CBlob(name,mime,dat);
};
tannus_io__$Blob_Blob_$Impl_$.toNativeBlob = function(this1) {
	return new Blob([tannus_io__$ByteArray_ByteArray_$Impl_$.toArrayBuffer(this1.data)],{ 'type' : this1.type});
};
tannus_io__$Blob_Blob_$Impl_$.toObjectURL = function(this1) {
	var courl = URL.createObjectURL;
	return courl(new Blob([tannus_io__$ByteArray_ByteArray_$Impl_$.toArrayBuffer(this1.data)],{ 'type' : this1.type}));
};
tannus_io__$Blob_Blob_$Impl_$.fromDataURL = function(durl) {
	return tannus_io_CBlob.fromDataURL(durl);
};
var tannus_io_CBlob = function(nam,mime,dat) {
	this.name = nam;
	this.type = mime != null?mime:"text/plain";
	var alt = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
	if(dat != null) this.data = dat; else this.data = alt;
};
$hxClasses["tannus.io.CBlob"] = tannus_io_CBlob;
tannus_io_CBlob.__name__ = ["tannus","io","CBlob"];
tannus_io_CBlob.fromDataURL = function(durl) {
	durl = durl.substring(5);
	var bits = durl.split(";");
	var mime = bits.shift();
	var encoded = durl.substring(durl.indexOf(",") + 1,durl.length - 1);
	var data;
	var b = haxe_crypto_Base64.decode(encoded);
	{
		var ba = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
		if(b.length > 0) {
			var _g1 = 0;
			var _g = b.length;
			while(_g1 < _g) {
				var i = _g1++;
				var n = b.b[i];
				ba.push(n);
			}
		}
		data = ba;
	}
	return new tannus_io_CBlob("file",mime,data);
};
tannus_io_CBlob.prototype = {
	save: function(dirname) {
		var f = new tannus_sys_CFile("" + dirname + "/" + this.name);
		tannus_sys_JavaScriptFileSystem.write(f._path,this.data);
		return f;
	}
	,toDataURL: function() {
		var encoded = haxe_crypto_Base64.encode((function($this) {
			var $r;
			var this1 = $this.data;
			var buf = haxe_io_Bytes.alloc(this1.length);
			tannus_io__$ByteArray_ByteArray_$Impl_$.each(this1,function(i,b) {
				buf.b[i] = b & 255;
			});
			$r = buf;
			return $r;
		}(this)));
		return "data:" + this.type + ";base64," + encoded;
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
	var s = "";
	while(s.length < times) s += String.fromCharCode(this1);
	return s;
};
tannus_io__$Byte_Byte_$Impl_$.toString = function(this1) {
	return String.fromCharCode(this1);
};
tannus_io__$Byte_Byte_$Impl_$.toInt = function(this1) {
	return this1;
};
tannus_io__$Byte_Byte_$Impl_$.fromString = function(s) {
	var b = 0;
	var n = HxOverrides.cca(s,0);
	if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
	b = n;
	String.fromCharCode(b);
	return b;
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
tannus_io__$ByteArray_ByteArray_$Impl_$.__properties__ = {set_last:"set_last",get_last:"get_last",set_first:"set_first",get_first:"get_first",get_empty:"get_empty",get_self:"get_self"}
tannus_io__$ByteArray_ByteArray_$Impl_$._new = function(a) {
	return a != null?a:[];
};
tannus_io__$ByteArray_ByteArray_$Impl_$.get = function(this1,i) {
	return this1[i];
};
tannus_io__$ByteArray_ByteArray_$Impl_$.set = function(this1,i,nb) {
	this1[i] = nb;
	return this1[i];
};
tannus_io__$ByteArray_ByteArray_$Impl_$.iterator = function(this1) {
	return HxOverrides.iter(this1);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.get_self = function(this1) {
	return this1;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.get_empty = function(this1) {
	return this1.length == 0;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.get_first = function(this1) {
	return this1[0];
};
tannus_io__$ByteArray_ByteArray_$Impl_$.set_first = function(this1,nf) {
	return this1[0] = nf;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.get_last = function(this1) {
	return this1[this1.length - 1];
};
tannus_io__$ByteArray_ByteArray_$Impl_$.set_last = function(this1,nl) {
	return this1[this1.length - 1] = nl;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.each = function(this1,func,start,end) {
	var index;
	if(start != null) index = start; else index = 0;
	var goal;
	if(end != null) goal = end; else goal = this1.length;
	if(index < 0) {
		if(end == null) {
			var _i = index;
			index = this1.length + _i;
		} else throw new js__$Boot_HaxeError("Invalid start index " + index + "!");
	}
	var cb;
	while(index < goal) {
		cb = this1[index];
		func(index,cb);
		index++;
	}
};
tannus_io__$ByteArray_ByteArray_$Impl_$.slice = function(this1,start,end) {
	{
		var ia = this1.slice(start,end);
		return tannus_io__$ByteArray_ByteArray_$Impl_$._new(ia.map(function(n) {
			var this2;
			if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
			this2 = n;
			return this2;
		}));
	}
};
tannus_io__$ByteArray_ByteArray_$Impl_$.indexOf = function(this1,sub) {
	var _g1 = 0;
	var _g = this1.length - sub.length;
	while(_g1 < _g) {
		var i = _g1++;
		var hunk = tannus_io__$ByteArray_ByteArray_$Impl_$.slice(this1,i,i + sub.length);
		console.log(hunk.map(function(b) {
			return String.fromCharCode(b);
		}).join(""));
		if(tannus_io__$ByteArray_ByteArray_$Impl_$.equals_byteArray(hunk,sub)) return i;
	}
	return -1;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.contains = function(this1,sub) {
	return tannus_io__$ByteArray_ByteArray_$Impl_$.indexOf(this1,sub) != -1;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.writeString = function(this1,s) {
	var _g = 0;
	var _g1 = s.split("");
	while(_g < _g1.length) {
		var c = _g1[_g];
		++_g;
		this1.push((function($this) {
			var $r;
			var b = 0;
			{
				var n = HxOverrides.cca(c,0);
				if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
				b = n;
				String.fromCharCode(b);
			}
			$r = b;
			return $r;
		}(this)));
	}
};
tannus_io__$ByteArray_ByteArray_$Impl_$.getString = function(this1,len) {
	var this2 = tannus_io__$ByteArray_ByteArray_$Impl_$.slice(this1,0,len != null?len:this1.length);
	return this2.map(function(b) {
		return String.fromCharCode(b);
	}).join("");
};
tannus_io__$ByteArray_ByteArray_$Impl_$.writeFloat = function(this1,f) {
	var b;
	var this2 = this1;
	var buf = haxe_io_Bytes.alloc(this2.length);
	tannus_io__$ByteArray_ByteArray_$Impl_$.each(this2,function(i,b1) {
		buf.b[i] = b1 & 255;
	});
	b = buf;
	b.setFloat(this1.length,f);
	var this3;
	var ba = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
	if(b.length > 0) {
		var _g1 = 0;
		var _g = b.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			var n = b.b[i1];
			ba.push(n);
		}
	}
	this3 = ba;
	this1 = this3;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.readFloat = function(this1,i) {
	if(i == null) i = this1.length;
	var b;
	var this2 = this1;
	var buf = haxe_io_Bytes.alloc(this2.length);
	tannus_io__$ByteArray_ByteArray_$Impl_$.each(this2,function(i1,b1) {
		buf.b[i1] = b1 & 255;
	});
	b = buf;
	var res = b.getFloat(this1.length);
	var this3;
	var ba = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
	if(b.length > 0) {
		var _g1 = 0;
		var _g = b.length;
		while(_g1 < _g) {
			var i2 = _g1++;
			var n = b.b[i2];
			ba.push(n);
		}
	}
	this3 = ba;
	this1 = this3;
	return res;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.write = function(this1,ba) {
	this1 = this1.concat(ba);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.writeByte = function(this1,b) {
	this1.push(b);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.append = function(this1,data) {
	var $it0 = HxOverrides.iter(data);
	while( $it0.hasNext() ) {
		var b = $it0.next();
		this1.push(b);
	}
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toDataURI = function(this1,mime) {
	if(mime == null) mime = "text/plain";
	var encoded = haxe_crypto_Base64.encode((function($this) {
		var $r;
		var this2 = this1;
		var buf = haxe_io_Bytes.alloc(this2.length);
		tannus_io__$ByteArray_ByteArray_$Impl_$.each(this2,function(i,b) {
			buf.b[i] = b & 255;
		});
		$r = buf;
		return $r;
	}(this)));
	return "data:" + mime + ";base64," + encoded;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.chunk = function(this1,len,end) {
	if(end == null) end = false;
	var chnk = [];
	var rip;
	var f1 = (function(f) {
		return function() {
			return f();
		};
	})(end?$bind(this1,this1.pop):$bind(this1,this1.shift));
	rip = f1;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		var b = rip();
		if(b != null) chnk.push(b); else throw new js__$Boot_HaxeError("IncompleteChunkError: Byte-Retrieval failed on byte " + i + "/" + len + "!");
	}
	return chnk;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.equals_byteArray = function(this1,other) {
	if(this1.length != other.length) return false; else {
		var i = 0;
		while(i < this1.length) {
			if(this1[i] != other[i]) return false;
			i++;
		}
		return true;
	}
};
tannus_io__$ByteArray_ByteArray_$Impl_$.plus = function(this1,other) {
	{
		var ia = this1.concat(other);
		return tannus_io__$ByteArray_ByteArray_$Impl_$._new(ia.map(function(n) {
			var this2;
			if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
			this2 = n;
			return this2;
		}));
	}
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toArray = function(this1) {
	return this1;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toIntArray = function(this1) {
	return this1.map(function(b) {
		return b;
	});
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toString = function(this1) {
	return this1.map(function(b) {
		return String.fromCharCode(b);
	}).join("");
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toBase64 = function(this1) {
	var b;
	{
		var this2 = this1;
		var buf = haxe_io_Bytes.alloc(this2.length);
		tannus_io__$ByteArray_ByteArray_$Impl_$.each(this2,function(i,b1) {
			buf.b[i] = b1 & 255;
		});
		b = buf;
	}
	return haxe_crypto_Base64.encode(b);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toBytes = function(this1) {
	var buf = haxe_io_Bytes.alloc(this1.length);
	tannus_io__$ByteArray_ByteArray_$Impl_$.each(this1,function(i,b) {
		buf.b[i] = b & 255;
	});
	return buf;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toUint8Array = function(this1) {
	return new Uint8Array(this1);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toArrayBuffer = function(this1) {
	return tannus_io__$ByteArray_ByteArray_$Impl_$.toUint8Array(this1);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.fromIntArray = function(ia) {
	return tannus_io__$ByteArray_ByteArray_$Impl_$._new(ia.map(function(n) {
		var this1;
		if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
		this1 = n;
		return this1;
	}));
};
tannus_io__$ByteArray_ByteArray_$Impl_$.fromFloatArray = function(ia) {
	return tannus_io__$ByteArray_ByteArray_$Impl_$._new(ia.map(function(n) {
		var n1 = Math.round(n);
		var this1;
		if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n1)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n1 + ")!");
		this1 = n1;
		return this1;
	}));
};
tannus_io__$ByteArray_ByteArray_$Impl_$.fromBytes = function(buf) {
	var ba = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
	if(buf.length > 0) {
		var _g1 = 0;
		var _g = buf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var n = buf.b[i];
			ba.push(n);
		}
	}
	return ba;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.fromArrayBuffer = function(abuf) {
	var ui = new Uint8Array(abuf);
	var ia;
	var _g = [];
	var _g1 = 0;
	while(_g1 < ui.length) {
		var i = ui[_g1];
		++_g1;
		_g.push(i);
	}
	ia = _g;
	return tannus_io__$ByteArray_ByteArray_$Impl_$._new(ia.map(function(n) {
		var this1;
		if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
		this1 = n;
		return this1;
	}));
};
tannus_io__$ByteArray_ByteArray_$Impl_$.fromString = function(s) {
	var ba = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
	tannus_io__$ByteArray_ByteArray_$Impl_$.writeString(ba,s);
	return ba;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.fromBase64 = function(s) {
	var b = haxe_crypto_Base64.decode(s);
	{
		var ba = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
		if(b.length > 0) {
			var _g1 = 0;
			var _g = b.length;
			while(_g1 < _g) {
				var i = _g1++;
				var n = b.b[i];
				ba.push(n);
			}
		}
		return ba;
	}
};
var tannus_io_ByteInput = function(data) {
	this.source = data;
	this.onComplete = new tannus_io_Signal();
};
$hxClasses["tannus.io.ByteInput"] = tannus_io_ByteInput;
tannus_io_ByteInput.__name__ = ["tannus","io","ByteInput"];
tannus_io_ByteInput.fromString = function(s) {
	return new tannus_io_ByteInput((function($this) {
		var $r;
		var ba = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
		tannus_io__$ByteArray_ByteArray_$Impl_$.writeString(ba,s);
		$r = ba;
		return $r;
	}(this)));
};
tannus_io_ByteInput.__super__ = haxe_io_Input;
tannus_io_ByteInput.prototype = $extend(haxe_io_Input.prototype,{
	next: function() {
		return this.readByte();
	}
	,back: function(bit) {
		this.source.unshift(bit);
	}
	,readByte: function() {
		if(!(this.source.length == 0)) {
			var i;
			var this1 = this.source.shift();
			i = this1;
			return i;
		} else {
			this.onComplete.broadcast(this);
			throw new js__$Boot_HaxeError("Eof");
		}
	}
	,__class__: tannus_io_ByteInput
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
var tannus_io__$Pointer_Pointer_$Impl_$ = {};
$hxClasses["tannus.io._Pointer.Pointer_Impl_"] = tannus_io__$Pointer_Pointer_$Impl_$;
tannus_io__$Pointer_Pointer_$Impl_$.__name__ = ["tannus","io","_Pointer","Pointer_Impl_"];
tannus_io__$Pointer_Pointer_$Impl_$.__properties__ = {set_deleter:"set_deleter",get_deleter:"get_deleter",get_set:"get_set",get_get:"get_get",set__:"set__",get__:"get__",set_setter:"set_setter",get_setter:"get_setter",set_getter:"set_getter",get_getter:"get_getter",set_v:"set_v",get_v:"get_v",set_value:"set_value",get_value:"get_value",get_self:"get_self"}
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
tannus_io__$Pointer_Pointer_$Impl_$.transform = function(this1,mget,mset) {
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
var tannus_io_ReadableStream = function() {
	this.dataEvent = new tannus_io_Signal();
	this.errorEvent = new tannus_io_Signal();
	this._buffer = [];
	this.opened = false;
	this.closed = false;
	this.paused = false;
};
$hxClasses["tannus.io.ReadableStream"] = tannus_io_ReadableStream;
tannus_io_ReadableStream.__name__ = ["tannus","io","ReadableStream"];
tannus_io_ReadableStream.prototype = {
	ondata: function(cb) {
		this.dataEvent.listen(cb,false);
	}
	,onerror: function(cb) {
		this.errorEvent.listen(cb,false);
	}
	,get: function(cb) {
		var _g = this;
		this.dataEvent.listen(function(data) {
			cb(data);
			_g.close();
		},true);
		this.open();
	}
	,open: function(cb) {
		this.opened = true;
	}
	,close: function() {
		this.closed = true;
	}
	,pause: function() {
		this.paused = true;
	}
	,resume: function() {
		this.paused = false;
		this.flush();
	}
	,buffer: function(d) {
		this._buffer.push(d);
	}
	,provide: function(d) {
		this.dataEvent.broadcast(d);
	}
	,write: function(d) {
		(this.paused?$bind(this,this.buffer):$bind(this,this.provide))(d);
	}
	,flush: function() {
		var _g = 0;
		var _g1 = this._buffer;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			this.dataEvent.broadcast(item);
		}
		this._buffer = [];
	}
	,__class__: tannus_io_ReadableStream
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
		var toIgnore = [];
		var _g = 0;
		var _g1 = this.handlers;
		while(_g < _g1.length) {
			var h = _g1[_g];
			++_g;
			switch(h[1]) {
			case 0:
				var f = h[2];
				if(Reflect.compareMethods(f,func)) toIgnore.push(h);
				break;
			case 3:
				var f1 = h[2];
				if(Reflect.compareMethods(f1,func)) toIgnore.push(h);
				break;
			case 4:
				var f2 = h[2];
				if(Reflect.compareMethods(f2,func)) toIgnore.push(h);
				break;
			case 1:
				var f3 = h[2];
				if(Reflect.compareMethods(f3,func)) toIgnore.push(h);
				break;
			case 2:
				var f4 = h[2];
				if(Reflect.compareMethods(f4,func)) toIgnore.push(h);
				break;
			}
		}
		var _g2 = 0;
		while(_g2 < toIgnore.length) {
			var h1 = toIgnore[_g2];
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
var tannus_math_Nums = function() { };
$hxClasses["tannus.math.Nums"] = tannus_math_Nums;
tannus_math_Nums.__name__ = ["tannus","math","Nums"];
tannus_math_Nums.max = function(x,y) {
	if(x > y) return x; else return y;
};
tannus_math_Nums.min = function(x,y) {
	if(x < y) return x; else return y;
};
tannus_math_Nums.clamp = function(value,x,y) {
	var result = value;
	result = value < y?value:y;
	result = value > x?value:x;
	return result;
};
var tannus_math__$Percent_Percent_$Impl_$ = {};
$hxClasses["tannus.math._Percent.Percent_Impl_"] = tannus_math__$Percent_Percent_$Impl_$;
tannus_math__$Percent_Percent_$Impl_$.__name__ = ["tannus","math","_Percent","Percent_Impl_"];
tannus_math__$Percent_Percent_$Impl_$.__properties__ = {set_value:"set_value",get_value:"get_value"}
tannus_math__$Percent_Percent_$Impl_$._new = function(f) {
	return f;
};
tannus_math__$Percent_Percent_$Impl_$.get_value = function(this1) {
	return this1;
};
tannus_math__$Percent_Percent_$Impl_$.set_value = function(this1,nv) {
	return this1 = nv;
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
var tannus_math_TMath = function() { };
$hxClasses["tannus.math.TMath"] = tannus_math_TMath;
tannus_math_TMath.__name__ = ["tannus","math","TMath"];
tannus_math_TMath.clamp_Int = function(value,min,max) {
	if(value < min) return min; else if(value > max) return max; else return value;
};
tannus_math_TMath.clamp_Float = function(value,min,max) {
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
var tannus_nore_Check = $hxClasses["tannus.nore.Check"] = { __ename__ : ["tannus","nore","Check"], __constructs__ : ["NoCheck","IDCheck","TypeCheck","FieldExistsCheck","FieldValueCheck","FieldSubChecks","GroupCheck","HelperCheck","TupleCheck","InverseCheck","EitherCheck","TernaryCheck"] };
tannus_nore_Check.NoCheck = ["NoCheck",0];
tannus_nore_Check.NoCheck.toString = $estr;
tannus_nore_Check.NoCheck.__enum__ = tannus_nore_Check;
tannus_nore_Check.IDCheck = function(id) { var $x = ["IDCheck",1,id]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.TypeCheck = function(typename) { var $x = ["TypeCheck",2,typename]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.FieldExistsCheck = function(field) { var $x = ["FieldExistsCheck",3,field]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.FieldValueCheck = function(field,op,value) { var $x = ["FieldValueCheck",4,field,op,value]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.FieldSubChecks = function(field,sub) { var $x = ["FieldSubChecks",5,field,sub]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.GroupCheck = function(subchecks) { var $x = ["GroupCheck",6,subchecks]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.HelperCheck = function(helper,args) { var $x = ["HelperCheck",7,helper,args]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.TupleCheck = function(tup) { var $x = ["TupleCheck",8,tup]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.InverseCheck = function(check) { var $x = ["InverseCheck",9,check]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.EitherCheck = function(left,right) { var $x = ["EitherCheck",10,left,right]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.TernaryCheck = function(condition,ifTrue,ifFalse) { var $x = ["TernaryCheck",11,condition,ifTrue,ifFalse]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
var tannus_nore_Compiler = function() {
	this.functions = [];
	this.checks = [];
	this.operators = new haxe_ds_StringMap();
	this.helpers = new haxe_ds_StringMap();
	this.initializeOperators();
	this.initializeHelpers();
};
$hxClasses["tannus.nore.Compiler"] = tannus_nore_Compiler;
tannus_nore_Compiler.__name__ = ["tannus","nore","Compiler"];
tannus_nore_Compiler.compile = function(ast) {
	var compiler = new tannus_nore_Compiler();
	return compiler.compileAST(ast);
};
tannus_nore_Compiler.prototype = {
	push: function(checker) {
		this.functions.push(checker);
	}
	,operator: function(symbol,func) {
		{
			this.operators.set(symbol,func);
			func;
		}
	}
	,initializeOperators: function() {
		{
			this.operators.set("==",function(left,right) {
				return left == right;
			});
			(function(left,right) {
				return left == right;
			});
		}
		{
			this.operators.set("!=",function(left1,right1) {
				return left1 != right1;
			});
			(function(left1,right1) {
				return left1 != right1;
			});
		}
		{
			this.operators.set(">",function(left2,right2) {
				return left2 > right2;
			});
			(function(left2,right2) {
				return left2 > right2;
			});
		}
		{
			this.operators.set("<",function(left3,right3) {
				return left3 < right3;
			});
			(function(left3,right3) {
				return left3 < right3;
			});
		}
		{
			this.operators.set(">=",function(left4,right4) {
				return left4 >= right4;
			});
			(function(left4,right4) {
				return left4 >= right4;
			});
		}
		{
			this.operators.set("<=",function(left5,right5) {
				return left5 <= right5;
			});
			(function(left5,right5) {
				return left5 <= right5;
			});
		}
		{
			this.operators.set("^=",function(left6,right6) {
				return StringTools.startsWith(left6,right6);
			});
			(function(left6,right6) {
				return StringTools.startsWith(left6,right6);
			});
		}
		{
			this.operators.set("$=",function(left7,right7) {
				return StringTools.endsWith(left7,right7);
			});
			(function(left7,right7) {
				return StringTools.endsWith(left7,right7);
			});
		}
		{
			this.operators.set("*=",function(left8,right8) {
				return Std.string(left8).indexOf(right8) != -1;
			});
			(function(left8,right8) {
				return Std.string(left8).indexOf(right8) != -1;
			});
		}
	}
	,helper: function(name,func) {
		var _g1 = this;
		var wrapper = function(target,vargs) {
			var args = [];
			var _g = 0;
			while(_g < vargs.length) {
				var val = vargs[_g];
				++_g;
				var getter = _g1.compileValue(val);
				var result = getter(target);
				args.push(result);
			}
			return func(target,args);
		};
		{
			this.helpers.set(name,wrapper);
			wrapper;
		}
	}
	,initializeHelpers: function() {
		tannus_nore_Compiler.initHelpers.broadcast($bind(this,this.helper));
		var iterate = function(o) {
			var iter = Reflect.getProperty(o,"iterator");
			if(iter != null) {
				var callable = Reflect.isFunction(iter);
				if(callable) try {
					var res = Reflect.callMethod(o,iter,[]);
					if(res != null) return res; else return null;
				} catch( err ) {
					if (err instanceof js__$Boot_HaxeError) err = err.val;
					if( js_Boot.__instanceof(err,String) ) {
						return null;
					} else throw(err);
				} else return null;
			} else return null;
		};
		var has = function(o1,args) {
			if(typeof(o1) == "string") {
				var str = Std.string(o1);
				var _g = 0;
				while(_g < args.length) {
					var a = args[_g];
					++_g;
					var s = Std.string(a);
					if(str.indexOf(s) != -1) return true;
				}
				return false;
			} else {
				var iter1 = iterate(o1);
				if(iter1 != null) {
					var values;
					var _g1 = [];
					while( iter1.hasNext() ) {
						var x = iter1.next();
						_g1.push(x);
					}
					values = _g1;
					var _g11 = 0;
					while(_g11 < args.length) {
						var a1 = args[_g11];
						++_g11;
						if(Lambda.has(values,a1)) return true;
					}
					return false;
				} else return false;
			}
		};
		this.helper("has",has);
		this.helper("contains",has);
	}
	,compileValue: function(value) {
		switch(value[1]) {
		case 0:
			var num = value[2];
			return function(o) {
				return num;
			};
		case 1:
			var str = value[2];
			return function(o1) {
				return str;
			};
		case 5:
			var vals = value[2];
			var vgetters;
			var _g = [];
			var _g1 = 0;
			while(_g1 < vals.length) {
				var v = vals[_g1];
				++_g1;
				_g.push(this.compileValue(v));
			}
			vgetters = _g;
			return function(o2) {
				var _g11 = [];
				var _g2 = 0;
				while(_g2 < vgetters.length) {
					var f = vgetters[_g2];
					++_g2;
					_g11.push(f(o2));
				}
				return _g11;
			};
		case 2:
			var field = value[2];
			var getter = (function(f1,a1) {
				return function(o3) {
					return f1(o3,a1);
				};
			})(Reflect.getProperty,field);
			return function(o4) {
				return getter(o4);
			};
		case 3:
			var index = value[2];
			return function(o5) {
				try {
					var arr;
					arr = js_Boot.__cast(o5 , Array);
					return arr[index];
				} catch( err ) {
					if (err instanceof js__$Boot_HaxeError) err = err.val;
					if( js_Boot.__instanceof(err,String) ) {
						try {
							var s = o5;
							return s.charAt(index);
						} catch( err1 ) {
							if (err1 instanceof js__$Boot_HaxeError) err1 = err1.val;
							if( js_Boot.__instanceof(err1,String) ) {
								throw new js__$Boot_HaxeError("TypeError: Cannot access index " + index + " of " + Std.string(o5) + "!");
							} else throw(err1);
						}
					} else throw(err);
				}
			};
		default:
			throw new js__$Boot_HaxeError("Unable to handle " + Std.string(value) + "!");
		}
	}
	,compileValueChecker: function(val,checker) {
		switch(val[1]) {
		case 0:
			var num = val[2];
			return function(o,v) {
				return checker(v,num);
			};
		case 1:
			var str = val[2];
			return function(o1,v1) {
				return checker(v1,str);
			};
		case 5:
			var vals = val[2];
			var vgetters;
			var _g = [];
			var _g1 = 0;
			while(_g1 < vals.length) {
				var vv = vals[_g1];
				++_g1;
				_g.push(this.compileValue(vv));
			}
			vgetters = _g;
			return function(o2,v2) {
				var _g11 = 0;
				while(_g11 < vgetters.length) {
					var f = vgetters[_g11];
					++_g11;
					var validated = checker(v2,f(o2));
					if(!validated) return false;
				}
				return true;
			};
		case 4:
			var index = val[3];
			var field = val[2];
			var getter = this.compileValue(val);
			return function(o3,v3) {
				var p = getter(o3);
				return checker(v3,p);
			};
		case 2:
			var field1 = val[2];
			var getter1 = this.compileValue(val);
			return function(o4,v4) {
				var p1 = getter1(o4);
				return checker(v4,p1);
			};
		case 3:
			var index1 = val[2];
			var getter2 = this.compileValue(val);
			return function(o5,v5) {
				var p2 = getter2(o5);
				return checker(v5,p2);
			};
		}
	}
	,compileCheck: function(check) {
		var _g = this;
		switch(check[1]) {
		case 0:
			return function(o) {
				return true;
			};
		case 1:
			var id = check[2];
			return (function(f) {
				return function(a1) {
					return f(a1);
				};
			})(this.check_id(id));
		case 2:
			var typename = check[2];
			return (function(f1) {
				return function(a11) {
					return f1(a11);
				};
			})(this.type_check(typename));
		case 3:
			var field = check[2];
			return (function(f2) {
				return function(a12) {
					return f2(a12);
				};
			})(this.field_exists_check(field));
		case 4:
			var val = check[4];
			var operation = check[3];
			var field1 = check[2];
			return (function(f3) {
				return function(a13) {
					return f3(a13);
				};
			})(this.field_value_check(field1,operation,val));
		case 5:
			var checks = check[3];
			var field2 = check[2];
			return (function(f4) {
				return function(a14) {
					return f4(a14);
				};
			})(this.field_sub_checks(field2,checks));
		case 9:
			var check1 = check[2];
			var checker = this.compileCheck(check1);
			return function(o1) {
				return !checker(o1);
			};
		case 10:
			var two = check[3];
			var one = check[2];
			var oner = this.compileCheck(one);
			var twoer = this.compileCheck(two);
			return function(o2) {
				return oner(o2) || twoer(o2);
			};
		case 6:
			var subs = check[2];
			var checker1 = tannus_nore_Compiler.compile(subs);
			return checker1;
		case 11:
			var ifFalseCheck = check[4];
			var ifTrueCheck = check[3];
			var conCheck = check[2];
			var con = this.compileCheck(conCheck);
			var ifTrue = this.compileCheck(ifTrueCheck);
			var ifFalse = this.compileCheck(ifFalseCheck);
			return function(o3) {
				if(con(o3)) return ifTrue(o3); else return ifFalse(o3);
			};
		case 7:
			var vargs = check[3];
			var helper = check[2];
			var args = [];
			if(vargs != null) args = vargs;
			return function(o4) {
				if(_g.helpers.exists(helper)) {
					var func = _g.helpers.get(helper);
					if(Reflect.isFunction(func)) try {
						var result = func(o4,args);
						return result;
					} catch( err ) {
						if (err instanceof js__$Boot_HaxeError) err = err.val;
						if( js_Boot.__instanceof(err,String) ) {
							console.log("Error invoking Helper-Function: " + err);
							return false;
						} else throw(err);
					} else return false;
				} else {
					var prop = Reflect.getProperty(o4,helper);
					if(prop != null) {
						if(Reflect.isFunction(prop)) try {
							var dyn_result = Reflect.callMethod(o4,prop,args);
							if(dyn_result == null) return false;
							return dyn_result == true;
						} catch( err1 ) {
							if (err1 instanceof js__$Boot_HaxeError) err1 = err1.val;
							if( js_Boot.__instanceof(err1,String) ) {
								return false;
							} else throw(err1);
						} else {
							var typ = tannus_internal_TypeTools.typename(prop);
							switch(typ) {
							case "Number":
								return prop > 0;
							case "Bool":
								return prop == true;
							default:
								return true;
							}
						}
					} else return false;
				}
			};
		default:
			throw new js__$Boot_HaxeError("UnknownCheckError: Cannot compile " + Std.string(check) + "!");
		}
	}
	,compileAST: function(ast) {
		var _g = this;
		this.functions = [];
		this.checks = [];
		this.checks = ast;
		var _g1 = 0;
		var _g11 = this.checks;
		while(_g1 < _g11.length) {
			var check = _g11[_g1];
			++_g1;
			var func = this.compileCheck(check);
			this.functions.push(func);
		}
		return function(o) {
			var _g12 = 0;
			var _g2 = _g.functions;
			while(_g12 < _g2.length) {
				var f = _g2[_g12];
				++_g12;
				var passed = f(o);
				if(!passed) return false;
			}
			return true;
		};
	}
	,reset: function() {
		this.functions = [];
		this.checks = [];
	}
	,check_id: function(id) {
		var success = false;
		var checker = function(l,r) {
			var r1 = l == r;
			if(r1) success = true;
			return r1;
		};
		var idcheck = this.compileValueChecker(id,checker);
		return function(o) {
			success = false;
			var id1 = Std.string(Reflect.getProperty(o,"id"));
			idcheck(o,id1);
			return success;
		};
	}
	,type_check: function(typename) {
		return function(o) {
			return tannus_internal_TypeTools.typename(o) == typename;
		};
	}
	,field_exists_check: function(field) {
		var getter = (function(f,a1) {
			return function(o) {
				return f(o,a1);
			};
		})(Reflect.getProperty,field);
		return function(o1) {
			return getter(o1) != null;
		};
	}
	,field_value_check: function(field,op,value) {
		var fgetter = (function(f,a1) {
			return function(o) {
				return f(o,a1);
			};
		})(Reflect.getProperty,field);
		var opfunc = this.operators.get(op);
		var vgetter = this.compileValue(value);
		return function(o1) {
			return opfunc(fgetter(o1),vgetter(o1));
		};
	}
	,field_sub_checks: function(field,checks) {
		var fgetter = (function(f,a1) {
			return function(o) {
				return f(o,a1);
			};
		})(Reflect.getProperty,field);
		var check = tannus_nore_Compiler.compile(checks);
		return function(o1) {
			var param = fgetter(o1);
			return check(param);
		};
	}
	,__class__: tannus_nore_Compiler
};
var tannus_nore_Lexer = function() {
};
$hxClasses["tannus.nore.Lexer"] = tannus_nore_Lexer;
tannus_nore_Lexer.__name__ = ["tannus","nore","Lexer"];
tannus_nore_Lexer.lex = function(s) {
	return new tannus_nore_Lexer().lexString(s);
};
tannus_nore_Lexer.log = function(x) {
	null;
};
tannus_nore_Lexer.prototype = {
	token: function(last) {
		try {
			var c = this.source.next();
			if(Lambda.has([9,10,11,12,13,32],c)) return null; else if(tannus_io__$Byte_Byte_$Impl_$.equalsi(c,34) || tannus_io__$Byte_Byte_$Impl_$.equalsi(c,39)) {
				var delimiter = c;
				var str = "";
				var escaped = false;
				while(true) try {
					var bit = this.source.next();
					if(escaped) {
						str += String.fromCharCode(bit);
						escaped = false;
					} else if(tannus_io__$Byte_Byte_$Impl_$.equalsi(bit,92)) escaped = true; else if(tannus_io__$Byte_Byte_$Impl_$.equalsi(bit,delimiter)) break; else str += String.fromCharCode(bit);
				} catch( err ) {
					if (err instanceof js__$Boot_HaxeError) err = err.val;
					if( js_Boot.__instanceof(err,String) ) {
						if(err + "" == "Eof") throw new js__$Boot_HaxeError("Unterminated String"); else throw new js__$Boot_HaxeError(err);
					} else throw(err);
				}
				var tk = tannus_nore_Token.TString(str);
				return tk;
			} else if(c >= 65 && c <= 90 || c >= 97 && c <= 122) {
				var ident = String.fromCharCode(c) + "";
				while(true) try {
					var bit1 = this.source.next();
					if(bit1 >= 48 && bit1 <= 57 || (bit1 >= 65 && bit1 <= 90 || bit1 >= 97 && bit1 <= 122) || tannus_io__$Byte_Byte_$Impl_$.equalsi(bit1,46)) ident += String.fromCharCode(bit1); else {
						this.source.back(bit1);
						break;
					}
				} catch( err1 ) {
					if (err1 instanceof js__$Boot_HaxeError) err1 = err1.val;
					if( js_Boot.__instanceof(err1,String) ) {
						if(err1 + "" == "Eof") return tannus_nore_Token.TIdent(ident); else throw new js__$Boot_HaxeError(err1);
					} else throw(err1);
				}
				var tk1 = tannus_nore_Token.TIdent(ident);
				return tk1;
			} else if(c >= 48 && c <= 57) {
				var num_str = String.fromCharCode(c) + "";
				var format = 0;
				var ltrCodes = [97,98,99,100,101,102,65,66,67,68,69,70];
				while(true) try {
					var bit2 = this.source.next();
					if(bit2 >= 48 && bit2 <= 57) num_str += String.fromCharCode(bit2); else if(tannus_io__$Byte_Byte_$Impl_$.equalss(bit2,".")) {
						if(format == 0) {
							format = 1;
							num_str += String.fromCharCode(bit2);
						} else throw new js__$Boot_HaxeError("Unexpected \".\"");
					} else if(tannus_io__$Byte_Byte_$Impl_$.equalss(bit2,"x") || tannus_io__$Byte_Byte_$Impl_$.equalss(bit2,"X")) {
						if(num_str == "0" && format == 0) {
							format = 2;
							num_str += String.fromCharCode(bit2);
						} else throw new js__$Boot_HaxeError("Unexpected \"x\"");
					} else if(format == 2 && Lambda.has(ltrCodes,bit2)) num_str += (String.fromCharCode(bit2) + "").toUpperCase(); else {
						this.source.back(bit2);
						break;
					}
				} catch( err2 ) {
					if (err2 instanceof js__$Boot_HaxeError) err2 = err2.val;
					if( js_Boot.__instanceof(err2,String) ) {
						if(err2 + "" == "Eof") {
							if(StringTools.endsWith(num_str,".") || StringTools.endsWith(num_str,"x") || StringTools.endsWith(num_str,"X")) throw new js__$Boot_HaxeError("Unexpected end of input"); else {
								var num1;
								switch(format) {
								case 0:case 1:
									num1 = parseFloat(num_str);
									break;
								case 2:
									num1 = Std.parseInt(num_str) + 0.0;
									break;
								default:
									throw new js__$Boot_HaxeError("Unknown numeric-declaration format " + format);
								}
								var tk3 = tannus_nore_Token.TNumber(num1);
								return tk3;
							}
						} else throw new js__$Boot_HaxeError(err2);
					} else throw(err2);
				}
				var num;
				switch(format) {
				case 0:case 1:
					num = parseFloat(num_str);
					break;
				case 2:
					num = Std.parseInt(num_str) + 0.0;
					break;
				default:
					throw new js__$Boot_HaxeError("Unknown numeric-declaration format " + format);
				}
				var tk2 = tannus_nore_Token.TNumber(num);
				return tk2;
			} else if(this.isOperator(c)) {
				var op_str = String.fromCharCode(c) + "";
				while(true) try {
					var bit3 = this.source.next();
					if(this.isOperator(bit3)) op_str += String.fromCharCode(bit3); else {
						this.source.back(bit3);
						break;
					}
				} catch( err3 ) {
					if (err3 instanceof js__$Boot_HaxeError) err3 = err3.val;
					if( js_Boot.__instanceof(err3,String) ) {
						if(err3 + "" == "Eof") break; else throw new js__$Boot_HaxeError(err3);
					} else throw(err3);
				}
				var tk4 = tannus_nore_Token.TOperator(op_str);
				return tk4;
			} else if(tannus_io__$Byte_Byte_$Impl_$.equalss(c,"[")) {
				var content = this.group(91,93);
				var nodes = new tannus_nore_Lexer().lexString(content);
				switch(nodes.length) {
				case 1:
					switch(nodes[0][1]) {
					case 3:
						var n = nodes[0][2];
						return tannus_nore_Token.TArrayAccess(n);
					default:
						this.tree.push(tannus_nore_Token.TOBracket);
						var _g = 0;
						while(_g < nodes.length) {
							var node = nodes[_g];
							++_g;
							this.tree.push(node);
						}
						this.tree.push(tannus_nore_Token.TCBracket);
						return null;
					}
					break;
				case 3:
					switch(nodes[0][1]) {
					case 3:
						switch(nodes[1][1]) {
						case 10:
							switch(nodes[2][1]) {
							case 3:
								var start = nodes[0][2];
								var end = nodes[2][2];
								return tannus_nore_Token.TRangeAccess(start,end);
							default:
								this.tree.push(tannus_nore_Token.TOBracket);
								var _g1 = 0;
								while(_g1 < nodes.length) {
									var node1 = nodes[_g1];
									++_g1;
									this.tree.push(node1);
								}
								this.tree.push(tannus_nore_Token.TCBracket);
								return null;
							}
							break;
						default:
							this.tree.push(tannus_nore_Token.TOBracket);
							var _g2 = 0;
							while(_g2 < nodes.length) {
								var node2 = nodes[_g2];
								++_g2;
								this.tree.push(node2);
							}
							this.tree.push(tannus_nore_Token.TCBracket);
							return null;
						}
						break;
					default:
						this.tree.push(tannus_nore_Token.TOBracket);
						var _g3 = 0;
						while(_g3 < nodes.length) {
							var node3 = nodes[_g3];
							++_g3;
							this.tree.push(node3);
						}
						this.tree.push(tannus_nore_Token.TCBracket);
						return null;
					}
					break;
				default:
					this.tree.push(tannus_nore_Token.TOBracket);
					var _g4 = 0;
					while(_g4 < nodes.length) {
						var node4 = nodes[_g4];
						++_g4;
						this.tree.push(node4);
					}
					this.tree.push(tannus_nore_Token.TCBracket);
					return null;
				}
			} else if(tannus_io__$Byte_Byte_$Impl_$.equalss(c,"{")) try {
				var content1 = this.group(123,125);
				var nodes1 = new tannus_nore_Lexer().lexString(content1);
				this.push(tannus_nore_Token.TSub(nodes1));
			} catch( err4 ) {
				if (err4 instanceof js__$Boot_HaxeError) err4 = err4.val;
				console.log(err4);
			} else if(tannus_io__$Byte_Byte_$Impl_$.equalss(c,"(")) {
				console.log("Encountering either a group or a tuple!");
				var content2 = this.group(40,41);
				var nodes2 = new tannus_nore_Lexer().lexString(content2);
				var subtree = [];
				var tup = [];
				var i = 0;
				var mode = 0;
				var last1 = null;
				while(true) {
					var t = nodes2[i];
					if(t == null) {
						if(last1 != null) subtree.push(last1);
						if(subtree.length > 0) switch(mode) {
						case 0:
							null;
							break;
						case 1:
							tup.push(subtree);
							subtree = [];
							break;
						default:
							throw new js__$Boot_HaxeError("WTFError: Got a \"mode\" of " + mode + "! How??");
						}
						break;
					}
					if(t != null) switch(t[1]) {
					case 12:
						mode = 1;
						if(last1 != null) {
							subtree.push(last1);
							last1 = null;
						}
						if(subtree.length > 0) {
							tup.push(subtree);
							subtree = [];
						} else throw new js__$Boot_HaxeError("SyntaxError: Unexpected \",\"!");
						break;
					default:
						if(mode == 0) {
							if(i == 0) last1 = t; else {
								if(last1 != null) {
									subtree.push(last1);
									last1 = null;
								}
								subtree.push(t);
							}
						} else if(mode == 1) subtree.push(t);
					} else if(mode == 0) {
						if(i == 0) last1 = t; else {
							if(last1 != null) {
								subtree.push(last1);
								last1 = null;
							}
							subtree.push(t);
						}
					} else if(mode == 1) subtree.push(t);
					i++;
				}
				if(subtree.length == 0 && tup.length == 0) return null; else switch(mode) {
				case 0:
					var tk5 = tannus_nore_Token.TGroup(subtree);
					var last2 = this.tree.pop();
					if(last2 != null) if(last2 != null) switch(last2[1]) {
					case 0:
						var id = last2[2];
						tk5 = tannus_nore_Token.TCall(id,[subtree]);
						break;
					default:
						null;
					} else null;
					return tk5;
				case 1:
					var tk6 = tannus_nore_Token.TTuple(tup);
					var last3 = this.tree.pop();
					if(last3 != null) if(last3 != null) switch(last3[1]) {
					case 0:
						var id1 = last3[2];
						tk6 = tannus_nore_Token.TCall(id1,tup);
						break;
					default:
						null;
					} else null;
					return tk6;
				default:
					throw new js__$Boot_HaxeError("Error: Unrecognized mode " + mode + " in parenthetical group parsing!");
				}
			} else if(tannus_io__$Byte_Byte_$Impl_$.equalss(c,"#")) return tannus_nore_Token.THash; else if(tannus_io__$Byte_Byte_$Impl_$.equalss(c,":")) return tannus_nore_Token.TColon; else if(tannus_io__$Byte_Byte_$Impl_$.equalss(c,"?")) return tannus_nore_Token.TQuestion; else if(tannus_io__$Byte_Byte_$Impl_$.equalss(c,",")) return tannus_nore_Token.TComma; else if(tannus_io__$Byte_Byte_$Impl_$.equalss(c,"@")) try {
				var nxt = this.token();
				if(nxt != null) switch(nxt[1]) {
				case 0:case 3:
					return tannus_nore_Token.TRefence(nxt);
				default:
					throw new js__$Boot_HaxeError("SyntaxError: Expected identifier or number, got " + Std.string(nxt) + "!");
				}
			} catch( err5 ) {
				if (err5 instanceof js__$Boot_HaxeError) err5 = err5.val;
				if( js_Boot.__instanceof(err5,String) ) {
					throw new js__$Boot_HaxeError("SyntaxError: Expected identifier, got EOL");
				} else throw(err5);
			}
		} catch( err6 ) {
			if (err6 instanceof js__$Boot_HaxeError) err6 = err6.val;
			if( js_Boot.__instanceof(err6,String) ) {
				if(err6 + "" == "Eof") throw new js__$Boot_HaxeError("::-EOI-::"); else throw new js__$Boot_HaxeError(err6);
			} else throw(err6);
		}
		return null;
	}
	,lexString: function(s) {
		this.source = tannus_io_ByteInput.fromString(s);
		this.tree = [];
		while(true) try {
			var tk = this.token();
			if(tk != null) this.tree.push(tk);
		} catch( err ) {
			if (err instanceof js__$Boot_HaxeError) err = err.val;
			if( js_Boot.__instanceof(err,String) ) {
				if(err == "::-EOI-::") break; else throw new js__$Boot_HaxeError(err);
			} else throw(err);
		}
		return this.tree;
	}
	,isOperator: function(c) {
		return Lambda.has(["+","-","*","/","=","!","~","<",">","|"],String.fromCharCode(c));
	}
	,'byte': function() {
		return this.source.next();
	}
	,push: function(tk) {
		this.tree.push(tk);
	}
	,pop: function() {
		return this.tree.pop();
	}
	,group: function(opener,closer,escape) {
		var found = "";
		var state = 1;
		while(state > 0) try {
			var bit = this.source.next();
			if(tannus_io__$Byte_Byte_$Impl_$.equalsi(bit,opener)) state++;
			if(tannus_io__$Byte_Byte_$Impl_$.equalsi(bit,closer)) state--;
			if(state > 0) found += String.fromCharCode(bit);
		} catch( err ) {
			if (err instanceof js__$Boot_HaxeError) err = err.val;
			if( js_Boot.__instanceof(err,String) ) {
				if(err + "" == "Eof") {
					if(state > 0) throw new js__$Boot_HaxeError("Unexpected end of input"); else break;
				} else throw new js__$Boot_HaxeError(err);
			} else throw(err);
		}
		return found;
	}
	,__class__: tannus_nore_Lexer
};
var tannus_nore_ORegEx = function() { };
$hxClasses["tannus.nore.ORegEx"] = tannus_nore_ORegEx;
tannus_nore_ORegEx.__name__ = ["tannus","nore","ORegEx"];
tannus_nore_ORegEx.compile = function(description) {
	if(tannus_nore_ORegEx.ast_results.exists(description)) {
		var ast = tannus_nore_ORegEx.ast_results.get(description);
		return tannus_nore_Compiler.compile(ast);
	} else {
		var ast1 = tannus_nore_Parser.parse(new tannus_nore_Lexer().lexString(description));
		{
			tannus_nore_ORegEx.ast_results.set(description,ast1);
			ast1;
		}
		return tannus_nore_Compiler.compile(ast1);
	}
};
var tannus_nore_Parser = function() {
	this.tokens = [];
	this.ast = [];
};
$hxClasses["tannus.nore.Parser"] = tannus_nore_Parser;
tannus_nore_Parser.__name__ = ["tannus","nore","Parser"];
tannus_nore_Parser.parse = function(tree) {
	var parser = new tannus_nore_Parser();
	return parser.parseTree(tree);
};
tannus_nore_Parser.prototype = {
	parseValue: function(vt) {
		switch(vt[1]) {
		case 3:
			var num = vt[2];
			return tannus_nore_Value.VNumber(num);
		case 2:
			var str = vt[2];
			return tannus_nore_Value.VString(str);
		case 0:
			var str1 = vt[2];
			return tannus_nore_Value.VString(str1);
		case 1:
			var tew = vt[2];
			switch(tew[1]) {
			case 0:
				var id = tew[2];
				return tannus_nore_Value.VFieldReference(id);
			case 3:
				var num1 = tew[2];
				var i = num1 | 0;
				return tannus_nore_Value.VIndexReference(i);
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Cannot parse " + Std.string(tew) + " to a Reference!");
			}
			break;
		case 7:
			var sets = vt[2];
			var values;
			var _g = [];
			var _g1 = 0;
			while(_g1 < sets.length) {
				var set = sets[_g1];
				++_g1;
				_g.push(this.parseValue(set[0]));
			}
			values = _g;
			return tannus_nore_Value.VTuple(values);
		default:
			throw new js__$Boot_HaxeError("ValueError: Cannot parse " + Std.string(vt) + " to a Value!");
		}
	}
	,parseNext: function(last) {
		var tk = this.tokens.shift();
		if(tk != null) switch(tk[1]) {
		case 9:
			return tannus_nore_Check.NoCheck;
		case 17:
			var tid = this.tokens.shift();
			if(tid == null) throw new js__$Boot_HaxeError("@>EOI<@");
			var val = this.parseValue(tid);
			return tannus_nore_Check.IDCheck(val);
			switch(tid[1]) {
			case 0:
				var id = tid[2];
				return tannus_nore_Check.IDCheck(tannus_nore_Value.VString(id));
			case 2:
				var id1 = tid[2];
				return tannus_nore_Check.IDCheck(tannus_nore_Value.VString(id1));
			case 7:
				var sets = tid[2];
				var val1 = this.parseValue(tid);
				break;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(tid));
			}
			break;
		case 4:
			var oper = tk[2];
			console.log(oper);
			switch(oper) {
			case "!":
				var nxt = this.parseNext();
				if(nxt != null) return tannus_nore_Check.InverseCheck(nxt); else throw new js__$Boot_HaxeError("SyntaxError: Unexpected EOI!");
				break;
			case "|":
				console.log("FUCK FUCK FUCK!!");
				var last1 = this.ast.pop();
				if(last1 != null) {
					var nxt1 = this.parseNext();
					if(nxt1 != null) return tannus_nore_Check.EitherCheck(last1,nxt1); else throw new js__$Boot_HaxeError("SyntaxError: Unexpected end of input!");
				} else throw new js__$Boot_HaxeError("SyntaxError: Unexpected \"|\"!");
				break;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Unexpected \"" + oper + "\"!");
			}
			break;
		case 0:
			var typename = tk[2];
			return tannus_nore_Check.TypeCheck(typename);
		case 2:
			var typename1 = tk[2];
			return tannus_nore_Check.TypeCheck(typename1);
		case 13:
			var nodes = [];
			var t = this.tokens.shift();
			try {
				while(t != null) {
					switch(t[1]) {
					case 14:
						throw "__break__";
						break;
					default:
						nodes.push(t);
					}
					t = this.tokens.shift();
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
			if(nodes.length == 0) throw new js__$Boot_HaxeError("SyntaxError: Expected Identifier, got null!"); else {
				var first = nodes.shift();
				switch(first[1]) {
				case 0:
					var field = first[2];
					if(nodes.length == 0) return tannus_nore_Check.FieldExistsCheck(field); else {
						var second = nodes.shift();
						switch(second[1]) {
						case 4:
							var operation = second[2];
							if(nodes.length != 1) throw new js__$Boot_HaxeError("SyntaxError: Expected Value, got " + Std.string(nodes)); else {
								var val2 = nodes.shift();
								if(operation == "=>" && (function($this) {
									var $r;
									switch(val2[1]) {
									case 6:
										$r = true;
										break;
									default:
										$r = false;
									}
									return $r;
								}(this))) return tannus_nore_Check.FieldSubChecks(field,tannus_nore_Parser.parse(val2.slice(2)[0])); else {
									var value = this.parseValue(val2);
									return tannus_nore_Check.FieldValueCheck(field,operation,value);
								}
							}
							break;
						default:
							throw new js__$Boot_HaxeError("SyntaxError: Expected Operator, got " + Std.string(second) + "!");
						}
					}
					break;
				default:
					throw new js__$Boot_HaxeError("SyntaxError: Expected identifier, got " + Std.string(first));
				}
			}
			break;
		case 5:
			var subtree = tk[2];
			var ast = tannus_nore_Parser.parse(subtree);
			return tannus_nore_Check.GroupCheck(ast);
		case 10:
			var nxt2 = this.tokens.shift();
			if(nxt2 == null) throw new js__$Boot_HaxeError("SyntaxError: Unexpected end of input"); else if(nxt2 != null) switch(nxt2[1]) {
			case 0:
				var id2 = nxt2[2];
				var check = tannus_nore_Check.HelperCheck(id2);
				return check;
			case 8:
				var pargs = nxt2[3];
				var id3 = nxt2[2];
				var args = [];
				var v = this.parseValue(tannus_nore_Token.TTuple(pargs));
				switch(v[1]) {
				case 5:
					var vals = v[2];
					args = vals;
					break;
				default:
					throw new js__$Boot_HaxeError("WhatTheFuckError: While parsing the arguments of a function-call, a " + Std.string(v) + " was encountered rather than a tuple");
				}
				var check1 = tannus_nore_Check.HelperCheck(id3,args);
				return check1;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(nxt2) + "!");
			} else throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(nxt2) + "!");
			break;
		case 7:
			var sets1 = tk[2];
			var values = [];
			var _g = 0;
			while(_g < sets1.length) {
				var set = sets1[_g];
				++_g;
				var t1 = set[0];
				var v1 = this.parseValue(t1);
				values.push(v1);
			}
			return tannus_nore_Check.TupleCheck(values);
		case 11:
			var prev = this.ast.pop();
			if(prev == null) throw new js__$Boot_HaxeError("SyntaxError: Unexpected \"?\"!");
			var ifTrue = this.parseNext();
			if(ifTrue == null) throw new js__$Boot_HaxeError("SyntaxError: Unexpected end of input!");
			var sep = this.tokens.shift();
			if(sep == null) throw new js__$Boot_HaxeError("Unexpected end of input!");
			if(sep != null) switch(sep[1]) {
			case 10:
				var ifFalse = this.parseNext();
				if(ifFalse == null) ifFalse = tannus_nore_Check.NoCheck;
				return tannus_nore_Check.TernaryCheck(prev,ifTrue,ifFalse);
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(sep) + "!");
			} else throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(sep) + "!");
			break;
		default:
			throw new js__$Boot_HaxeError("SyntaxError: No directives for handling " + Std.string(tk));
		} else throw new js__$Boot_HaxeError("@>EOI<@");
	}
	,parseTree: function(tree) {
		this.tokens = [];
		this.ast = [];
		this.tokens = tree;
		while(true) try {
			var check = this.parseNext();
			if(check != null) this.ast.push(check);
		} catch( err ) {
			if (err instanceof js__$Boot_HaxeError) err = err.val;
			if( js_Boot.__instanceof(err,String) ) {
				if(err == "@>EOI<@") break; else throw new js__$Boot_HaxeError(err);
			} else throw(err);
		}
		return this.ast;
	}
	,reset: function() {
		this.tokens = [];
		this.ast = [];
	}
	,token: function() {
		return this.tokens.shift();
	}
	,push: function(check) {
		this.ast.push(check);
	}
	,pop: function() {
		return this.ast.pop();
	}
	,__class__: tannus_nore_Parser
};
var tannus_nore__$Selector_Selector_$Impl_$ = {};
$hxClasses["tannus.nore._Selector.Selector_Impl_"] = tannus_nore__$Selector_Selector_$Impl_$;
tannus_nore__$Selector_Selector_$Impl_$.__name__ = ["tannus","nore","_Selector","Selector_Impl_"];
tannus_nore__$Selector_Selector_$Impl_$.__properties__ = {get_func:"get_func",get_selector:"get_selector"}
tannus_nore__$Selector_Selector_$Impl_$._new = function(s) {
	var this1;
	var b = tannus_nore_ORegEx.compile(s);
	this1 = [s,b];
	return this1;
};
tannus_nore__$Selector_Selector_$Impl_$.get_selector = function(this1) {
	return this1[0];
};
tannus_nore__$Selector_Selector_$Impl_$.get_func = function(this1) {
	return this1[1];
};
tannus_nore__$Selector_Selector_$Impl_$.clone = function(this1) {
	var s = this1[0];
	var this2;
	var b = tannus_nore_ORegEx.compile(s);
	this2 = [s,b];
	return this2;
};
tannus_nore__$Selector_Selector_$Impl_$.test = function(this1,o) {
	return this1[1](o);
};
tannus_nore__$Selector_Selector_$Impl_$.filter = function(this1,list) {
	return list.filter(this1[1]);
};
tannus_nore__$Selector_Selector_$Impl_$.toString = function(this1) {
	return "Selector(" + this1[0] + ")";
};
tannus_nore__$Selector_Selector_$Impl_$.toPredicate = function(this1) {
	return this1[1];
};
tannus_nore__$Selector_Selector_$Impl_$.invert = function(this1) {
	var s = "!(" + this1[0] + ")";
	var this2;
	var b = tannus_nore_ORegEx.compile(s);
	this2 = [s,b];
	return this2;
};
tannus_nore__$Selector_Selector_$Impl_$.add = function(one,other) {
	var s = "(" + one[0] + ")(" + other[0] + ")";
	var this1;
	var b = tannus_nore_ORegEx.compile(s);
	this1 = [s,b];
	return this1;
};
tannus_nore__$Selector_Selector_$Impl_$.minus = function(one,other) {
	var s = "(" + one[0] + ") !(" + other[0] + ")";
	var this1;
	var b = tannus_nore_ORegEx.compile(s);
	this1 = [s,b];
	return this1;
};
tannus_nore__$Selector_Selector_$Impl_$.fromString = function(s) {
	var this1;
	var b = tannus_nore_ORegEx.compile(s);
	this1 = [s,b];
	return this1;
};
tannus_nore__$Selector_Selector_$Impl_$.helper = function(name,hf) {
	tannus_nore_Compiler.initHelpers.listen(function(help) {
		help(name,hf);
	},false);
};
var tannus_nore_Token = $hxClasses["tannus.nore.Token"] = { __ename__ : ["tannus","nore","Token"], __constructs__ : ["TIdent","TRefence","TString","TNumber","TOperator","TGroup","TSub","TTuple","TCall","TAny","TColon","TQuestion","TComma","TOBracket","TCBracket","TOParen","TCParen","THash","TArrayAccess","TRangeAccess"] };
tannus_nore_Token.TIdent = function(ident) { var $x = ["TIdent",0,ident]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TRefence = function(id) { var $x = ["TRefence",1,id]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TString = function(str) { var $x = ["TString",2,str]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TNumber = function(num) { var $x = ["TNumber",3,num]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TOperator = function(op) { var $x = ["TOperator",4,op]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TGroup = function(subtree) { var $x = ["TGroup",5,subtree]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TSub = function(subtree) { var $x = ["TSub",6,subtree]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TTuple = function(values) { var $x = ["TTuple",7,values]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TCall = function(id,args) { var $x = ["TCall",8,id,args]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TAny = ["TAny",9];
tannus_nore_Token.TAny.toString = $estr;
tannus_nore_Token.TAny.__enum__ = tannus_nore_Token;
tannus_nore_Token.TColon = ["TColon",10];
tannus_nore_Token.TColon.toString = $estr;
tannus_nore_Token.TColon.__enum__ = tannus_nore_Token;
tannus_nore_Token.TQuestion = ["TQuestion",11];
tannus_nore_Token.TQuestion.toString = $estr;
tannus_nore_Token.TQuestion.__enum__ = tannus_nore_Token;
tannus_nore_Token.TComma = ["TComma",12];
tannus_nore_Token.TComma.toString = $estr;
tannus_nore_Token.TComma.__enum__ = tannus_nore_Token;
tannus_nore_Token.TOBracket = ["TOBracket",13];
tannus_nore_Token.TOBracket.toString = $estr;
tannus_nore_Token.TOBracket.__enum__ = tannus_nore_Token;
tannus_nore_Token.TCBracket = ["TCBracket",14];
tannus_nore_Token.TCBracket.toString = $estr;
tannus_nore_Token.TCBracket.__enum__ = tannus_nore_Token;
tannus_nore_Token.TOParen = ["TOParen",15];
tannus_nore_Token.TOParen.toString = $estr;
tannus_nore_Token.TOParen.__enum__ = tannus_nore_Token;
tannus_nore_Token.TCParen = ["TCParen",16];
tannus_nore_Token.TCParen.toString = $estr;
tannus_nore_Token.TCParen.__enum__ = tannus_nore_Token;
tannus_nore_Token.THash = ["THash",17];
tannus_nore_Token.THash.toString = $estr;
tannus_nore_Token.THash.__enum__ = tannus_nore_Token;
tannus_nore_Token.TArrayAccess = function(index) { var $x = ["TArrayAccess",18,index]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TRangeAccess = function(start,end) { var $x = ["TRangeAccess",19,start,end]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
var tannus_nore_Value = $hxClasses["tannus.nore.Value"] = { __ename__ : ["tannus","nore","Value"], __constructs__ : ["VNumber","VString","VFieldReference","VIndexReference","VArrayAccess","VTuple"] };
tannus_nore_Value.VNumber = function(num) { var $x = ["VNumber",0,num]; $x.__enum__ = tannus_nore_Value; $x.toString = $estr; return $x; };
tannus_nore_Value.VString = function(str) { var $x = ["VString",1,str]; $x.__enum__ = tannus_nore_Value; $x.toString = $estr; return $x; };
tannus_nore_Value.VFieldReference = function(field) { var $x = ["VFieldReference",2,field]; $x.__enum__ = tannus_nore_Value; $x.toString = $estr; return $x; };
tannus_nore_Value.VIndexReference = function(index) { var $x = ["VIndexReference",3,index]; $x.__enum__ = tannus_nore_Value; $x.toString = $estr; return $x; };
tannus_nore_Value.VArrayAccess = function(field,index) { var $x = ["VArrayAccess",4,field,index]; $x.__enum__ = tannus_nore_Value; $x.toString = $estr; return $x; };
tannus_nore_Value.VTuple = function(vals) { var $x = ["VTuple",5,vals]; $x.__enum__ = tannus_nore_Value; $x.toString = $estr; return $x; };
var tannus_sys__$Directory_Directory_$Impl_$ = {};
$hxClasses["tannus.sys._Directory.Directory_Impl_"] = tannus_sys__$Directory_Directory_$Impl_$;
tannus_sys__$Directory_Directory_$Impl_$.__name__ = ["tannus","sys","_Directory","Directory_Impl_"];
tannus_sys__$Directory_Directory_$Impl_$.__properties__ = {get_entries:"get_entries",get_exists:"get_exists",get_path:"get_path"}
tannus_sys__$Directory_Directory_$Impl_$._new = function(p,create) {
	if(create == null) create = false;
	var this1;
	this1 = p;
	if(tannus_sys_JavaScriptFileSystem.exists(this1)) {
		if(!tannus_sys_JavaScriptFileSystem.isDirectory(this1)) throw new js__$Boot_HaxeError("IOError: " + p + " is not a Directory!");
	} else if(create) tannus_sys_JavaScriptFileSystem.createDirectory(this1); else throw new js__$Boot_HaxeError("IOError: " + p + " is not a File or a Directory!");
	return this1;
};
tannus_sys__$Directory_Directory_$Impl_$.get = function(this1,name) {
	var entry;
	if(tannus_sys_JavaScriptFileSystem.exists(name)) {
		if(tannus_sys_JavaScriptFileSystem.isDirectory(name)) {
			var et = tannus_sys_FSEntryType.Folder(name);
			entry = et;
		} else {
			var et1 = tannus_sys_FSEntryType.File(new tannus_sys_CFile(name));
			entry = et1;
		}
	} else throw new js__$Boot_HaxeError("IOError: Cannot create FSEntry instance for Path which does not exist");
	var canRet;
	{
		var _g = entry;
		switch(_g[1]) {
		case 0:
			var f = _g[2];
			canRet = tannus_sys_JavaScriptFileSystem.exists(f._path);
			break;
		case 1:
			var f1 = _g[2];
			canRet = tannus_sys_JavaScriptFileSystem.exists(f1);
			break;
		}
	}
	if(canRet) return entry; else return null;
};
tannus_sys__$Directory_Directory_$Impl_$.file = function(this1,name) {
	var f;
	{
		var p = haxe_io_Path.join([this1,name]);
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
	tannus_sys_JavaScriptFileSystem.volume.rename(this1,ndir);
	tannus_sys_JavaScriptFileSystem.save();
};
tannus_sys__$Directory_Directory_$Impl_$["delete"] = function(this1,force) {
	if(force == null) force = false;
	if(!force) tannus_sys_JavaScriptFileSystem.deleteDirectory(this1); else tannus_sys__$Directory_Directory_$Impl_$.walk(this1,function(entry) {
		{
			var _g = entry;
			switch(_g[1]) {
			case 0:
				var f = _g[2];
				tannus_sys_JavaScriptFileSystem.volume.deleteFile(f._path);
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
	return tannus_sys_JavaScriptFileSystem.exists(this1);
};
tannus_sys__$Directory_Directory_$Impl_$.get_entries = function(this1) {
	var rnames = tannus_sys_JavaScriptFileSystem.readDirectory(this1);
	var elist = [];
	var _g1 = 0;
	var _g = rnames.length;
	while(_g1 < _g) {
		var i = _g1++;
		var other = haxe_io_Path.withoutDirectory(rnames[i]);
		rnames[i] = haxe_io_Path.join([this1,other]);
		haxe_io_Path.directory(rnames[i]);
		elist.push((function($this) {
			var $r;
			var p = rnames[i];
			$r = tannus_sys_JavaScriptFileSystem.exists(p)?tannus_sys_JavaScriptFileSystem.isDirectory(p)?(function($this) {
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
tannus_sys__$FSEntry_FSEntry_$Impl_$.__properties__ = {get_path:"get_path",get_type:"get_type"}
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
			tannus_sys_JavaScriptFileSystem.volume.rename(f1,ndir);
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
			tannus_sys_JavaScriptFileSystem.volume.deleteFile(f._path);
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
tannus_sys__$FSEntry_FSEntry_$Impl_$.fromPath = function(p) {
	if(tannus_sys_JavaScriptFileSystem.exists(p)) {
		if(tannus_sys_JavaScriptFileSystem.isDirectory(p)) {
			var et = tannus_sys_FSEntryType.Folder(p);
			return et;
		} else {
			var et1 = tannus_sys_FSEntryType.File(new tannus_sys_CFile(p));
			return et1;
		}
	} else throw new js__$Boot_HaxeError("IOError: Cannot create FSEntry instance for Path which does not exist");
};
tannus_sys__$FSEntry_FSEntry_$Impl_$.fromString = function(s) {
	if(tannus_sys_JavaScriptFileSystem.exists(s)) {
		if(tannus_sys_JavaScriptFileSystem.isDirectory(s)) {
			var et = tannus_sys_FSEntryType.Folder(s);
			return et;
		} else {
			var et1 = tannus_sys_FSEntryType.File(new tannus_sys_CFile(s));
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
		var this2 = tannus_sys_JavaScriptFileSystem.read(this1._path);
		$r = this2.map(function(b) {
			return String.fromCharCode(b);
		}).join("");
		return $r;
	}(this))).split("\n"); else {
		this1.write((function($this) {
			var $r;
			var s = nlines.join("\n");
			var ba = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
			tannus_io__$ByteArray_ByteArray_$Impl_$.writeString(ba,s);
			$r = ba;
			return $r;
		}(this)));
		return nlines;
	}
};
tannus_sys__$File_File_$Impl_$.fromString = function(p) {
	return new tannus_sys_CFile(p);
};
tannus_sys__$File_File_$Impl_$.fromPath = function(p) {
	return new tannus_sys_CFile(p);
};
tannus_sys__$File_File_$Impl_$.fromByteArray = function(p) {
	var p1 = p.map(function(b) {
		return String.fromCharCode(b);
	}).join("");
	return new tannus_sys_CFile(p1);
};
var tannus_sys_CFile = function(p) {
	this._path = p;
	if(tannus_sys_JavaScriptFileSystem.exists(this._path) && tannus_sys_JavaScriptFileSystem.isDirectory(this._path)) throw new js__$Boot_HaxeError("FileError: " + ("\"" + this._path + "\" is a directory!"));
};
$hxClasses["tannus.sys.CFile"] = tannus_sys_CFile;
tannus_sys_CFile.__name__ = ["tannus","sys","CFile"];
tannus_sys_CFile.ferror = function(msg) {
	throw new js__$Boot_HaxeError("FileError: " + msg);
};
tannus_sys_CFile.prototype = {
	read: function() {
		return tannus_sys_JavaScriptFileSystem.read(this._path);
	}
	,write: function(data) {
		tannus_sys_JavaScriptFileSystem.write(this._path,data);
	}
	,append: function(data) {
		tannus_sys_JavaScriptFileSystem.append(this._path,data);
	}
	,rename: function(newpath) {
		this.set_path(newpath);
	}
	,'delete': function() {
		tannus_sys_JavaScriptFileSystem.volume.deleteFile(this._path);
		tannus_sys_JavaScriptFileSystem.save();
	}
	,get_exists: function() {
		return tannus_sys_JavaScriptFileSystem.exists(this._path);
	}
	,get_size: function() {
		var stats = tannus_sys_JavaScriptFileSystem.volume.stat(this._path);
		return stats.size;
	}
	,get_data: function() {
		return tannus_sys_JavaScriptFileSystem.read(this._path);
	}
	,set_data: function(nd) {
		tannus_sys_JavaScriptFileSystem.write(this._path,nd);
		return tannus_sys_JavaScriptFileSystem.read(this._path);
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
		tannus_sys_JavaScriptFileSystem.volume.rename(this._path,np);
		tannus_sys_JavaScriptFileSystem.save();
		return this._path = np;
	}
	,get_directory: function() {
		return haxe_io_Path.directory(this._path);
	}
	,get_input: function() {
		var inp = new haxe_io_BytesInput((function($this) {
			var $r;
			var this1 = $this.get_data();
			var buf = haxe_io_Bytes.alloc(this1.length);
			tannus_io__$ByteArray_ByteArray_$Impl_$.each(this1,function(i,b) {
				buf.b[i] = b & 255;
			});
			$r = buf;
			return $r;
		}(this)));
		return inp;
	}
	,__class__: tannus_sys_CFile
	,__properties__: {get_input:"get_input",get_directory:"get_directory",set_path:"set_path",get_path:"get_path",get_content:"get_content",set_data:"set_data",get_data:"get_data",get_size:"get_size",get_exists:"get_exists"}
};
var tannus_sys__$FileStreamOptions_FileStreamOptions_$Impl_$ = {};
$hxClasses["tannus.sys._FileStreamOptions.FileStreamOptions_Impl_"] = tannus_sys__$FileStreamOptions_FileStreamOptions_$Impl_$;
tannus_sys__$FileStreamOptions_FileStreamOptions_$Impl_$.__name__ = ["tannus","sys","_FileStreamOptions","FileStreamOptions_Impl_"];
tannus_sys__$FileStreamOptions_FileStreamOptions_$Impl_$.__properties__ = {set_end:"set_end",get_end:"get_end",set_start:"set_start",get_start:"get_start"}
tannus_sys__$FileStreamOptions_FileStreamOptions_$Impl_$._new = function(start,end) {
	return { 'start' : start, 'end' : end};
};
tannus_sys__$FileStreamOptions_FileStreamOptions_$Impl_$.get_start = function(this1) {
	return this1.start;
};
tannus_sys__$FileStreamOptions_FileStreamOptions_$Impl_$.set_start = function(this1,v) {
	return this1.start = v;
};
tannus_sys__$FileStreamOptions_FileStreamOptions_$Impl_$.get_end = function(this1) {
	if(this1.end == null) return -1; else return this1.end;
};
tannus_sys__$FileStreamOptions_FileStreamOptions_$Impl_$.set_end = function(this1,v) {
	return this1.end = v;
};
tannus_sys__$FileStreamOptions_FileStreamOptions_$Impl_$.range = function(this1) {
	return new tannus_ds_IntRange(this1.start,this1.end);
};
tannus_sys__$FileStreamOptions_FileStreamOptions_$Impl_$.fromArray = function(a) {
	return { 'start' : a[0], 'end' : a[1]};
};
var tannus_sys_VirtualVolume = function(nam) {
	this.name = nam;
	this.entries = [];
};
$hxClasses["tannus.sys.VirtualVolume"] = tannus_sys_VirtualVolume;
tannus_sys_VirtualVolume.__name__ = ["tannus","sys","VirtualVolume"];
tannus_sys_VirtualVolume.deserialize = function(data) {
	var bits = haxe_Unserializer.run(data.map(function(b) {
		return String.fromCharCode(b);
	}).join(""));
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
	var res = haxe_io_Path.normalize(name);
	res = StringTools.replace(res,"~","/home/" + tannus_sys__$Path_Path_$Impl_$.un);
	res = haxe_io_Path.normalize(res);
	return res;
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
			if(f.name == name) return f;
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
		while(true) if(haxe_io_Path.directory(_p) == "") break; else {
			_p = haxe_io_Path.directory(_p);
			if(!this.exists(_p)) throw new js__$Boot_HaxeError("IOError: " + ("No such file or directory \"" + _p + "\"!"));
		}
	}
	,exists: function(name) {
		name = tannus_sys_VirtualVolume.normal(name);
		var p = name;
		return this.getEntry(p) != null;
	}
	,isDirectory: function(name) {
		name = tannus_sys_VirtualVolume.normal(name);
		var p = name;
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
		this.validatePath(name);
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
		var p = name;
		if(name == "" || name == "/") return this.entries.filter(function(e) {
			return haxe_io_Path.directory(e.name) == "";
		}).map(function(e1) {
			var this1;
			var res = haxe_io_Path.normalize(e1.name);
			res = StringTools.replace(res,"~","/home/" + tannus_sys__$Path_Path_$Impl_$.un);
			res = haxe_io_Path.normalize(res);
			this1 = res;
			return haxe_io_Path.join([this1,""]);
		}); else if(this.isDirectory(name)) {
			var e2 = this.getEntry(name);
			return e2.list().map(function(e3) {
				return e3.name;
			});
		} else throw new js__$Boot_HaxeError("IOError: " + ("\"" + name + "\" is not a Directory!"));
	}
	,write: function(path,data) {
		path = tannus_sys_VirtualVolume.normal(path);
		this.validatePath(path);
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
			this.validatePath(newp);
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
		var data = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
		haxe_Serializer.USE_CACHE = true;
		haxe_Serializer.USE_ENUM_INDEX = true;
		var ba;
		{
			var s = haxe_Serializer.run(bits);
			var ba1 = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
			tannus_io__$ByteArray_ByteArray_$Impl_$.writeString(ba1,s);
			ba = ba1;
		}
		data = data.concat(ba);
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
				var zentry = { 'fileTime' : new Date(), 'fileSize' : e.content.length, 'fileName' : e.name, 'dataSize' : e.content.length, 'data' : (function($this) {
					var $r;
					var this1 = e.content;
					var buf = [haxe_io_Bytes.alloc(this1.length)];
					tannus_io__$ByteArray_ByteArray_$Impl_$.each(this1,(function(buf) {
						return function(i,b) {
							buf[0].b[i] = b & 255;
						};
					})(buf));
					$r = buf[0];
					return $r;
				}(this)), 'compressed' : false, 'extraFields' : null, 'crc32' : null};
				entry_list.push(zentry);
			}
		}
		var out = new haxe_io_BytesOutput();
		var writer = new haxe_zip_Writer(out);
		writer.write(entry_list);
		var zip_data;
		{
			var buf1 = out.getBytes();
			var ba = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
			if(buf1.length > 0) {
				var _g11 = 0;
				var _g2 = buf1.length;
				while(_g11 < _g2) {
					var i1 = _g11++;
					var n = buf1.b[i1];
					ba.push(n);
				}
			}
			zip_data = ba;
		}
		return new tannus_io_CBlob("zipfile","application/zip",zip_data);
	}
	,__class__: tannus_sys_VirtualVolume
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
tannus_sys_VVEntry.error = function(msg) {
	throw new js__$Boot_HaxeError("IOError: " + msg);
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
				return haxe_io_Path.directory(e.name) == _g.name;
			});
		} else throw new js__$Boot_HaxeError("IOError: " + ("\"" + this.name + "\" is a File!"));
	}
	,write: function(data) {
		if(this.get_isFile() || !this.volume.exists(this.name)) {
			this.content = data;
			this.set_mdate(new Date());
		} else throw new js__$Boot_HaxeError("IOError: " + ("\"" + this.name + "\" is a Directory!"));
	}
	,read: function() {
		if(this.get_isFile()) {
			if(this.content == null) {
				var ba = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
				tannus_io__$ByteArray_ByteArray_$Impl_$.writeString(ba,"");
				return ba;
			} else return this.content;
		} else throw new js__$Boot_HaxeError("IOError: " + ("\"" + this.name + "\" cannot be read!"));
	}
	,append: function(data) {
		if(this.get_isFile()) {
			this.content = this.read();
			this.content = this.content.concat(data);
			this.set_mdate(new Date());
		} else throw new js__$Boot_HaxeError("IOError: " + ("\"" + this.name + "\" cannot be written to!"));
	}
	,rename: function(newname) {
		if(this.get_isFile()) this.name = newname; else {
			var subs = this.list();
			var _g = 0;
			while(_g < subs.length) {
				var e = subs[_g];
				++_g;
				var np;
				var res = haxe_io_Path.normalize(e.name);
				res = StringTools.replace(res,"~","/home/" + tannus_sys__$Path_Path_$Impl_$.un);
				res = haxe_io_Path.normalize(res);
				np = res;
				np = StringTools.replace(np,(function($this) {
					var $r;
					var res1 = haxe_io_Path.normalize($this.name);
					res1 = StringTools.replace(res1,"~","/home/" + tannus_sys__$Path_Path_$Impl_$.un);
					res1 = haxe_io_Path.normalize(res1);
					$r = res1;
					return $r;
				}(this)),(function($this) {
					var $r;
					var res2 = haxe_io_Path.normalize(newname);
					res2 = StringTools.replace(res2,"~","/home/" + tannus_sys__$Path_Path_$Impl_$.un);
					res2 = haxe_io_Path.normalize(res2);
					$r = res2;
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
		return this.name;
	}
	,set_path: function(np) {
		this.name = np;
		return this.name;
	}
	,get_stats: function() {
		if(this.get_isFile()) return { 'size' : this.read().length, 'ctime' : this.get_cdate(), 'mtime' : this.get_mdate()}; else throw new js__$Boot_HaxeError("IOError: " + ("\"" + this.name + "\" is a Directory!"));
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
	} else tannus_sys_JavaScriptFileSystem.volume = tannus_sys_VirtualVolume.deserialize((function($this) {
		var $r;
		var ba = tannus_io__$ByteArray_ByteArray_$Impl_$._new();
		tannus_io__$ByteArray_ByteArray_$Impl_$.writeString(ba,saved);
		$r = ba;
		return $r;
	}(this)));
};
tannus_sys_JavaScriptFileSystem.save = function() {
	var ls = js_Browser.getLocalStorage();
	var data = tannus_sys_JavaScriptFileSystem.volume.serialize();
	ls.setItem("::fs::",data.map(function(b) {
		return String.fromCharCode(b);
	}).join(""));
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
tannus_sys_JavaScriptFileSystem.istream = function(name,options) {
	throw new js__$Boot_HaxeError("Error: Not implemented!");
};
tannus_sys_JavaScriptFileSystem.rename = function(o,n) {
	tannus_sys_JavaScriptFileSystem.volume.rename(o,n);
	tannus_sys_JavaScriptFileSystem.save();
};
tannus_sys_JavaScriptFileSystem.stat = function(name) {
	return tannus_sys_JavaScriptFileSystem.volume.stat(name);
};
var tannus_sys__$Path_Path_$Impl_$ = {};
$hxClasses["tannus.sys._Path.Path_Impl_"] = tannus_sys__$Path_Path_$Impl_$;
tannus_sys__$Path_Path_$Impl_$.__name__ = ["tannus","sys","_Path","Path_Impl_"];
tannus_sys__$Path_Path_$Impl_$.__properties__ = {get_os:"get_os",get_str:"get_str",set_pieces:"set_pieces",get_pieces:"get_pieces",get_absolute:"get_absolute",set_extension:"set_extension",get_extension:"get_extension",set_basename:"set_basename",get_basename:"get_basename",get_name:"get_name",get_root:"get_root",set_directory:"set_directory",get_directory:"get_directory"}
tannus_sys__$Path_Path_$Impl_$._new = function(s) {
	return s;
};
tannus_sys__$Path_Path_$Impl_$.normalize = function(this1) {
	var res = haxe_io_Path.normalize(this1);
	res = StringTools.replace(res,"~","/home/" + tannus_sys__$Path_Path_$Impl_$.un);
	res = haxe_io_Path.normalize(res);
	return res;
};
tannus_sys__$Path_Path_$Impl_$.get_directory = function(this1) {
	return haxe_io_Path.directory(this1);
};
tannus_sys__$Path_Path_$Impl_$.set_directory = function(this1,nd) {
	var other = haxe_io_Path.withoutDirectory(this1);
	this1 = haxe_io_Path.join([nd,other]);
	return haxe_io_Path.directory(this1);
};
tannus_sys__$Path_Path_$Impl_$.get_root = function(this1) {
	return haxe_io_Path.directory(this1) == "";
};
tannus_sys__$Path_Path_$Impl_$.get_name = function(this1) {
	return haxe_io_Path.withoutDirectory(this1);
};
tannus_sys__$Path_Path_$Impl_$.get_basename = function(this1) {
	return haxe_io_Path.withoutExtension(haxe_io_Path.withoutDirectory(this1));
};
tannus_sys__$Path_Path_$Impl_$.set_basename = function(this1,v) {
	var d = haxe_io_Path.directory(this1);
	var e = haxe_io_Path.extension(this1);
	this1 = d + "/" + v + (e == null?"":e);
	var this2;
	var res = haxe_io_Path.normalize(this1);
	res = StringTools.replace(res,"~","/home/" + tannus_sys__$Path_Path_$Impl_$.un);
	res = haxe_io_Path.normalize(res);
	this2 = res;
	this1 = this2;
	return haxe_io_Path.withoutExtension(haxe_io_Path.withoutDirectory(this1));
};
tannus_sys__$Path_Path_$Impl_$.get_extension = function(this1) {
	return haxe_io_Path.extension(this1);
};
tannus_sys__$Path_Path_$Impl_$.set_extension = function(this1,ns) {
	if(ns != null) this1 = (function($this) {
		var $r;
		var len = this1.lastIndexOf(".");
		$r = HxOverrides.substr(this1,0,len);
		return $r;
	}(this)) + ("." + ns); else {
		var pos = this1.lastIndexOf(".") + 1;
		this1 = HxOverrides.substr(this1,pos,null);
	}
	return haxe_io_Path.extension(this1);
};
tannus_sys__$Path_Path_$Impl_$.get_absolute = function(this1) {
	return haxe_io_Path.isAbsolute(this1);
};
tannus_sys__$Path_Path_$Impl_$.get_pieces = function(this1) {
	return StringTools.replace(this1,"\\","/").split("/");
};
tannus_sys__$Path_Path_$Impl_$.set_pieces = function(this1,a) {
	this1 = haxe_io_Path.join(a);
	return StringTools.replace(this1,"\\","/").split("/");
};
tannus_sys__$Path_Path_$Impl_$.join = function(this1,other) {
	return haxe_io_Path.join([this1,other]);
};
tannus_sys__$Path_Path_$Impl_$.resolve = function(this1,other) {
	if(!haxe_io_Path.isAbsolute(this1)) throw new js__$Boot_HaxeError("PathError: Cannot resolve a relative Path by another relative Path; One of them must be absolute!"); else {
		var mine = StringTools.replace(this1,"\\","/").split("/");
		var yours = StringTools.replace(other,"\\","/").split("/");
		var _g = 0;
		while(_g < yours.length) {
			var s = yours[_g];
			++_g;
			if(s == "." || s == "") continue; else if(s == "..") mine.pop(); else mine.push(s);
		}
		var res = haxe_io_Path.join(mine);
		if(!haxe_io_Path.isAbsolute(res)) res = "/" + res;
		var res1 = haxe_io_Path.normalize(res);
		res1 = StringTools.replace(res1,"~","/home/" + tannus_sys__$Path_Path_$Impl_$.un);
		res1 = haxe_io_Path.normalize(res1);
		res = res1;
		return res;
	}
};
tannus_sys__$Path_Path_$Impl_$.get_str = function(this1) {
	return this1;
};
tannus_sys__$Path_Path_$Impl_$.get_os = function() {
	return "web";
};
var tannus_sys_VVType = $hxClasses["tannus.sys.VVType"] = { __ename__ : ["tannus","sys","VVType"], __constructs__ : ["VVFile","VVFolder"] };
tannus_sys_VVType.VVFile = ["VVFile",0];
tannus_sys_VVType.VVFile.toString = $estr;
tannus_sys_VVType.VVFile.__enum__ = tannus_sys_VVType;
tannus_sys_VVType.VVFolder = ["VVFolder",1];
tannus_sys_VVType.VVFolder.toString = $estr;
tannus_sys_VVType.VVFolder.__enum__ = tannus_sys_VVType;
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
		return this2.map(function(b) {
			return String.fromCharCode(b);
		}).join("");
	}
};
var war_core_Ent = function() {
	gryffin_core_Entity.call(this);
	this.rect = new tannus_geom_CRectangle(0,0,0,0);
};
$hxClasses["war.core.Ent"] = war_core_Ent;
war_core_Ent.__name__ = ["war","core","Ent"];
war_core_Ent.__super__ = gryffin_core_Entity;
war_core_Ent.prototype = $extend(gryffin_core_Entity.prototype,{
	get_x: function() {
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
	,__class__: war_core_Ent
	,__properties__: {set_h:"set_h",get_h:"get_h",set_w:"set_w",get_w:"get_w",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"}
});
var war_world_Tile = function(src) {
	war_core_Ent.call(this);
	this.texture = gryffin_display_Image.load("assets/images/grass.png");
	this.canvas = null;
	this.rotation = 0;
	this.shape = new tannus_geom_Ellipse(25,25,50,50);
	this.vertices = this.shape.getVertices();
	var matrix = new tannus_geom_Matrix();
	var offset;
	var this1 = this.shape.get_rect().get_center();
	offset = this1.multFloat(-1);
	var rot = 0;
	matrix.translate(offset.get_x(),offset.get_y());
	offset = offset.multFloat(-1);
	matrix.rotate(rot * 3.141592653589793 / 180);
	matrix.translate(offset.get_x(),offset.get_y());
	this.vertices.apply(matrix);
	this.set_w(this.set_h(this.size = 100));
};
$hxClasses["war.world.Tile"] = war_world_Tile;
war_world_Tile.__name__ = ["war","world","Tile"];
war_world_Tile.__super__ = war_core_Ent;
war_world_Tile.prototype = $extend(war_core_Ent.prototype,{
	init: function(s) {
		this.rect.set_center((function($this) {
			var $r;
			var this1 = new tannus_geom_CRectangle(0,0,s.canvas.width,s.canvas.height).get_center();
			$r = (function($this) {
				var $r;
				var x = this1.get_x();
				var y = this1.get_y();
				var z = this1.get_z();
				$r = new tannus_geom_TPoint(x,y,z);
				return $r;
			}($this));
			return $r;
		}(this)));
		console.log("Creating and drawing Canvas");
	}
	,render: function(s,c) {
		var _g = this;
		var took = (function() {
			var __now = new Date().getTime();
			_g.draw(c);
			return Std["int"](new Date().getTime() - __now);
		})();
		c.fillStyle = "black";
		var text = "Drawing took " + took + "ms";
		var mesur = c.measureText(text);
		c.font = "14pt Monospace";
		c.fillText(text,s.canvas.width - mesur.width - 10,20);
	}
	,draw: function(c) {
		var mid = this.stage.get_rect().get_center();
		c.strokeStyle = "#FF0000";
		c.lineWidth = 1;
		gryffin_display_CtxTools.drawVertices(c,this.vertices);
		var cr = this.vertices.getContainingRect();
		c.strokeStyle = "#0000FF";
		c.lineWidth = 1;
		gryffin_display_CtxTools.drawVertices(c,cr.getVertices());
	}
	,rotVerts: function(m) {
		var this1 = this.rect.getVertices();
		return this1.map(function(p) {
			return m.transformPoint(p);
		});
	}
	,buildMatrix: function() {
		var half = this.rect.divide(tannus_ds__$EitherType_EitherType_$Impl_$.fromL(2));
		var matrix = new tannus_geom_Matrix();
		matrix.translate(this.rect.x,this.rect.y);
		return matrix;
	}
	,update: function(s) {
		war_core_Ent.prototype.update.call(this,s);
		this.rect.set_center((function($this) {
			var $r;
			var this1 = new tannus_geom_CRectangle(0,0,s.canvas.width,s.canvas.height).get_center();
			$r = (function($this) {
				var $r;
				var x = this1.get_x();
				var y = this1.get_y();
				var z = this1.get_z();
				$r = new tannus_geom_TPoint(x,y,z);
				return $r;
			}($this));
			return $r;
		}(this)));
		var degs = this.rotation++;
		degs;
	}
	,set_size: function(v) {
		return this.set_w(this.set_h(this.size = v));
	}
	,__class__: war_world_Tile
	,__properties__: $extend(war_core_Ent.prototype.__properties__,{set_size:"set_size"})
});
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
tannus_sys_JavaScriptFileSystem.load();
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
tannus_geom_Bezier.PRECISION = 100;
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
tannus_nore_Compiler.initHelpers = new tannus_io_Signal();
tannus_nore_Lexer.COMPLETION_ERROR = "::-EOI-::";
tannus_nore_ORegEx.ast_results = new haxe_ds_StringMap();
tannus_nore_Parser.COMPLETION_ERROR = "@>EOI<@";
tannus_sys__$Path_Path_$Impl_$.un = "ryan";
Game.main();
})(typeof console != "undefined" ? console : {log:function(){}});
