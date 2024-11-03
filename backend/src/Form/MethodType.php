<?php

namespace App\Form;

use App\Entity\Method;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class MethodType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        // $builder
        //     ->add('name', TextType::class)
        //     ->add('icon', TextType::class, [
        //         'label' => 'Icon (Image file path or URL)',
        //         'required' => false, 
        //     ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        // $resolver->setDefaults([
        //     'data_class' => Method::class,
        // ]);
    }
} 
