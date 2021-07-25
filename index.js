const canvas = document.getElementById("main_canvas");
let ctx = canvas.getContext("2d");

async function main() {
  // Load the model.
  // Load the MediaPipe Facemesh package.
  const model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);

  // Pass in an image or video to the model. The model returns an array of
  // bounding boxes, probabilities, and landmarks, one for each detected face.


  const predictions = await model.estimateFaces({
    input: document.querySelector("img")
  });

  if (predictions.length > 0) {
    for (let i = 0; i < predictions.length; i++) {
      const start = predictions[i].boundingBox.topLeft;
      const end = predictions[i].boundingBox.bottomRight;
      const size = [end[0] - start[0], end[1] - start[1]];

      // Render a rectangle over each detected face.
      ctx.drawImage(document.querySelector("img"), 0, 0, 600, 600);
      ctx.strokeStyle = "red";
      ctx.lineWidth = "4";
      ctx.rect(start[0], start[1], size[0], size[1]);
      ctx.stroke();
    }

    // fill left eye rectangle
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = "2";
    const start = predictions[0].annotations.leftEyebrowUpper[1]
    const width = predictions[0].annotations.leftEyeLower3[8][0] - predictions[0].annotations.leftEyebrowUpper[1][0];
    const height = predictions[0].annotations.leftEyeLower3[3][1] - predictions[0].annotations.leftEyebrowUpper[1][1];
    ctx.rect(start[0], start[1], width, height);
    ctx.stroke();
    // ctx.fillRect(predictions[0].annotations.leftEyeLower3[3][0], predictions[0].annotations.leftEyeLower3[3][1], 2, 2);
    // ctx.fillRect(predictions[0].annotations.leftEyeLower3[8][0], predictions[0].annotations.leftEyeLower3[8][1], 2, 2); this was used for width
    // ctx.fillRect(predictions[0].annotations.leftEyeUpper2[3][0], predictions[0].annotations.leftEyeUpper2[3][1], 2, 2);
    // ctx.fillRect(predictions[0].annotations.leftEyebrowUpper[1][0], predictions[0].annotations.leftEyebrowUpper[1][1], 2, 2);

    ctx.fillStyle = "yellow";

    predictions[0].annotations.rightEyeIris.forEach((landmark) => {
      ctx.fillRect(landmark[0], landmark[1], 5, 5);
    });

    predictions[0].annotations.leftEyeIris.forEach((landmark) => {
      ctx.fillRect(landmark[0], landmark[1], 5, 5);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    // fill right eye rectangle
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = "2";
    const start_right = predictions[0].annotations.rightEyebrowUpper[1]
    const width_right = predictions[0].annotations.rightEyeLower3[8][0] - predictions[0].annotations.rightEyebrowUpper[1][0];
    const height_right = predictions[0].annotations.rightEyeLower3[3][1] - predictions[0].annotations.rightEyebrowUpper[1][1];
    ctx.rect(start_right[0], start_right[1], width_right, height_right);
    ctx.stroke();

    // fill bottom nose 
    ctx.fillRect(predictions[0].annotations.noseTip[0][0], predictions[0].annotations.noseTip[0][1], 5, 5);
    ctx.fillRect(predictions[0].annotations.noseBottom[0][0], predictions[0].annotations.noseBottom[0][1], 5, 5);
    // fill lips rectangle
    ctx.fillRect(predictions[0].annotations.lipsLowerInner[5][0], predictions[0].annotations.lipsLowerInner[5][1], 5, 5);
    // fill left face end
    ctx.fillRect(predictions[0].annotations.silhouette[8][0], predictions[0].annotations.silhouette[8][1], 5, 5);
    // fill right face end
    ctx.fillRect(predictions[0].annotations.silhouette[28][0], predictions[0].annotations.silhouette[28][1], 5, 5);
    // fill bottom face end
    ctx.fillRect(predictions[0].annotations.silhouette[18][0], predictions[0].annotations.silhouette[18][1], 5, 5);

    // fill left eye end 
    ctx.fillRect(predictions[0].annotations.leftEyeLower0[0][0], predictions[0].annotations.leftEyeLower0[0][1], 5, 5);
    // fill left eye start
    ctx.fillRect(predictions[0].annotations.leftEyeLower0[8][0], predictions[0].annotations.leftEyeLower0[8][1], 5, 5);


    // fill right eye end 
    ctx.fillRect(predictions[0].annotations.rightEyeLower0[0][0], predictions[0].annotations.rightEyeLower0[0][1], 5, 5);
    // fill right eye start
    ctx.fillRect(predictions[0].annotations.rightEyeLower0[8][0], predictions[0].annotations.rightEyeLower0[8][1], 5, 5);


    console.log(predictions);

  }
}

main();