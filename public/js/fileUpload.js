FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode,
)

FilePond.setOptions({
  stylePanelAspectRatio: 240 / 320,
  imageResizeTargetWidth: 240,
  imageResizeTargetWidth: 320
})

FilePond.parse(document.body);