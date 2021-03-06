abstract class Evolution {
    basePokemon: string;
    evolvedPokemon: string;
    type: EvolutionType;

    constructor(basePokemon: string, evolvedPokemon: string, type: EvolutionType) {
        this.basePokemon = basePokemon;
        this.evolvedPokemon = evolvedPokemon;
        this.type = type;
    }

    isSatisfied(): boolean {
        return false;
    }

    evolve(notification = false): boolean {
        // This Pokemon is from a region we haven't reached yet
        if (PokemonHelper.calcNativeRegion(this.evolvedPokemon) > player.highestRegion()) {
            return false;
        }

        if (notification) {
            Notifier.notify(`Your ${this.basePokemon} evolved into a ${this.evolvedPokemon}`, GameConstants.NotificationOption.success);
        }

        const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(this.evolvedPokemon).id, shiny);
        return shiny;
    }

}
