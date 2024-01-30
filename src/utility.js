export function addDependencyScripts(depArray) {
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