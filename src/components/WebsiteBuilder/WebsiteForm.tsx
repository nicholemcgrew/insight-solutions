// src/components/WebsiteBuilder/WebsiteForm.tsx

import { useForm, useFieldArray } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  InputAdornment,
} from "@mui/material";
import { Add, Delete, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { useEffect } from "react";
import type { WebsiteConfig } from "../../types/WebsiteConfig";

interface WebsiteFormProps {
  initialValues?: Partial<WebsiteConfig>;
  onChange: (data: WebsiteConfig) => void;
}

const defaultValues: WebsiteConfig = {
  businessName: "",
  tagline: "",
  about: "",
  contactEmail: "",
  colorScheme: {
    primary: "#1976d2",
    secondary: "#9c27b0",
    background: "#ffffff",
    text: "#000000",
  },
  services: [{ title: "", description: "" }],
};

export default function WebsiteForm({ initialValues, onChange }: WebsiteFormProps) {
  const { control, watch, register, setValue, formState: { errors } } = useForm<WebsiteConfig>({
    defaultValues: { ...defaultValues, ...initialValues },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  // Live preview update
  useEffect(() => {
    const subscription = watch((value) => {
      onChange(value as WebsiteConfig);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setValue("heroImage", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const colorKeys: (keyof WebsiteConfig["colorScheme"])[] = ["primary", "secondary", "background", "text"];

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Build Your Website
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Business Name *"
            fullWidth
            {...register("businessName", { required: "Required" })}
            error={!!errors.businessName}
            helperText={errors.businessName?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Tagline" fullWidth {...register("tagline")} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="About"
            fullWidth
            multiline
            minRows={4}
            {...register("about")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Email *"
            fullWidth
            {...register("contactEmail", { required: "Required" })}
            error={!!errors.contactEmail}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="Phone" fullWidth {...register("phone")} />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Address" fullWidth {...register("address")} />
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined" component="label">
            Upload Hero Image
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Grid>

        {/* Social */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Facebook"
            fullWidth
            InputProps={{ startAdornment: <InputAdornment position="start"><Facebook /></InputAdornment> }}
            {...register("facebook")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Instagram"
            fullWidth
            InputProps={{ startAdornment: <InputAdornment position="start"><Instagram /></InputAdornment> }}
            {...register("instagram")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="LinkedIn"
            fullWidth
            InputProps={{ startAdornment: <InputAdornment position="start"><LinkedIn /></InputAdornment> }}
            {...register("linkedin")}
          />
        </Grid>

        {/* Colors */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Colors</Typography>
          <Grid container spacing={3}>
            {colorKeys.map((key) => (
              <Grid item xs={6} sm={3} key={key}>
                <Typography variant="body2">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <TextField
                  type="color"
                  fullWidth
                  {...register(`colorScheme.${key}`)}
                  sx={{ mb: 1 }}
                />
                <TextField
                  size="small"
                  fullWidth
                  {...register(`colorScheme.${key}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Services */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Services</Typography>
          {fields.map((field, index) => (
            <Box key={field.id} sx={{ border: "1px solid #ddd", borderRadius: 2, p: 3, mb: 3, position: "relative" }}>
              <TextField
                label="Title *"
                fullWidth
                sx={{ mb: 2 }}
                {...register(`services.${index}.title`, { required: true })}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={2}
                {...register(`services.${index}.description`)}
              />
              <IconButton
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                color="error"
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<Add />} onClick={() => append({ title: "", description: "" })} variant="outlined">
            Add Service
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}