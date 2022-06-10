export const getHash = ()=>{
    if (location.hash.length >= 1) {
        if(location.hash.startsWith('#/search=')){
            return '/search=';
        } else if (location.hash.startsWith('#/categories')){
            return '/categories';
        } else if(location.hash.startsWith('#/details')){
            return '/details'
        }

        return location.hash.split('#')[1];
    } 

    return '/'
}