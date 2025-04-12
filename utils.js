function dataValida(data) {
    const date = new Date(data);
    if (isNaN(date.getTime())) return false;
    const [ano, mes, dia] = data.split('-').map(Number);

    return (
        date.getFullYear() === ano &&
        date.getMonth() + 1 === mes &&
        date.getDate() === dia
    );
}

module.exports = {
    dataValida
};