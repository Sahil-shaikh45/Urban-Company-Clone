package com.urbancompany.service;

import com.urbancompany.entity.Booking;
import com.urbancompany.entity.Provider;
import com.urbancompany.repository.BookingRepository;
import com.urbancompany.repository.ProviderRepository;
import com.urbancompany.repository.UserRepository;
import com.urbancompany.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    public List<Booking> getAvailableJobs() {
        return bookingRepository.findByStatus(Booking.BookingStatus.PENDING);
    }

    @Transactional
    public Booking createBooking(Long userId, Long serviceId, Double price, Double distance) {
        Booking booking = new Booking();
        booking.setUser(userRepository.findById(userId).orElseThrow());
        booking.setService(serviceRepository.findById(serviceId).orElseThrow());
        booking.setPrice(price);
        booking.setDistance(distance);
        booking.setStatus(Booking.BookingStatus.PENDING);
        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking acceptJob(Long bookingId, Long providerId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        if (booking.getStatus() != Booking.BookingStatus.PENDING) {
            throw new RuntimeException("Job already accepted by another provider");
        }

        Provider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        if (provider.getStatus() != Provider.ProviderStatus.ONLINE) {
            throw new RuntimeException("Provider must be ONLINE to accept jobs");
        }

        booking.setProvider(provider);
        booking.setStatus(Booking.BookingStatus.ACCEPTED);
        provider.setStatus(Provider.ProviderStatus.BUSY);
        
        // Generate a 4-digit OTP
        booking.setOtp(String.format("%04d", new Random().nextInt(10000)));

        providerRepository.save(provider);
        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking startJob(Long bookingId, String otp) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        booking.setStatus(Booking.BookingStatus.IN_PROGRESS);
        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking completeJob(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(Booking.BookingStatus.COMPLETED);
        
        Provider provider = booking.getProvider();
        if (provider != null) {
            provider.setStatus(Provider.ProviderStatus.ONLINE);
            providerRepository.save(provider);
        }

        return bookingRepository.save(booking);
    }
}
