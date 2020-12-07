if (SW1 == 0)        // pressed
{
    delay_ms(30);   // debounce switch

    if (SW1 == 0) {                // LED will blink slow or fast
        while (SW1 == 0) {
            wdogtrig();
        }
        // wait for release
        // alternate between values and values/4 for OCR1A register
        // 4C40H / 4 = 1310H
        // new frequency = old frequency * 4
        if (OCR1AH == 0x4C) {
            TCNT1H = 0;
            TCNT1L = 0;
            OCR1AH = 0x13;
            OCR1AL = 0x10;
        }    //0x1310
        else if (OCR1AH == 0x13) {
            TCNT1H = 0;
            TCNT1L = 0;
            OCR1AH = 0x2F;
            OCR1AL = 0xA9;
        }    //0x2fa9
        else {
            TCNT1H= 0;
            TCNT1L= 0;
            OCR1AH = 0x4C;
            OCR1AL = 0x40;
        }    //0x4C40
    }
}
