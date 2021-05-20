const getProp = ( name:string ) => {
    return ( props:string ): string[] => {
        return props[name];
    };
};

export {
    getProp
};
