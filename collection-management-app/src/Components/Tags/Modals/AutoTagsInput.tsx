import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { tagsModalStore } from '../../../Stores/Components/TagsModalStore';

export const AutoTagsInput = observer(() => {
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    const fetchSuggestions = async (tag: string) => {
        if (!tag || tag.length < 3) {
            tagsModalStore.items = [];
            return;
        }
        tagsModalStore.isLoading = true;
        await tagsModalStore.GetSuggestedTags(tag);
        tagsModalStore.isLoading = false;
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        tagsModalStore.inputValue = value;

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(() => {
            fetchSuggestions(value);
        }, 300);
        setDebounceTimeout(newTimeout);
    };

    return (
        <div>
            <input
                type="text"
                value={tagsModalStore.inputValue}
                onChange={handleInputChange}
                placeholder="Write to get variants..."
            />
            {tagsModalStore.isLoading && <div>Loading...</div>}
            <ul>
                {tagsModalStore.items.map((it) => (
                    <li key={it.id}>{it.value}</li>
                ))}
            </ul>
        </div>
    );
});

export default AutoTagsInput;