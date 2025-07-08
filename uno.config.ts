import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
  },
})
