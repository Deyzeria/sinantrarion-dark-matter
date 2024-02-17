import * as armors from "./module/setup-armor.mjs";
import * as weapons from "./module/setup-weapon.mjs";
import * as ships from "./module/ship-fields.mjs";

const cusSkills = [{
  abbr: "dat",
  label: "Data",
  ability: "int",
  fullKey: "data",
  icon: "icons/commodities/tech/blueprint.webp"
},
{
  abbr: "pil",
  label: "Piloting",
  ability: "dex",
  fullKey: "piloting",
  icon: "icons/commodities/tech/wheel.webp"
},
{
  abbr: "tec",
  label: "Technology",
  ability: "int",
  fullKey: "technology",
  icon: "icons/commodities/tech/detonator-timer.webp"
}];

export const weaponManufacturers = {
  "": "",
  nitronix: "Nitronix",
  scav: "Scav",
  son: "Sisters of Nebula",
  velocity: "Velocity",
  hyperion: "Hyperion",
  havoc: "Havoc",
  arcanixium: "Arcanixium",
  centurion: "Centurion",
  pyrotorg: "PYROTORG",
  marauder: "Marauder"
}


const cusDescriptions = {
  ath: "q9dXYw0gErhcsrys",

  acr: "iBvdi6V5kQLkKeUw",
  pil: "rgzLFXEGoELlJkqu",
  slt: "J1MqfzKnCkPBAhgZ",
  ste: "BKXr6FxTq5wSGibF",

  arc: "7yoQ8aqoW3p1mR6O",
  dat: "fMVIzXy6n9JJLFx3",
  his: "4e14APjBSebwe9UT",
  inv: "Ll07Fq4B3jeQzDlC",
  nat: "sZ5qJDnSF24WMg6K",
  rel: "UhncrpiH5I7dBZ8f",
  tec: "kWMg22wxjStGAe7I",

  ani: "MhsM9OhjQof0Zc6w",
  ins: "rz1K4FcSMuVKEXuf",
  med: "H3M1vmnXO1mYw9ty",
  prc: "cjoIMRUpPpHPh8j3",
  sur: "0VOTTHDV2VC2aO8N",

  dec: "ma7lsmdnwz56Hlcs",
  itm: "KqpMxgwaRxMLARls",
  prf: "2DRilY9kduhld9i0",
  per: "ShztnScIEBUNfGFQ"
}

Hooks.once("init", () => {

  CONFIG.DND5E.sourceBooks["Dark Matter"] = "Dark Matter by Mage Hand Press";

  // Custom skills
  cusSkills.forEach(skl => {
    CONFIG.DND5E.skills[skl.abbr] = {
      label: skl.label,
      ability: skl.ability,
      fullKey: skl.fullKey,
      icon: skl.icon
    }
  });

  CONFIG.DND5E.featureTypes['ship'] = { label: 'Ship Feature' }

  weapons.SetupWeapons();
  armors.SetupArmors();
  SetupTools();
  SetupLanguages();

  SetupExtra();

  SetupReferences();
});

Hooks.once("setup", () => {
  setupDaeFields();
  ships.SetupSizes();
});

function SetupLanguages() {
  CONFIG.DND5E.languages.standard.children["amoeboid"] = "Amoeboid";
  CONFIG.DND5E.languages.standard.children["aviara"] = "Avia-Ra";
  CONFIG.DND5E.languages.standard.children["skathari"] = "Skathári";
  CONFIG.DND5E.languages.standard.children["wrothian"] = "Wrothian";

  delete CONFIG.DND5E.languages.exotic.children.aarakocra;
  delete CONFIG.DND5E.languages.exotic.children.gith;
  delete CONFIG.DND5E.languages.exotic.children.gnoll;
}

function SetupTools() {
  var tools = [
    { abbr: "circuitrykit", id: "PWOvhnCGqrXoGwSa" },
    { abbr: "mechanisttools", id: "TFrrRLUihsfSLJRH" },
    { abbr: "shipmaintools", id: "yK9uBD7bD58oIduu" }
  ]

  tools.forEach(tool => {
    CONFIG.DND5E.toolIds[tool.abbr] = `sinantrarion-dark-matter.dark-matter-weapons-and-armors.${tool.id}`;
  });
}

