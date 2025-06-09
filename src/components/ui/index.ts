// This file re-exports all UI components to help with case-sensitivity issues

// Button component
export { Button } from './button';

// Input component
export { Input } from './input';

// Card components
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

// Textarea component
export { Textarea } from './textarea';

// Label component
export { Label } from './label';

// Select components
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

// Tabs components
export { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

// Badge component
export { Badge } from './badge';

// Other UI components
import ErrorBoundary from './errorboundary';
import LoadingSpinner from './loadingspinner';
import Modal from './modal';
export { GradientText } from './gradienttext';

// Re-export default exports
export { ErrorBoundary, LoadingSpinner, Modal };
