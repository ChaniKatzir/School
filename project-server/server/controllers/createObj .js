exports.cr=(p,attribute_key ,attribute_value)=>
{    
    if(attribute_value)
        p[attribute_key] =attribute_value;
        return p
}