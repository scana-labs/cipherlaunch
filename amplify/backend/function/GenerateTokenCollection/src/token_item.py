from __future__ import annotations

import json
import random

from typing import Dict, List, Tuple


class Token:
    def __init__(self, token_traits: Dict[str, str]) -> None:
        self.token_id = -1
        self.token_traits = token_traits

    @classmethod
    def random(cls, rarities) -> Token:
        token_traits = {}
        for category, (traits, rarities) in rarities.items():
            if traits and rarities:
                token_traits[category] = random.choices(traits, rarities)[0]
        return cls(token_traits)

    def incompatible(self, incompatible_traits: Dict[Tuple[str, str], List[Tuple[str, str]]]) -> bool:
        # Get (kev, val) pairs from self.token_traits.
        traits_key_vals = {tuple(t) for t in self.token_traits.items()}

        # Non-none hat doesn't go with headphones or earmuffs ears.
        if self.token_traits['Hat'] != 'None' and self.token_traits['Ears'] in ['Headphones', 'EarMuffs']:
            return True

        # Check if (key, val) for each trait has incompatibilities as given by incompatible_traits.
        for trait_key_val in traits_key_vals:
            if trait_key_val not in incompatible_traits:
                continue
            for incompatible_trait in incompatible_traits[trait_key_val]:
                if incompatible_trait in traits_key_vals:
                    return True
        return False

    def unrevealed_metadata(self) -> Dict:
        return {
            'image': f'https://thefacesfund.com/image/unrevealed.png',
            'name': f'The Faces Fund #{self.token_id}',
        }

    def metadata(self) -> Dict:
        attributes = []
        for key, val in self.token_traits.items():
            attributes.append({
                'trait_type': key,
                'value': val
            })

        return {
            'image': f'https://thefacesfund.com/image/{self.token_id}.jpg',
            'name': f'The Faces Fund #{self.token_id}',
            'attributes': attributes,
        }

    def traits(self) -> Dict:
        return {
            **self.token_traits,
            'token_id': self.token_id
        }

    def __hash__(self) -> int:
        return hash(repr(self))

    def __eq__(self, o: object) -> bool:
        return repr(self) == repr(o)

    def __str__(self) -> str:
        return repr(self)

    def __repr__(self) -> str:
        return json.dumps(self.token_traits, sort_keys=True)