contentLoad();

function contentLoad()
{
    let url = 'http://localhost:3000/api/teddies';
    fetch('http://localhost:3000/api/teddies').then((Response) => 
        Response.json().then((data) => 
        {
            console.log(data);
            let display = '<div>';
            for(let teddy of data)
            {
                display += '<a> ${teddy.imageUrl}</a>';
            }
            display += '</div>';
            document.querySelector('#content').innerHTML = display;
        })
    ).catch(err => console.log('error : '+ err));
}