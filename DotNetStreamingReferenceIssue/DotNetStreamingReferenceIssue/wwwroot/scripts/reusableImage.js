const imageDict = {};


export async function setImage(imageStream, imgName, contentType) {
    var image;

    if ((imageDict[imgName] === null || imageDict[imgName] === undefined) &&
        (imageStream !== null && imageStream !== undefined)) {

        //Get arrayBuffer from image stream
        const arrayBuffer = await imageStream.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: contentType });

        //Create image and opbject url
        var imageUrl = URL.createObjectURL(blob);
        image = new Image();
        image.src = imageUrl;
        image.onload = () => {
            URL.revokeObjectURL(imageUrl);
        }
        //Save image in dictionary
        imageDict[imgName] = image;
    } else {
        //Load existing image from dictionary
        image = imageDict[imgName];
    }
}