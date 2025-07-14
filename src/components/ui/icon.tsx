import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
  fallback?: string;
}

const Icon: React.FC<IconProps> = ({ name, fallback = 'circle-alert', ...props }) => {
  // Конвертируем kebab-case в PascalCase для совместимости с lucide-react
  const toPascalCase = (str: string) => {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  };

  const iconName = toPascalCase(name);
  const fallbackName = toPascalCase(fallback);

  const IconComponent = (LucideIcons as Record<string, React.FC<LucideProps>>)[iconName];

  if (!IconComponent) {
    // Если иконка не найдена, используем fallback иконку
    const FallbackIcon = (LucideIcons as Record<string, React.FC<LucideProps>>)[fallbackName];

    // Если даже fallback не найден, возвращаем пустой span
    if (!FallbackIcon) {
      return <span className="text-xs text-gray-400">[icon]</span>;
    }

    return <FallbackIcon {...props} />;
  }

  return <IconComponent {...props} />;
};

export default Icon;