/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

///<reference path="../Primitive.d.ts"/>
///<reference path="ISet.d.ts"/>
///<reference path="IEnumerableOrArray.d.ts"/>
import LinkedNodeList from "./LinkedNodeList";
import ArgumentNullException from "../Exceptions/ArgumentNullException";
import {forEach, empty as emptyEnumerator} from "./Enumeration/Enumerator";
import {using} from "../Disposable/dispose";
import {areEqual} from "../Compare";
import CollectionBase from "./CollectionBase";

const OTHER = 'other';

abstract class SetBase<T>
extends CollectionBase<T> implements ISet<T>, IDisposable
{

	constructor(source?:IEnumerableOrArray<T>)
	{
		super(null, areEqual);
		this._importEntries(source);
	}

	protected abstract newUsing(source?:IEnumerableOrArray<T>):SetBase<T>;

	protected _set:LinkedNodeList<ILinkedNodeWithValue<T>>;

	protected _getSet():LinkedNodeList<ILinkedNodeWithValue<T>>
	{
		var s = this._set;
		if(!s) this._set = s = new LinkedNodeList<ILinkedNodeWithValue<T>>();
		return s;
	}

	protected getCount():number
	{
		return this._set ? this._set.unsafeCount : 0;
	}

	exceptWith(other:IEnumerableOrArray<T>):void
	{
		var _ = this;
		if(!other) throw new ArgumentNullException(OTHER);

		forEach(other, v=>
		{
			if(_._removeInternal(v))
				_._incrementModified();
		});

		_._signalModification();
	}

	intersectWith(other:IEnumerableOrArray<T>):void
	{
		if(!other) throw new ArgumentNullException(OTHER);

		var _ = this;
		if(other instanceof SetBase)
		{
			let s = _._set;
			if(s) s.forEach(n=>
			{
				if(!other.contains(n.value) && _._removeInternal(n.value))
					_._incrementModified();
			});

			_._signalModification();
		}
		else
		{
			using(_.newUsing(other), o=>_.intersectWith(o));
		}
	}

	isProperSubsetOf(other:IEnumerableOrArray<T>):boolean
	{
		if(!other) throw new ArgumentNullException(OTHER);

		return other instanceof SetBase
			? other.isProperSupersetOf(this)
			: using(this.newUsing(other), o=> o.isProperSupersetOf(this));
	}

	isProperSupersetOf(other:IEnumerableOrArray<T>):boolean
	{
		if(!other) throw new ArgumentNullException(OTHER);

		var result = true, count:number;
		if(other instanceof SetBase)
		{
			result = this.isSupersetOf(other);
			count = other.getCount();
		}
		else
		{
			using(this.newUsing(), o=>
			{
				forEach(other, v=>
				{
					o.add(v); // We have to add to another set in order to filter out duplicates.
					return result = this.contains(v);
				});
				count = o.getCount();
			});
		}

		return result && this.getCount()>count;
	}

	isSubsetOf(other:IEnumerableOrArray<T>):boolean
	{
		if(!other) throw new ArgumentNullException(OTHER);

		return other instanceof SetBase
			? other.isSupersetOf(this)
			: using(this.newUsing(other), o=> o.isSupersetOf(this));
	}

	isSupersetOf(other:IEnumerableOrArray<T>):boolean
	{
		if(!other) throw new ArgumentNullException(OTHER);

		var result = true;
		forEach(other, v=>
		{
			return result = this.contains(v);
		});
		return result;
	}

	overlaps(other:IEnumerableOrArray<T>):boolean
	{
		if(!other) throw new ArgumentNullException(OTHER);

		var result = false;
		forEach(other, v => !(result = this.contains(v)));
		return result;
	}

	setEquals(other:IEnumerableOrArray<T>):boolean
	{
		if(!other) throw new ArgumentNullException(OTHER);

		return this.getCount()==(
				other instanceof SetBase
					? other.getCount()
					: using(this.newUsing(other), o=> o.getCount()))
			&& this.isSubsetOf(other);
	}

	symmetricExceptWith(other:IEnumerableOrArray<T>):void
	{
		if(!other) throw new ArgumentNullException(OTHER);

		var _ = this;
		if(other instanceof SetBase)
		{
			forEach(other, v=>
			{
				if(_.contains(v))
				{
					if(_._removeInternal(v))
						_._incrementModified();
				}
				else
				{
					if(_._addInternal(v))
						_._incrementModified();
				}
			});

			_._signalModification();
		}
		else
		{
			using(this.newUsing(other), o=>_.symmetricExceptWith(o));
		}
	}

	unionWith(other:IEnumerableOrArray<T>):void
	{
		this.importEntries(other);
	}


	protected _clearInternal():number
	{
		var s = this._set;
		return s ? s.clear() : 0;
	}

	protected _onDispose():void
	{
		super._onDispose();
		this._set = null;
	}

	protected abstract _getNode(item:T):ILinkedNodeWithValue<T>;

	contains(item:T):boolean
	{
		return !(!this.getCount() || !this._getNode(item));
	}

	getEnumerator():IEnumerator<T>
	{
		var s = this._set;
		return s && this.getCount()
			? LinkedNodeList.valueEnumeratorFrom<T>(s)
			: emptyEnumerator;
	}

	forEach(
		action:Predicate<T> | Action<T>,
		useCopy:boolean = false):void
	{
		if(useCopy) super.forEach(action, useCopy);
		else this._set.forEach((node, i)=>action(node.value, i));
	}

	protected _removeNode(node:ILinkedNodeWithValue<T>):boolean
	{
		if(!node) return false;
		return this.remove(node.value)!=0;
	}

	removeFirst():boolean
	{
		var s = this._set;
		return this._removeNode(s && s.first);
	}

	removeLast():boolean
	{
		var s = this._set;
		return this._removeNode(s && s.last);
	}


}

function wipe(map:IMap<any>, depth:number = 1):void
{
	if(map && depth)
	{
		for(var key of Object.keys(map))
		{
			var v = map[key];
			delete map[key];
			wipe(v, depth - 1);
		}
	}
}

export default SetBase;