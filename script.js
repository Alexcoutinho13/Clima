document.querySelector('.inputArea').addEventListener('submit', async (event)=> {
    event.preventDefault()
    let input = document.querySelector('#inputCity').value
    if(input !== '') {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=
            ${encodeURI(input)}&units=metric&lang=pt_br&appid=d06cdb298fafc83c520d5ab677fc477e`
        let results = await fetch(url)
        let json = await results.json()
        if(json.cod === 200) {
            document.querySelector('.info').style.display = 'block'
            let tempInfo = document.querySelector('.tempInfo')
            let tempImg = document.querySelector('.tempImg img')
            let ventoInfo = document.querySelector('.ventoInfo')
            let ventoImg = document.querySelector('.ventoImg')
            let cityName = document.querySelector('.cityName')


            cityName.innerHTML = `${json.name}, ${json.sys.country}`
            tempInfo.innerHTML = `${json.main.temp} <sup>º C</sup>`
            ventoInfo.innerHTML = `${json.wind.speed} <span>Km/h</span>`
            tempImg.setAttribute('src', `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`)

        } else {
            exibirAlerta('[ERRO] Não localizamos a cidade digitada, tente novamente!')
            fecharAlerta()
        }
    
    
    } else {
        exibirAlerta('[ERRO] Digite um nome válido!')
        fecharAlerta()
    }
})

function exibirAlerta(msg) {
    let avisoTexto = document.querySelector('.avisoTexto')
    let aviso = document.querySelector('.aviso')
    avisoTexto.innerHTML = msg
    aviso.style.display = 'block'
}

function fecharAlerta() {
    let aviso = document.querySelector('.aviso')
    let avisoX = document.querySelector('.avisoX i')
    avisoX.addEventListener('click', () => {
        aviso.style.display = 'none'
    })
}