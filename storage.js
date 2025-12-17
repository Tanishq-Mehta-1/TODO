// import { allProjects } from "./controller";

function saveProjects(allProjects){
    localStorage.clear();
    localStorage.setItem("myProjects", JSON.stringify(allProjects));
}

function loadProjects(){
    const data = localStorage.getItem("myProjects");
    if (data)
        return JSON.parse(data);
    else
        return [];
}

export {saveProjects, loadProjects};