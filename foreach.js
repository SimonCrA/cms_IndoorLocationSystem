const filteredCategories = [];
const categories = [{
        rssi: -31,
        id: 'c4:4f:33:0b:aa:1b',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930124188,
        fechaRpi: '1566930124188',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -49,
        id: 'cc:50:e3:a9:8e:d6',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930124191,
        fechaRpi: '1566930124191',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -36,
        id: 'c4:4f:33:0b:aa:1b',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930125046,
        fechaRpi: '1566930125046',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -61,
        id: 'cc:50:e3:a9:8e:d6',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930125128,
        fechaRpi: '1566930125128',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -64,
        id: 'cc:50:e3:a9:8e:d6',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930126061,
        fechaRpi: '1566930126061',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -40,
        id: 'c4:4f:33:0b:aa:1b',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930126076,
        fechaRpi: '1566930126076',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -31,
        id: 'c4:4f:33:0b:aa:1b',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930127027,
        fechaRpi: '1566930127027',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -74,
        id: 'cc:50:e3:a9:8e:d6',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930127058,
        fechaRpi: '1566930127058',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -39,
        id: 'c4:4f:33:0b:aa:1b',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930128055,
        fechaRpi: '1566930128055',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -64,
        id: 'cc:50:e3:a9:8e:d6',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930128089,
        fechaRpi: '1566930128089',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -52,
        id: 'cc:50:e3:a9:8e:d6',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930129020,
        fechaRpi: '1566930129020',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -31,
        id: 'c4:4f:33:0b:aa:1b',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930129078,
        fechaRpi: '1566930129078',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -50,
        id: 'cc:50:e3:a9:8e:d6',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930130043,
        fechaRpi: '1566930130043',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -31,
        id: 'c4:4f:33:0b:aa:1b',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930130087,
        fechaRpi: '1566930130087',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -35,
        id: 'c4:4f:33:0b:aa:1b',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930131017,
        fechaRpi: '1566930131017',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -52,
        id: 'cc:50:e3:a9:8e:d6',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930131082,
        fechaRpi: '1566930131082',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -63,
        id: 'cc:50:e3:a9:8e:d6',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930132026,
        fechaRpi: '1566930132026',
        beacontype: 'eddystoneUid',
        d: 5
    },
    {
        rssi: -40,
        id: 'c4:4f:33:0b:aa:1b',
        macrpi: 'b8:27:eb:d4:04:c9',
        fecha: 1566930132035,
        fechaRpi: '1566930132035',
        beacontype: 'eddystoneUid',
        d: 5
    }
]

categories.forEach(category => {
    if (!filteredCategories.find(cat => cat.id == category.id && cat.macrpi == category.macrpi)) {
        const {
            id,
            macrpi
            
        } = category;
        filteredCategories.push({
         id,
         macrpi
        });
    }
});


console.log(filteredCategories);