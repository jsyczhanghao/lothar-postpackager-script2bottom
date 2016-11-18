lothar-postpackager-script2bottom
=========================================

lothar的postpackager阶段插件，将带有bottom属性的script标签移动至body结束标签的上方

### 使用

```sh
lothar init demo/common --module
cd demo/common
npm install lothar-postpackager-script2bottom
```

修改lothar项目的conf文件


conf/conf.js
```js
//注，lothar中有一个默认的postpackager的插件，此插件用于收集所有的静态资源，所以这边使用push，而不是直接set
lothar.config.get('postpackager').push('script2bottom');
```

index.html
```html
@extends('./layout')

<!--重写content中的内容-->
@section('content')
    <script bottom>
    require.async('static/index.js');
    </script>

    <script>
    console.log(123);
    </script>
@endsection
```

```
lothar release
```

index.html
```html
<html>
<body>
<script>
console.log(123);
</script>
<script>
require.async('static/index.js');
</script>
</body> 
</html>
```
