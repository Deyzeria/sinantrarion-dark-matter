import { weaponManufacturers } from "../deyzeria-dark-matter.mjs";

export const positionObject = {
  "": "",
  front: "Fixed Front",
  left: "Fixed Left",
  right: "Fixed Right",
  back: "Fixed Rear"
};

export function SetupWeapons() {
  CONFIG.DND5E.weaponProficiencies["simb"] = "Simple Blasters";
  CONFIG.DND5E.weaponProficiencies["marb"] = "Martial Blasters";

  CONFIG.DND5E.weaponProficienciesMap["simpleB"] = "simb";
  CONFIG.DND5E.weaponProficienciesMap["martialB"] = "marb";

  CONFIG.DND5E.weaponTypes["ship"] = "Ship Weapon";

  CONFIG.DND5E.weaponTypes["simpleB"] = "Simple Blasters";
  CONFIG.DND5E.weaponTypes["martialB"] = "Martial Blasters";

  var weaponProp = {
    automatic: "Automatic",
    blaster: "Blaster",
    branded: "© Branded",
    explosive: "Explosive",
    foregrip: "Foregrip",
    fist: "Fist",
    heat: "Heat",
    nonlethal: "Nonlethal",
    overheat: "Overheat",
    scatter: "Scatter",
    sighted: "Sighted",
    mounted: "Mounted",
    deployable: "🚀 Deployable",
    fixed: "🚀 Fixed"
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

  var ammunition = [
    { abbr: "mine", id: "sFgGeoFjfZ6sIjIV", name: "Antimatter Mine" },
    { abbr: "lightcannon", id: "K6yaF1trISjC9VTG", name: "Light Cannon Round" },
    { abbr: "heavycannon", id: "K6yaF1trISjC9VTG", name: "Heavy Cannon Round" },
    { abbr: "torpedo", id: "rgiE2mf9BfenWwmz", name: "Neutron Torpedo" }
  ];

  ammunition.forEach(ammo => {
    CONFIG.DND5E.ammoIds[ammo.abbr] = `sinantrarion-dark-matter.dark-matter-ship-parts.${ammo.id}`;
    CONFIG.DND5E.consumableTypes.ammo.subtypes[ammo.abbr] = ammo.name;
  });
}

export function SetupWeaponChoice(html, data) {
  if (data.item.system.properties.has('branded')) {
    var headerDetails = html.find(".header-details").find(".summary").children().eq(1);
    let markChoice = $(`<select name="flags.darkmatter.mark"></select>`);

    for (const [key, name] of Object.entries(weaponManufacturers)) {
      markChoice.append(`<option value="${key}" ${data.item.flags.darkmatter?.mark == key ? 'selected' : ''}>${name}</option>`);
    }

    let liMarkChoice = $(`<li data-tidy-render-scheme="handlebars" class="brand-details"></li>`).append(markChoice);
    headerDetails.after(liMarkChoice);
  }

  if (data.item.system.properties.has('fixed')) {
    var headerDetails = html.find(".details").children().eq(2);
    let fixedPosition = $(`<select name="flags.darkmatter.position"></select>`);

    for (const [key, name] of Object.entries(positionObject)) {
      fixedPosition.append(`<option value="${key}" ${data.item.flags.darkmatter?.position == key ? 'selected' : ''}>${name}</option>`);
    }
    let divPositionObject = $(`<div data-tidy-render-scheme="handlebars" class="form-group fixed-details"></div>`).append(`<label>Fixed Position</label>`).append(fixedPosition);
    headerDetails.after(divPositionObject);
  }
}

/**
 * @param {Document} html 
 */
export function AddWeaponBrandNameToCharacterSheetTidy(actor, html, data) {
  let weaponList = html.querySelectorAll('[data-tidy-item-type="weapon"]');
  for (let i = 0; i < weaponList.length; i++) {
    const element = weaponList[i];
    let foundItem = data.items.find(x => x.id == element.dataset.itemId);
    if (foundItem.system.properties.has('branded') && foundItem.flags.darkmatter?.mark) {
      let manufacturer = $(`<span data-tidy-render-scheme="handlebars" style="flex: 0 0 85px; color: var(--t5e-tertiary-color);"><i class="fa-solid fa-copyright"></i> ${weaponManufacturers[foundItem.flags.darkmatter.mark]}</span>`);
      $(element).find(".item-quantity").after(manufacturer);
    }
  }
}