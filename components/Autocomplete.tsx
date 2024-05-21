import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import styled from "@emotion/native"
import { Button, Text, TextInput } from "react-native-paper"
import { TextInput as TIRef } from "react-native"
import Fuse from "fuse.js"

const Container = styled.View`
  background-color: ${(x) => x.theme.colors.surface};
  padding: ${(x) => x.theme.padding(1)};
`
const TextEntry = styled(TextInput)`
  padding: ${(x) => x.theme.padding(0)};
`

const OptionContainer = styled.View``
const OptionsContainer = styled.View`
  padding-top: ${(x) => x.theme.padding(1)};
  gap: ${(x) => x.theme.padding(1)};
`

export interface Keyable {
    key: string
    id: number
}

export interface Props<T extends Keyable> {
    opts: T[]
    onSelect: (opt: T) => void
}

export const Autocomplete = <T extends Keyable>({
    opts,
    onSelect,
}: Props<T>) => {
    const [showChildren, setShowChildren] = useState(false)
    const [text, setText] = useState("")
    const fuseRef = useRef<Fuse<T>>(null)
    const textRef = useRef<TIRef>(null)

    useEffect(() => {
        fuseRef.current = new Fuse(opts, { keys: ["key"], isCaseSensitive: true })
    }, [opts])

    const visOpts = useMemo(() => {
        if (!fuseRef.current) return []

        return fuseRef.current.search(text).map((x) => x.item)
    }, [opts, text])

    const select = useCallback((o: T) => {
        onSelect(o)

        setShowChildren(() => false)
    }, [])

    const blur = useCallback(() => {
        if (visOpts.length) select(visOpts[0])
        else setShowChildren(() => false)
    }, [visOpts])

    return (
        <Container>
            <TextEntry
                mode="outlined"
                label="Mountain search"
                onFocus={() => setShowChildren(true)}
                onBlur={blur}
                onChangeText={setText}
                ref={textRef}
            />
            {showChildren ? (
                <OptionsContainer>
                    {visOpts.map((x, i) => (
                        <OptionContainer key={x.id}>
                            <Button
                                mode={i === 0 ? "contained" : "outlined"}
                                onPress={() => {
                                    select(x)
                                    if (textRef.current) textRef.current.blur()
                                }}
                            >
                                <Text style={{ color: i === 0 ? "black" : "white" }}>
                                    {x.key}
                                </Text>
                            </Button>
                        </OptionContainer>
                    ))}
                </OptionsContainer>
            ) : (
                <></>
            )}
        </Container>
    )
}
