import { DrawEventParams } from "../common/type";
import Plugin from "./Plugin";

const blobToDataURI = (blob, callback) => {
  var reader = new FileReader();
  reader.onload = function(e) {
    callback(e.target.result);
  };
  reader.readAsDataURL(blob);
};

export default class Save extends Plugin {
  name = "save";
  iconfont = "fa fa-save";
  title = "保存";

  onEnter = (drawEventParams: DrawEventParams) => {
    const { stage, pixelRatio, callBase64Back } = drawEventParams;
    // 延迟下载，等触发 plugin 的 onLeave 生命周期，清除未完成的现场
    setTimeout(() => {
      const canvas = stage.toCanvas({ pixelRatio });
      canvas.toBlob(function(blob: any) {
        blobToDataURI(blob, (data) => {
          callBase64Back && callBase64Back(data);
        });
      }, "image/jpeg");
    }, 100);
  };
}
