const ShipIcon: () => google.maps.Icon = () => {
    const shipSize = new google.maps.Size(50,50);
    return {
        url: 'https://p1.hiclipart.com/preview/459/325/166/fishing-ship-boat-watercraft-fishing-vessel-sailing-ship-sailboat-cartoon-png-clipart.jpg',
        scaledSize: shipSize
    }
};

export default ShipIcon;