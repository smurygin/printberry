const escpos = require('escpos');
escpos.SerialPort = require('escpos-serialport');

const serialDeviceOnLinux = new escpos.SerialPort('/dev/usb/lp0', {
  baudRate: 14400,
  stopBit: 2,
});

const options = { encoding: 'GB18030' /* default */ };

const printer = new escpos.Printer(serialDeviceOnLinux, options);

serialDeviceOnLinux.open(() => {
  printer
    .font('A')
    .align('CT')
    .style('BU')
    .size(1, 1)
    .text('The quick brown fox jumps over the lazy dog')
    .text('Русский текст')
    .barcode('1234567', 'EAN8')
    .close();
});
