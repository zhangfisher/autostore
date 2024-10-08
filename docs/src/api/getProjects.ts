
export interface Project {
  name: string;
  url: string;
  stars: number;
}

export async function getProjects(url:string): Promise<Project[]> {
  //   const apiUrl = "https://api.github.com/users/zhangfisher/repos";
  const response = await fetch(url);

  if(response.ok){
    const data = await response.json();
    const projects: Project[] = data.map((repo: any) => ({
      name: repo.name,
      url: repo.html_url,
      description:repo.description,
      stars: repo.stargazers_count,
    }));
    return projects;
  }else{
    throw new Error(`${response.status} - ${response.statusText}`);
  }
}
