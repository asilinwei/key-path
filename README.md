# key-path
Create object with key-path and values.     

2018-12-13     
LinWei     
    
Method:
```
zipObjectDeep
```       
Description:     
Create object with key-path and corresponding values.     
          
Parameters:     
`[props=[]](Array)`: The array of key-path.      
`[values=[]](Array)`: The array of corresponding values.      
           
Return:        
The result object.             
           
Example:
```
zipObjectDeep(['a', 'b'], [1, 2]);
// => {'a': 1, 'b': 2}

zipObjectDeep(['a.a.a', 'a.a.b'], [1, 2]);
// => {'a': {'a': {'a': 1, 'b': 2}}}

zipObjectDeep(['["a"]["a"]["a"]', '["a"]["a"]["b"]'], [1, 2]);
// => {'a': {'a': {'a': 1, 'b': 2}}}

zipObjectDeep(['a[0]', 'a[1]'], [1, 2]);
// => {'a': [1, 2]}

zipObjectDeep([['a', 'a'], ['a', 'b']], [1, 2]);
// => {'a': {'a': 1, 'b': 2}}
```                                                                                            