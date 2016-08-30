Project demonstrates production workflow with JSPM, Typescript and Less. It also demonstrates continous development approach with browser-sync.

**Installation Steps:**

1. Run **_"npm install"_**

2. Run **_"jspm install"_**

3. For building multi branded _less_ based styles, we have to register customized version of less plugin  
  **_cd bin\jspm\plugins\systemjs-less-plugin@1.8.3_**  
  **_jspm link github:plugins/systemjs-less-plugin@1.8.3_**  
  go back to the project directory and  
  **_cd jspm-typescript_**  
  **_jspm install --link github:plugins/systemjs-less-plugin@1.8.3_**  
    
     
**Workflow:**

1. For continous development, run **_node make.js_**

2. For production build, run **_node make.js --watch=false_**
