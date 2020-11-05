// import styles from '../scss/base/_export.scss';

FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode,
)

FilePond.setOptions({
  stylePanelAspectRatio: 1 / 1.5,
  imageResizeTargetWidth: 640,
  imageResizeTargetHeight: 480
})

FilePond.parse(document.body);