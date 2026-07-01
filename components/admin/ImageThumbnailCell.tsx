'use client'
import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

/**
 * Admin list view thumbnail cell for collections with an `image` upload field.
 * Shows a pixelated sprite preview (36×36) or a dash if no image is set.
 *
 * Register in any collection field:
 * { name: 'imagePreview', type: 'ui', admin: { components: { Cell: '/components/admin/ImageThumbnailCell' } } }
 */
export const ImageThumbnailCell: React.FC<DefaultCellComponentProps> = ({ rowData }) => {
  const image = (rowData as Record<string, unknown>)?.image
  const url =
    image && typeof image === 'object' && 'url' in image
      ? (image as { url?: string }).url
      : null

  if (!url) {
    return (
      <span style={{ color: '#aaa', fontSize: '11px', lineHeight: '36px' }}>—</span>
    )
  }

  return (
    <img
      src={url}
      alt={(rowData as Record<string, unknown>)?.name as string || 'preview'}
      style={{
        width: 36,
        height: 36,
        objectFit: 'contain',
        imageRendering: 'pixelated',
        borderRadius: 4,
        background: '#1a1a2e',
        display: 'block',
      }}
    />
  )
}

export default ImageThumbnailCell
