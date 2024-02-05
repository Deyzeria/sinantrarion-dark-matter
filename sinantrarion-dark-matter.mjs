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

const weaponManufacturers = {
  "": "",
  classicatlas: "Classic Atlas",
  modernatlas: "Modern Atlas",
  bandit: "Bandit",
  dahl: "Dahl",
  hyperion: "Hyperion",
  jakobs: "Jakobs",
  maliwan: "Maliwan",
  tediore: "Tediore",
  torgue: "TORGUE",
  vladof: "Vladof"
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

  for (const [skill, reference] of Object.entries(cusDescriptions)) {
    CONFIG.DND5E.skills[skill].reference = `Compendium.sinantrarion-dark-matter.dark-matter-journals.JournalEntry.noWYYgAueBNYseRQ.JournalEntryPage.${reference}`;
  }

  SetupWeapons();
  SetupArmors();
  SetupTools();
  SetupLanguages();

  SetupExtra();

  SetupRuleReferences();
});

Hooks.once("setup", () => {
  setupDaeFields();
});

function SetupWeapons() {
  CONFIG.DND5E.weaponProficiencies["simb"] = "Simple Blasters";
  CONFIG.DND5E.weaponProficiencies["marb"] = "Martial Blasters";

  CONFIG.DND5E.weaponProficienciesMap["simpleB"] = "simb";
  CONFIG.DND5E.weaponProficienciesMap["martialB"] = "marb";

  CONFIG.DND5E.weaponTypes["simpleB"] = "Simple Blasters";
  CONFIG.DND5E.weaponTypes["martialB"] = "Martial Blasters";

  var weaponProp = {
    automatic: "Automatic",
    blaster: "Blaster",
    branded: "Branded",
    explosive: "Explosive",
    foregrip: "Foregrip",
    fist: "Fist",
    heat: "Heat",
    nonlethal: "Nonlethal",
    overheat: "Overheat",
    scatter: "Scatter",
    sighted: "Sighted",
    mounted: "Mounted"
  }

  for (const [key, name] of Object.entries(weaponProp)) {
    CONFIG.DND5E.itemProperties[key] = {
      label: name
    }
    CONFIG.DND5E.validProperties.weapon.add(key);
  }

  var weapons = [
    { abbr: "sunstaff", id: "P0zs0GGWKJ0v1K3O" },
    { abbr: "ioncannon", id: "Me6GjvNtXeFl6O09" },
    { abbr: "phaser", id: "MyFoKpbBP2q2qNwf" },
    { abbr: "repeater", id: "IEOzR0UUDX2mVk97" },
    { abbr: "standardcarb", id: "BFnOvLLioJlJVg1u" },
    { abbr: "swarmpistol", id: "GGDc0Q6bMnNaIIaZ" },

    { abbr: "antimattercarb", id: "lZI08spuGpahZEJc" },
    { abbr: "blitzcannon", id: "5BFgtg0TYQ3yRqmB" },
    { abbr: "concussionrifle", id: "5yc9YdbIUchJ36yM" },
    { abbr: "diodebeam", id: "O44sCwwXP9gD9lUb" },
    { abbr: "magnus", id: "PsK1MhkvbfCGBjbb" },
    { abbr: "plasmalauncher", id: "TGRBYOqynAAz9uao" },
    { abbr: "psionichelm", id: "lr6P1YueGnD2R90D" },
    { abbr: "recgun", id: "tTAUf0tPVS2rYzX0" },
    { abbr: "singularity", id: "w6Lkd9ZhefHJzj7R" },
    { abbr: "volcanic", id: "yKtsBur2JBx2ggO6" },

    { abbr: "laserclaws", id: "4MUbhNDTnhughhiS" },
    { abbr: "antidagger", id: "50qzh3GseS9bJCyq" },
    { abbr: "skawarclub", id: "INVMYdx54h5POgyb" },
    { abbr: "voidshackles", id: "KZLndcbqcepG8kXS" },
    { abbr: "ballisticgloves", id: "dsf30JqPyRwssciG" },

    { abbr: "battlefist", id: "3Z4R2SyU8Xeohl0l" },
    { abbr: "crystallinerod", id: "5TQCty2pPge5Sqem" },
    { abbr: "laserhalfsword", id: "6dTNTu5ynkQpVEpw" },
    { abbr: "lasersword", id: "8rQM0oT74xPI6azF" },
    { abbr: "photoniclash", id: "RUEDsYx89XmUro2L" },
    { abbr: "plasmacutter", id: "SbiDzF50pXJkOmRM" },
    { abbr: "repulsorgauntlet", id: "TRiFvDNnzLbIbTfm" },
    { abbr: "rockethammer", id: "VjfqsbO0hWlKFfwC" },
    { abbr: "thermallance", id: "YYFuIlhyemYdakLI" },
    { abbr: "arcbaton", id: "jgeoKutwqtVp9bco" },
    { abbr: "wrenchinator", id: "sMePn4OSoeQdmW8v" },
  ];

  weapons.forEach(weapon => {
    CONFIG.DND5E.weaponIds[weapon.abbr] = `sinantrarion-dark-matter.dark-matter-weapons-and-armors.${weapon.id}`;
  });
}

