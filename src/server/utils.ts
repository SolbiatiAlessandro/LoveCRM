// TODO: when have internet check how to do this
export function mergeDictionaries(dict1, dict2){
	let res = {}
	Object.keys(dict1).map(k => res[k] = dict1[k]);
	Object.keys(dict2).map(k => res[k] = dict2[k]);
	return res
}
