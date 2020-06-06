//Array with 3 student names

let stuNames = ['Bob','Mary','Riley'];

//Loop for adding 3 more names
for ( let i=0; i<3; i++) {
    let newName=prompt('Please add a Name');
    stuNames.push(newName);
}

//Loop that console.logs each name

for (i in stuNames){
    console.log(stuNames[i])
};