function SetupArmors() {
  CONFIG.DND5E.armorIds = [];

  var armors = [
    { abbr: "adamhardsuit", id: "IbQ0xED2hHufWyGy" },
    { abbr: "ferrofhardsuit", id: "oW5zBg9C7paBNFe1" },
    { abbr: "starshardsuit", id: "vBFbmg9a7zbJYWsH" },
    { abbr: "carbhardsuit", id: "iHW7OEaUrXktC4X7" },

    { abbr: "flightj", id: "J7sVKiOYpdn9c3rm" },
    { abbr: "nanofib", id: "l1ea4QsZZEWx92Pi" },
    { abbr: "tacticnanofib", id: "eqSokZJEMVwzxN1s" },

    { abbr: "carbonic", id: "EGxcTfwKjIjTpYa2" },
    { abbr: "environ", id: "A7XNrIpJVgrY28qh" },
    { abbr: "hexaplate", id: "5toryXnQ13hJCHXW" },
    { abbr: "monoplate", id: "F2aDPGS9fjTEWm81" },
    { abbr: "triplate", id: "2F4PFxIKq1pCXswS" },
  ]

  armors.forEach(armor => {
    CONFIG.DND5E.armorIds[armor.abbr] = `sinantrarion-dark-matter.dark-matter-weapons-and-armors.${armor.id}`;
  });

  var graftsEquipment = {
    internalGraft: "Internal Graft",
    externalGraft: "External Graft",
    headGraft: "Head Graft",
    armsGraft: "Arms Graft",
    legsGraft: "Legs Graft"
  }
  for (const [armor, name] of Object.entries(graftsEquipment)) {
    CONFIG.DND5E.equipmentTypes[armor] = name;
    CONFIG.DND5E.armorProficienciesMap[armor] = true;
  }

  var clothingArmor = {
    clothhat: "Clothings Helmet",
    clothpants: "Clothings Pants",
    clothhands: "Clothings Gloves",
    clothboots: "Clothings Boots"
  }

  for (const [armor, name] of Object.entries(clothingArmor)) {
    CONFIG.DND5E.equipmentTypes[armor] = name;
    CONFIG.DND5E.armorProficienciesMap[armor] = true;
  }

  var lightArmor = {
    lighthat: "Light Helmet",
    lightpants: "Light Pants",
    lighthands: "Light Gloves",
    lightboots: "Light Boots"
  }

  for (const [armor, name] of Object.entries(lightArmor)) {
    CONFIG.DND5E.equipmentTypes[armor] = name;
    CONFIG.DND5E.armorProficienciesMap[armor] = 'lgt';
  }

  var mediumArmor = {
    mediumhat: "Medium Helmet",
    mediumpants: "Medium Pants",
    mediumhands: "Medium Gloves",
    mediumboots: "Medium Boots"
  }

  for (const [armor, name] of Object.entries(mediumArmor)) {
    CONFIG.DND5E.equipmentTypes[armor] = name;
    CONFIG.DND5E.armorProficienciesMap[armor] = 'med';
  }

  var heavyArmor = {
    heavyhat: "Heavy Helmet",
    heavypants: "Heavy Pants",
    heavyhands: "Heavy Gloves",
    heavyboots: "Heavy Boots"
  }

  for (const [armor, name] of Object.entries(heavyArmor)) {
    CONFIG.DND5E.equipmentTypes[armor] = name;
    CONFIG.DND5E.armorProficienciesMap[armor] = 'hvy';
  }
}

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
}

function SetupRuleReferences() {
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
    var toAddArray = [
      {
        label: "Helmet",
        values: {
          clothhat: "Clothings Helmet",
          lighthat: "Light Helmet",
          mediumhat: "Medium Helmet",
          heavyhat: "Heavy Helmet",
        }
      },
      {
        label: "Gloves",
        values: {
          clothhands: "Clothings Gloves",
          lighthands: "Light Gloves",
          mediumhands: "Medium Gloves",
          heavyhands: "Heavy Gloves",
        }
      },
      {
        label: "Pants",
        values: {
          clothpants: "Clothings Pants",
          lightpants: "Light Pants",
          mediumpants: "Medium Pants",
          heavypants: "Heavy Pants",
        }
      },
      {
        label: "Boots",
        values: {
          clothboots: "Clothings Boots",
          lightboots: "Light Boots",
          mediumboots: "Medium Boots",
          heavyboots: "Heavy Boots",
        }
      },
      {
        label: "Grafts",
        values: {
          internalGraft: "Internal Graft",
          externalGraft: "External Graft",
          headGraft: "Head Graft",
          armsGraft: "Arms Graft",
          legsGraft: "Legs Graft"
        }
      },
    ]

    var choiseList = html.find(".details").find('.form-group [name="system.type.value"]');
    toAddArray.forEach(element => {
      let choices = $(`<optgroup label="${element.label}"></optgroup>`);
      for (const [armor, name] of Object.entries(element.values)) {
        choices.append(`<option value="${armor}" ${data.system.type.value == armor ? 'selected' : ''}>${name}</option>`);
      }
      choiseList.append(choices);
    });
  }
  else if (data.item.type == 'weapon' && data.item.system.properties.has('branded')) {
    var headerDetails = html.find(".header-details").find(".summary").children().eq(1);
    let markChoice = $(`<select name="flags.darkmatter.mark"></select>`);

    for (const [key, name] of Object.entries(weaponManufacturers)) {
      markChoice.append(`<option value="${key}" ${data.item.flags.darkmatter?.mark == key ? 'selected' : ''}>${name}</option>`);
    }

    let liMarkChoice = $(`<li></li>`).append(markChoice);
    headerDetails.after(liMarkChoice);
  }
});

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

Hooks.on("renderTraitSelector", (app, html, data) => {
  if(data.customPath != "system.traits.weaponProf.custom") return;
  html.css("width", `${Object.keys(data.choices).length*130}px`);
  html.find(".trait-list").first().addClass("flexrow");
});