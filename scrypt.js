import db from './db.json' assert{type: 'json'}

let tabs = document.querySelectorAll('.tab')
let infos = document.querySelectorAll('.info')
let screen = document.querySelectorAll('.screen')
let sections = document.querySelectorAll('.section')

let projects = document.querySelector('.projects')
let projectsTabs = document.querySelector('.projects-tab')

tabs.forEach(element => {
    element.addEventListener('click', () => {
        if (!element.classList.contains('selected')) {
            element.classList.add('selected')

            tabs.forEach(tab => {
                if (tab !== element && tab.classList.contains('selected')) {
                    tab.classList.remove('selected')
                }
            })
        }
        SelectedInfo(element.classList, infos)
    })
})

screen.forEach(element => {

    element.addEventListener('click', () => {
        if (!element.classList.contains('selected')) {
            element.classList.add('selected')

            screen.forEach(tab => {
                if (tab !== element && tab.classList.contains('selected')) {
                    tab.classList.remove('selected')
                }
            })
        }
        SelectedInfo(element.classList, sections)
    })
})

db.projects.forEach(project => {
    // elements
    let projectSection = document.createElement('div')
    projectSection.setAttribute('class', 'project')
    let projectTab = document.createElement('li')
    projectTab.classList.add('project-tab')
    projectTab.classList.add(db.projects.indexOf(project))
    projectTab.innerText = project.nome

    let projectName = document.createElement('h1')
    projectName.setAttribute('class', 'title')
    projectName.innerText = project.nome
    let projectDescription = document.createElement('div')
    projectDescription.setAttribute('class', 'description')
    projectDescription.innerText = project.description
    let projectImage = document.createElement('img')
    projectImage.setAttribute('class', 'project-image')
    projectImage.src = project.image
    projectImage.alt = 'Home do Projeto'
    let projectSkills = document.createElement('div')
    projectSkills.classList.add('project-skills')
    projectSkills.innerHTML = `<h1>Skills do Projeto</h1>`
    let skillsSection = document.createElement('div')
    skillsSection.classList.add('skills')
    let githubSection = document.createElement('div')
    githubSection.classList.add('githubbutton')
    let githubLink = document.createElement('a')
    githubLink.href = project.github
    githubLink.innerText = 'Vejo no GitHub'
    githubLink.target = '_blank'
    githubSection.appendChild(githubLink)

    for (let skill in project.skills) {
        if (project.skills[skill]) {
            let projectSkill = document.createElement('img')
            projectSkill.setAttribute('class', 'project-skill')
            projectSkill.src = "./src/images/producticons/" + skill + '.png'
            skillsSection.appendChild(projectSkill)
        }

    }
    projectSkills.appendChild(skillsSection)

    if (db.projects.indexOf(project) == 0) {
        projectTab.classList.add('selected')
        projectSection.classList.add('selected')
    }

    projectTab.addEventListener('click', () => {
        if (!projectTab.classList.contains('selected')) {
            projectTab.classList.add('selected')

            for (let child of projectsTabs.children) {
                if (child !== projectTab) {
                    child.classList.remove('selected')
                }
            }
        }

        if (!projectSection.classList.contains('selected')) {
            projectSection.classList.add('selected')

            for (let child of projects.children) {
                if (child !== projectSection) {
                    child.classList.remove('selected')
                }
            }
        }
    })

    // Project
    projectSection.appendChild(projectName)
    projectSection.appendChild(projectImage)
    projectSection.appendChild(projectDescription)
    projectSection.appendChild(projectSkills)
    projectSection.appendChild(githubSection)

    projectsTabs.appendChild(projectTab)
    projects.appendChild(projectSection)
})

// funções

// troca de informação exibida de acordo com a tab selecionada
function SelectedInfo(ClassList, RenderList) {
    RenderList.forEach(element => {
        element.classList.forEach(key => {
            if (ClassList.contains(key) && key !== 'selected') {
                element.classList.add('selected')
                RenderList.forEach(item => {
                    if (item !== element) {
                        item.classList.remove('selected')
                    }
                })
            }
        })
    })

}

