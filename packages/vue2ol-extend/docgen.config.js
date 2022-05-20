
module.exports = {
    componentsRoot: './src/components/',
    components: '**/[a-z|A-Z]*.vue',
    outDir: './docs/components',
    // componentsRoot: 'src/test/',
    // components: '**/[a-z|A-Z]*.vue',
    // outDir: '../../docs/vue2ol/test/',
    defaultExamples: false,
    // getDocFileName: (componentPath) => {
    //   return componentPath.replace(/\.vue$/, '.md'); // specify the name of the input md file
    // },
    // getDestFile(file, config) {
    //   //console.log(file, config);
    //   index += 1;
    //   return index < 10 ? '0' + index : index + '.' + path.join(config.outDir, file).replace(/\.vue$/, '.doc.md').replace('\\', '_');
    // },
    templates: {
      component: (renderedUsage, doc) => {
        const {
          displayName,
          description,
          docsBlocks,
          tags,
          functional
        } = doc;
     
        const {
          deprecated,
          author,
          since,
          version,
          see,
          link
        } = tags || {};
        return `
  ---
  title: ${displayName}
  ---
  
  # ${deprecated ? `~~${displayName}~~` : displayName}
  ${deprecated ? `> **Deprecated** ${deprecated[0].description}\n` : ''}
  ${description ? '> ' + description : ''}
  ${functional ? renderedUsage.functionalTag : ''}
  ${author ? author.map(a => `Author: ${a.description}\n`) : ''}
  ${since ? `Since: ${since[0].description}\n` : ''}
  ${version ? `Version: ${version[0].description}\n` : ''}
  ${see ? see.map(s => `[See](${s.description})\n`) : ''}
  ${link ? link.map(l => `[See](${l.description})\n`) : ''}
  ${docsBlocks ? '---\n' + docsBlocks.join('\n---\n') : ''}
  ${renderedUsage.props}
  ${renderedUsage.methods}
  ${renderedUsage.events}
  ${renderedUsage.slots}
  `;
      },
       events: require('../../docs/templates/events.js'),
       props: require('../../docs/templates/props.js'),
    },
  };
  