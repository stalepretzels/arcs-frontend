export function addDependencyScripts(depArray) {
    let scriptList = []
    depArray.forEach((elem)=>{
      let script = document.createElement('script');
      script.src = elem;
      scriptList.push(script);
      document.body.appendChild(script);
    })
    return scriptList;
  }

  export function addDependencyScriptsModule(depArray) {
    let scriptList = []
    depArray.forEach((elem)=>{
      let script = document.createElement('script');
      script.type = "module"
      script.src = elem;
      scriptList.push(script);
      document.body.appendChild(script);
    })
    return scriptList;
  }
  export async function addDependencyScriptsAsync(depArray) {
    let scriptList = [];
    for (const elem of depArray) {
        let script = document.createElement('script');
        script.src = elem;
        script.async = true;
        scriptList.push(script);
        document.body.appendChild(script);
        await new Promise(resolve => {
            script.onload = resolve;
        });
    }
    return scriptList;
}
  export function addDependencyScriptsDefer(depArray) {
    let scriptList = []
    depArray.forEach((elem)=>{
      let script = document.createElement('script');
      script.src = elem;
      script.defer = true
      scriptList.push(script);
      document.body.appendChild(script);
    })
    return scriptList;
  }