let button = document.getElementById("button");
let username = document.getElementById("userid");
button.addEventListener("click", function gettingjson(){
    fetch('https://api.github.com/users/' + username.value)
    .then(response => response.json())
    .then(data => filltable(data))
})
let table1 = document.getElementById("table1")
let table2 = document.getElementById("table2")
let table3 = document.getElementById("table3")
let heading = document.getElementById("headlabel")
function filltable(data) {
    console.log(data)
    if (data.message == "Not Found") {
        alert("Invalid Username");
        return false
    }
    heading.style.visibility = "visible";
    table1.style.visibility = "visible";
    table2.style.visibility = "visible";
    table3.style.visibility = "visible";
    let row1 =
        `<tr><th>Login</th><td><a href="${data.html_url}">${data.login}</a></td></tr>
    <tr><th>Avatar</th><td><img src="${data.avatar_url} width="100px" height="100px"></img></td></tr>
    <tr><th>URL</th><td><a href="${data.url}">${data.url}</a></td></tr>
    <tr><th>Follower_URL</th><td>${data.followers}</td></tr>
    <tr><th>Following_URL</th><td>${data.following}</a></td></tr>
    <tr><th>Repos_URL</th><td><a href="${data.repos_url}">${data.repos_url}</a></td></tr>
    <tr><th>Public Repositories</th><td>${data.public_repos}</td></tr>
    <tr><th>Account Created at</th><td>${data.created_at}</td></tr>
    <tr><th>Account Updated at</th><td>${data.updated_at}</td></tr>`
    table1.innerHTML = row1
    repos(data)
}
function repos(data){
    let cred=data.created_at
    let updd=data.updated_at
    let row2=
    `<tr><td>${data.login}</td>
    <td>${data.public_repos}</td>
    <td>${finaldate(cred)}</td>
    <td>${finaldate(updd)}</td>
    <td>${diffdates(cred,updd)}</td>`
    table2.innerHTML+=row2
    reposno(data.repos_url,data.public_repos)
}
function finaldate(givendate){
    return givendate.slice(8,10)+"-"+givendate.slice(5,7)+"-"+givendate.slice(0,4)
}
function diffdates(cred,updd){

    var d1=new Date(cred)
    var d2=new Date(updd)
    const diffTime=Math.abs(d2.getTime()-d1.getTime())
    return Math.ceil(diffTime/(1000 * 60 * 60 * 24))
}
function diffdatestable3(cred,updd){
    var d1=new Date(cred)
    var d2=new Date()
    const diffTime=Math.abs(d2.getTime()-d1.getTime())
    return Math.ceil(diffTime/(1000 * 60 * 60 * 24))
}
function reposno(reposdata,reposlen){
    let i
    fetch(reposdata)
    .then(respone=>respone.json())
    .then(rdata=>thirdtable(rdata))
    async function thirdtable(rdata){
        console.log(rdata)
        for(i=0;i<reposlen;i++){
            let len=0
            const url='https://api.github.com/repos/' + rdata[i].full_name +'/contents'
            const data=fetch(url)
            const js=await data
            const formatdata=await js.json()
            if(formatdata.message=="This repository is empty.")
                len=0
            else
                len=formatdata.length
            row3=
            `<tr><td><a href="${rdata[i].html_url}">${rdata[i].name}</a></td>
            <td>${len}</td>
            <td>${finaldate(rdata[i].created_at)}</td>
            <td>${finaldate(rdata[i].updated_at)}</td>
            <td>${diffdatestable3(rdata[i].created_at,rdata[i].updated_at)}</td></tr>`
            table3.innerHTML += row3
        }
    }
}