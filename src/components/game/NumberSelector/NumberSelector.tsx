'use client'

import { memo, useState } from 'react'
import styles from './NumberSelector.module.css'
import { useSelectRandomNumber } from '@/hooks/useGame'
import { Loading } from '@/components/common/Loading'

interface NumberSelectorProps {
  selectedNumber?: number
  disabled?: boolean
  actions: {
    onSelect: (selectedNumber: number) => void
    onError: (error: any) => void
  }
}

const NumberSelectorComponent = ({ selectedNumber, disabled, actions }: NumberSelectorProps) => {
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null)

  const { isLoading, SelectLuckyNumber } = useSelectRandomNumber({
    actions: {
      onSelect: (data) => {
        actions.onSelect(data.selectedNumber)
      },
      onError: (error) => {
        actions.onError(error)
      },
    },
  })

  return (
    <Loading isLoading={isLoading}>
      <div className={styles.container}>
        <p className={styles.selectNumber}>
          {selectedNumber && selectedNumber > 0
            ? `You selected ${selectedNumber} as your LUCKY number`
            : 'Please Select your LUCKY number'}
        </p>
        <div className={styles.grid}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              className={`${styles.numberButton} ${
                selectedNumber === number ? styles.selected : ''
              } ${hoveredNumber === number ? styles.hovered : ''} ${
                disabled ? styles.disabled : ''
              }`}
              onClick={() => {
                SelectLuckyNumber({
                  luckyNumber: number,
                })
              }}
              onMouseEnter={() => setHoveredNumber(number)}
              onMouseLeave={() => setHoveredNumber(null)}
              disabled={disabled}
            >
              <span className={styles.number}>{number}</span>
              <div className={styles.glow} />
            </button>
          ))}
        </div>
      </div>
    </Loading>
  )
}

export const NumberSelector = memo(NumberSelectorComponent)
