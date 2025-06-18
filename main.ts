type IRC = {
    l: DigitalPin,
    c: DigitalPin,
    p: DigitalPin
}
const min_vzdalenost: number = 20 //to do cm
const motor_rovne_l: number = 175*0.75 //to do
const motor_rovne_p: number = 200 * 0.75 //to do
const IR: IRC = {
    l: DigitalPin.P1,
    c: DigitalPin.P8,
    p: DigitalPin.P2
}
radio.setTransmitPower(5)
radio.setGroup(2)
pins.setPull(IR.l, PinPullMode.PullNone);
pins.setPull(IR.c, PinPullMode.PullNone);
pins.setPull(IR.p, PinPullMode.PullNone);
let data_l = 0
let data_c = 0
let data_p = 0
let cesta: number = 0
let cas_jizda: number = 0
let vzdalenost: number = 0



// příjmání další odbočky
radio.onReceivedNumber(function (receivedNumber: number) {
    
//    if (123380923 === radio.receivedPacket(RadioPacketProperty.SerialNumber)) {
        cesta = receivedNumber
        basic.showNumber(cesta)
//    }
})

//otočka 90°
function o90(strana: number) {
    if (strana === 1) {
        jed(250, 0)
        basic.pause(20)//TO DO

    }
    else {
        jed(0, 250)
        basic.pause(20)//TO DO

    }

}
//j



//jeď
function jed(motor_p: number, motor_l: number) {
    basic.pause(20)
    PCAmotor.MotorRun(PCAmotor.Motors.M1, motor_l)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, motor_p)

}
//automat

    //    else {
    //        // čára ztracena, např. couvni nebo zastav
    //        jed(-100, -100)
    //    }




function objed() {
    while (!(vzdalenost === 0)) {
        jed(motor_rovne_p, motor_rovne_l)
        vzdalenost = sonar.ping(DigitalPin.P10, DigitalPin.P11, PingUnit.Centimeters)
        basic.pause(20)
    }
    jed(motor_rovne_p, motor_rovne_l)
    basic.pause(1000)//to do o kolik přejet

}
control.inBackground(function() {
    basic.forever(function(){
    data_l = pins.digitalReadPin(IR.l);
    data_c = pins.digitalReadPin(IR.c);
    data_p = pins.digitalReadPin(IR.p);
    vzdalenost = sonar.ping(DigitalPin.P10, DigitalPin.P11, PingUnit.Centimeters)
    })
})


basic.forever(function () {



    //překážka senzor zaznamená prěkážku
    //if(vzdalenost<min_vzdalenost && !(vzdalenost===0)){
    //    o90(1)
    //    pins.servoWritePin(AnalogPin.P1, 90)//to do
    //    basic.pause(500)
    //    cas_jizda = input.runningTime()
    //    objed()
    //    cas_jizda = input.runningTime() - cas_jizda
    //    o90(-1)
    //    objed()
    //    o90(-1)
    //    jed(motor_rovne_p, motor_rovne_l)
    //    basic.pause(cas_jizda)
    //    o90(1)
    //    pins.servoWritePin(AnalogPin.P1, 10)//to do
    //    basic.pause(500)
    //}

    //pravý i levý senzor odbočka 
    //levá
    //else
    if (cesta === 1 && data_l === 1) {
        o90(1)
    }

    //pravá
    else if (cesta === 2 && data_p === 1) {
        o90(2)
    }
    //rovně
    else if (data_c === 1 && cesta === 3) {
        jed
    }








    //zabočení do prava
    if (data_l === 1 && data_p === 0) {
        jed(motor_rovne_p*0.5, 0)


    }

    //zabočení do leva
    else if (data_l === 0 && data_p === 1) {
        jed(0, motor_rovne_l*0.5)

    }

    else if (data_c === 1 && data_l === 0 && data_p === 0) {
        // střed jede po čáře
        jed(motor_rovne_p, motor_rovne_l)
    }
    else if (data_c === 1 && data_l === 1 && data_p === 1) {
        // střed jede po čáře
        jed(motor_rovne_p, motor_rovne_l)
    }
    else if (data_c === 1 && data_l === 0 && data_p === 0) {
        jed(motor_rovne_p, motor_rovne_l)
        

        }
})