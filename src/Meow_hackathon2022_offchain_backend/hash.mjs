function hash (principalId1, principalId2, message) {
    const HashElement = principalId1 + principalId2 + message;
    const characters  = JSON.stringify(HashElement);

    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    // console.log(generateString(53));
    const result = generateString(53);
    return result;
}

// console.log(hash("dkesy-xf3ry-tkw7f-emm7s-2ydc7-a5bni-wvm2y-lk4h3-ojjnh-wuah5-qae", "umjcv-bwcvj-5rbec-75wba-gjn6f-xbmux-ioeo2-docpe-4gk7v-serqx-uae", "This is message"));

export {hash}