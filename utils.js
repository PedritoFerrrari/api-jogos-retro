function validarData(data) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!regex.test(data)) {
        console.log(data, 'primeiro if')
        return false;
    }

    const [ano, mes, dia] = data.split('-');
    const dataValida = new Date(ano, mes - 1, dia);

    return dataValida.getFullYear() === parseInt(ano) &&
           dataValida.getMonth() === parseInt(mes) - 1 &&
           dataValida.getDate() === parseInt(dia);
}

module.exports = {
    validarData
};