function SetupExtra() {
  CONFIG.DND5E.featureTypes.class.subtypes["gadget"] = "Gadget";

  CONFIG.DND5E.consumableTypes['explosive'] = {
    label: "Explosive"
  };

  delete CONFIG.DND5E.currencies.ep;
  CONFIG.DND5E.currencies.pp.label = "Platinum Credits";
  CONFIG.DND5E.currencies.pp.abbreviation = "pc";

  CONFIG.DND5E.currencies.gp.label = "Gold Credits";
  CONFIG.DND5E.currencies.gp.abbreviation = "gc";

  CONFIG.DND5E.currencies.sp.label = "Silver Credits";
  CONFIG.DND5E.currencies.sp.abbreviation = "sc";

  CONFIG.DND5E.currencies.cp.label = "Copper Credits";
  CONFIG.DND5E.currencies.cp.abbreviation = "cc";

  CONFIG.DND5E.movementTypes['impulse'] = "Impulse";

  CONFIG.DND5E.itemProperties['mega'] = {
    label: "Mega",
    abbreviation: "🌌"
  }

  CONFIG.DND5E.itemProperties['chrono'] = {
    label: "Chronomancy",
    abbreviation: "⌛"
  }

  CONFIG.DND5E.itemProperties['renai'] = {
    label: "Renaissance",
    abbreviation: "💣"
  }

  CONFIG.DND5E.validProperties.spell.add("mega");
  CONFIG.DND5E.validProperties.spell.add("chrono");
  CONFIG.DND5E.validProperties.spell.add("renai");

  CONFIG.DND5E.creatureTypes['ship'] = {
    label: "🚀Ship",
    plural: "🚀Ships",
    icon: "https://assets.forge-vtt.com/624028a5d2754efb9c0c6799/ItemIcons/Environment/Spaceship/Tech_battleships.png",
    reference: ""
  }
}

function SetupReferences() {
  for (const [skill, reference] of Object.entries(cusDescriptions)) {
    CONFIG.DND5E.skills[skill].reference = `Compendium.sinantrarion-dark-matter.dark-matter-journals.JournalEntry.noWYYgAueBNYseRQ.JournalEntryPage.${reference}`;
  }

  CONFIG.DND5E.rules['roachaddiction'] = `Compendium.sinantrarion-dark-matter.dark-matter-journals.JournalEntry.HuIZ87ix7oNPhRFL.JournalEntryPage.KUIc29kBU4QI4BJS`;
}

function setupDaeFields() {
  let daeflags = [];

  cusSkills.forEach(sk => {
    daeflags.push(`system.skills.${sk.abbr}.value`);
    daeflags.push(`system.skills.${sk.abbr}.ability`);
    daeflags.push(`system.skills.${sk.abbr}.bonuses.check`);
    daeflags.push(`system.skills.${sk.abbr}.bonuses.passive`);
  });

  if (game.modules.get("dae")?.active) {
    const initDAE = async () => {
      for (let i = 0; i < 100; i++) {
        if (globalThis.DAE) {
          globalThis.DAE.addAutoFields(daeflags);
          return true;
        }
        else {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      return false;
    };
    initDAE().then(value => {
      if (!value)
        console.error(`dark-matter | initDae settings failed`);
    });

  }
}

Hooks.on("renderItemSheet5e", (app, html, data) => {
  if (data.item.type == 'equipment') {
    armors.SetupArmorChoice(html, data);
  }
  else if (data.item.type == 'weapon') {
    weapons.SetupWeaponChoice(html, data);
  }
});

// Render weapon manufacturers on player character sheets
Hooks.on("renderActorSheet5eCharacter2", (app, html, data) => {
  let totalList = html.find(".inventory-list").find('.item-list [data-grouped="weapon"]');

  for (const [key, value] of Object.entries(totalList)) {
    if (!isNaN(key)) {
      let foundItem = data.items.find(x => x.id == $(value)[0].dataset.itemId);
      if (foundItem.system.properties.has('branded') && foundItem.flags.darkmatter?.mark) {
        let manufacturer = $(`<span class="title" style="font-size: var(--font-size-11);"><i class="fa-solid fa-copyright"></i> ${weaponManufacturers[foundItem.flags.darkmatter.mark]}</span>`);
        $(value).find('.title').after(manufacturer);
      }
    }
  }
});

// Render trait selection for weapons in several columns
Hooks.on("renderTraitSelector", (app, html, data) => {
  if (data.customPath != "system.traits.weaponProf.custom") return;
  html.css("width", `${Object.keys(data.choices).length * 130}px`);
  html.find(".trait-list").first().addClass("flexrow");
});

Hooks.on("renderActorSheet5eNPC", ships.AddShieldsAndManeuvrability.bind(this));
Hooks.on("renderActorSheet5eVehicle", ships.AddShieldsAndManeuvrability.bind(this));

Hooks.once('tidy5e-sheet.ready', (api) => {
  // api.config.actorTraits.registerActorTrait({
  //   title: "Configure My Module",
  //   iconClass: "fa-solid fa-spaghetti-monster-flying",
  //   enabled: (params) =>
  //     ["character", "npc"].includes(params.context.actor.type),
  //   openConfiguration: (params) => {
  //     // TODO: For example, open another form to input some data.
  //     // https://kgar.github.io/foundry-vtt-tidy-5e-sheets/classes/ActorTraitsApi.html
  //   },
  //   openConfigurationTooltip: "Click to configure my module",
  // });
});