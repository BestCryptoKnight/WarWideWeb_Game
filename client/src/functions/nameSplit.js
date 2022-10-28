export const profileNameSpilit = (username) => {
    let nameSplit = username.split(' ');
    let first = nameSplit[1] === undefined ? nameSplit[0].substring(0,5) : nameSplit[0].substring(0,5)+ " " + nameSplit[1].substring(0,1);     
    return first; 
};
