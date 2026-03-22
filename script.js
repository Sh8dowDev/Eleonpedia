// Eleon image filenames
const eleons = [
  "abyssnaw.png","admerrull.png","aquietus.png","argarfio.png","arraknit.png",
  "astrafin.png","astrolure.png","bastolith.png","boogihop.png","cascub.png",
  "celebreel.png","cerberio.png","chirrook.png","cloral.png","clustarch.png",
  "crustore.png","discorch.png","dodumb.png","faellion.png","freever.png",
  "glassora.png","glassoraoffensive.png","growlet.png","heirite.png","heirysalis.png",
  "igniram.png","jestigator.png","larrona.png","lilibud.png","lunalis.png",
  "lurmaw.png","marchess.png","marimoth.png","minarch.png","moakanter.png",
  "morbright.png","moreanie.png","morfur.png","morjester.png","morlidae.png",
  "mormancy.png","morswept.png","morterra.png","narcloak.png","nautitan.png",
  "ninark.png","nocturkle.png","nymantid.png","palmoko.png","pinnux.png",
  "puppetear.png","pyraglyph.png","pyrurnace.png","quibble.png","quinferno.png",
  "rhiron.png","rootitan.png","ropyrus.png","salagmite.png","scoraptor.png",
  "sephrodite.png","serpalisk.png","shinark.png","spoilurk.png","squalleer.png",
  "squipup.png","syrinfly.png","timpel.png","toxplash.png","umbrystal.png",
  "valograr.png","valuchar.png","victrious.png","vinuki.png","yawnito.png"
];

// Eleons that have a shiny variant, mapped to their shiny filename
const shinyMap = {
  bastolith:          'bastolith-shiny.png',
  argarfio:           'dark-argarfio-shiny.png',
  glassoraoffensive:  'glassora-offensive-shiny.png',
  morterra:           'morterra-shiny.png',
  quinferno:          'quinferno-shiny.png',
  serpalisk:          'serpalisk_shiny.png',
  victrious:          'victrious-shiny.png',
};

const gallery   = document.getElementById('gallery');
const searchBar = document.getElementById('searchBar');

function createEleonCard(filename) {
  const baseName = filename.replace('.png', '');
  const hasShiny = baseName in shinyMap;

  const card = document.createElement('div');
  card.className = 'eleon-card' + (hasShiny ? ' has-shiny' : '');
  card.id = `eleon-${baseName.replace(/\W/g, '').toLowerCase()}`;

  const img = document.createElement('img');
  img.src       = `images/${filename}`;
  img.alt       = baseName;
  img.className = 'eleon-img';
  img.dataset.isShiny = 'false';

  if (hasShiny) {
    img.addEventListener('click', () => {
      const isShiny = img.dataset.isShiny === 'true';
      img.src             = isShiny ? `images/${baseName}.png` : `images-shiny/${shinyMap[baseName]}`;
      img.dataset.isShiny = String(!isShiny);
      img.classList.toggle('shiny', !isShiny);
    });
  }

  const label = document.createElement('div');
  label.className   = 'eleon-name';
  label.textContent = baseName;

  card.appendChild(img);
  card.appendChild(label);
  return card;
}

function renderGallery(filter = '') {
  gallery.innerHTML = '';

  const filtered = eleons.filter(name =>
    name.replace('.png', '').toLowerCase().startsWith(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className   = 'gallery-empty';
    empty.textContent = 'No Eleon found.';
    gallery.appendChild(empty);
    return;
  }

  filtered.forEach(name => gallery.appendChild(createEleonCard(name)));
}

function scrollToEleon(name) {
  const cardId = `eleon-${name.replace(/\W/g, '').toLowerCase()}`;
  const card   = document.getElementById(cardId);
  if (!card) return;
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('highlight');
  setTimeout(() => card.classList.remove('highlight'), 1200);
}

searchBar.addEventListener('input', e => {
  renderGallery(e.target.value);
});

searchBar.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const value = e.target.value.trim().toLowerCase();
  if (!value) return;

  const exactMatch = eleons.find(
    name => name.replace('.png', '').toLowerCase() === value
  );

  if (exactMatch) {
    scrollToEleon(exactMatch.replace('.png', ''));
  }
});

// Initial render
renderGallery();
